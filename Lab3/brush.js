//add hospitalizations data
  var hospitalizations = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/covid-hospitalizations.csv";
	
  
  //https://bl.ocks.org/EfratVil/92f894ac0ba265192411e73f633a3e2f
  // set the dimensions and margins of the graph where the main line chart is
  const marginLine = {
    top: 10,
    right: 30,
    bottom: 100,
    left: 30
  };
	
  //set the dimensions and margins for the line chart where the brushing takes place 
  const margin2Line = {
    top: 320,
    right: 0,
    bottom: 20,
    left: 30
  }
  
  //width height and hight2 for both the  top line graph and the bottom line graph
  const widthLine = 760 - marginLine.left - marginLine.right;
  const heightLine = 400 - marginLine.top - marginLine.bottom;
  const height2Line = 400 - margin2Line.top - margin2Line.bottom;

  // append the svg object to the body of the page 
  var svgLine = d3.select('.dashboard3')
    .append("svg")
    .attr("class", "lineHospital")
    .attr("width", widthLine + marginLine.left + marginLine.right)
    .attr("height", heightLine + marginLine.top + marginLine.bottom)
    .append("g")
    .attr("transform",
      "translate(" + marginLine.left + "," + marginLine.top + ")");


//d3 csv to pull in the hospitalizations data 
  d3.csv(hospitalizations, function(newData) {

    //change the datas date to date objects
    //https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
    return {
      entity: newData.entity,
      iso_code: newData.iso_code,
      date: d3.timeParse("%Y-%m-%d")(newData.date),
      indicator: newData.indicator,
      value: +newData.value
    }

  }).then(function(data) {
		
    //https://www.d3-graph-gallery.com/graph/connectedscatter_select.html
    // List of groups of different types of hospitalization data
    const allGroup = ["valueWeeklyHospital", "valueDailyHospital", "valueDailyICU"]

    // add the options to the selection button
    d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      //option appended ie dropdown menu to select the different data
      .append('option')
      //show the text from the allGroup data
      .text(d => d) // text showed in the menu
      .attr("value", d => d) // corresponding value returned by the button

    //filtering the data from the csv file into multiple data sets 
    var filteredData = data.filter(function(d) {
      return d.entity == "United Kingdom"
    })
		
    
    //filter into 3 different datasets to be used for the different line graphs and selection option
    var filteredDailyHospital = filteredData.filter(function(d) {
      return d.indicator == "Daily hospital occupancy"
    })

    var filteredDailyICU = filteredData.filter(function(d) {
      return d.indicator == "Daily ICU occupancy"
    })

    var filteredWeeklyHospital = filteredData.filter(function(d) {
      return d.indicator == "Weekly new hospital admissions"
    })
		
    //initialize arrays to hold the value and date of each of the filtered data
    let dateWeeklyH = []
    let valueWeeklyH = [];
    let dateDailyH = []
    let valueDailyH = [];
    let dateDailyI = []
    let valueDailyI = [];
    let indicatorData = []
    
		//populate each of the repsective arrays from the filtered datasets 
    for (var i = 0; i < filteredWeeklyHospital.length; i++) {
    	dateWeeklyH.push(filteredWeeklyHospital[i].date);
      valueWeeklyH.push(filteredWeeklyHospital[i].value)
    }

    for (var i = 0; i < filteredDailyHospital.length; i++) {
      dateDailyH.push(filteredDailyHospital[i].date);
      valueDailyH.push(filteredDailyHospital[i].value)
    }

    for (var i = 0; i < filteredDailyICU.length; i++) {
    	dateDailyI.push(filteredDailyICU[i].date);
      valueDailyI.push(filteredDailyICU[i].value)
    }

    ///to accomodate for the different length in values 
    let difference1 = dateDailyH.length - dateDailyI.length;
    let difference2 = dateDailyH.length - dateWeeklyH.length;
    
    //fill the arrays with a null if there is a difference in length until all are of equal length
    //only update the value arrays 
    for (var i = 0; i < difference1; i++) {
      valueDailyI.push(null)
    }

    for (var i = 0; i < difference2; i++) {
      valueWeeklyH.push(null)
    }
		
    //create the dataset of the different values for the hospitalizations
    for (var i = 0; i < dateDailyH.length; i++) {
      indicatorData[i] = {
        date: dateDailyH[i],
        valueWeeklyHospital: valueWeeklyH[i],
        valueDailyHospital: valueDailyH[i],
        valueDailyICU: valueDailyI[i]
      }
    }
		
    //create x and y extent for the x and y axis using filteredDailyHospital
    //and filteredData. use the plus to change data to numerical value from string
    const yExtentLine = d3.extent(filteredDailyHospital, d => {
      return +d.value
    });

    const xExtentLine = d3.extent(filteredData, d => {
      return d.date
    });
		
    //create the different groups on the svg
    //focus to have the main line graph and context to have the brushing line graph
    var focus = svgLine.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + marginLine.left + "," + marginLine.top + ")");

    var context = svgLine.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin2Line.left + "," + margin2Line.top + ")");

    // X bottom axis for main line graph
    var x = d3.scaleTime()
      .range([0, widthLine], .1)
      .domain(xExtentLine)

    // Add Y left axis for main line graph
    var y = d3.scaleLinear()
      .domain([0, 100 + d3.max(yExtentLine)])
      .range([heightLine, 0]);
		
    
    //x scale for the context line graph
    var x2 = d3.scaleTime()
      .range([0, widthLine], .1)
      .domain(xExtentLine)

    // Add Y left axis for brushing
    var y2 = d3.scaleLinear()
      .domain([0, 100 + d3.max(yExtentLine)])
      .range([height2Line, 0]);

    //add the X and Y axis to the focus group
    var xAxis = focus.append("g")
      .attr("class", "Xaxis")
      .attr("transform", "translate(0," + heightLine + ")")
      .call(d3.axisBottom(x).ticks(10));
		
    
   	//add the x axis for the context group with no tick values using
    //tickValues([]));
    var xAxis2 = context.append("g")
      .attr("class", "Xaxis2")
      .attr("transform", "translate(0," + height2Line + ")")
      .call(d3.axisBottom(x2).tickValues([]));

    var yAxis = focus.append("g")
      .attr("class", "Yaxis")
      .call(d3.axisLeft(y).ticks(20));
    
    //function to draw the line data
    function drawLine(data) {
		
   		//draw the main line
      var line = focus.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("class", "line")
        .attr("d", d3.line()
          .x(function(d) {
            return x(d.date)
          })
          .y(function(d) {
            return y(d.valueDailyICU)
          })
        );
			
      //draw the second brushing line
      var line2 = context.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("class", "line")
        .attr("d", d3.line()
          .x(function(d) {
            return x2(d.date)
          })
          .y(function(d) {
            return y2(d.valueDailyICU)
          })
        );

      // A function that update the chart
      function update(selectedGroup) {
				
        //create a brush and have its extent be the width and height of the context group
        //preventing it from being outwith those bounds
        //two functions can be called updateChart and resetSelected 
        var brush = d3.brushX()
          .extent([
            [0, 0],
            [widthLine, height2Line - 1]
          ])
          .on("brush", updateChart)
          .on("end", resetSelected)
				
       	//add the brush to th context group and call the brush
        context.append("g")
          .attr("class", "brush")
          .call(brush)

        // Create new data with the selection?
        // create a const to map the data passed into the drawLine function
        // mapped data is data selected from the selection and date
        const dataFilter = data.map(function(d) {
          return {
            date: d.date,
            value: d[selectedGroup]
          }
        })
				
        //array to hold the selecte brush data from dataTable
        var selectedData = [];
        
        //function to clear the selectedData array
        function resetSelected(){
        	selectedData.length = 0;
        }
				
        //function to update the chart when the selection is changed
        //http://bl.ocks.org/feyderm/6bdbc74236c27a843db633981ad22c1b
        function updateChart() {

          // disregard brushes without selections
          if (!d3.selection) return;
					
          //selection to store data of what the brush has selected on the x axis
          //saves a 2 element array of the starting x and ending x of the brush
          //https://www.d3-graph-gallery.com/graph/interactivity_brush.html
          const sel = d3.brushSelection(this);
          
          //variable to hold the data of the second x value in the sel varaible
          //this is then used to access the data of that x value used to make the line graph
          var dataTable = dataFilter[sel[1]];
      
					//push the data into array selectedData
          selectedData.push(dataTable)

          // populate table if one or more elements is brushed
          if (selectedData.length > 0) {
          
          	//call the function to clear the table
            clearTableRows();
            selectedData.forEach(d_row => populateTableRow(d_row))
          } else {
            clearTableRows();
          }
        }
				
        //populate the tables row
        function populateTableRow(d_row) {
        	//calls the function to show the table column names 
          showTableColNames();

          //to hold each row of date and value pair for each data point in the line graph
          //.toISOString().slice(0,10) to inline format the date object
          //https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
          var d_row_filter = [d_row.date.toISOString().slice(0, 10), d_row.value];
					  
          //enter to add table into the body of the html page
          //with the binded data from d_row_filter
          d3.select("table")
            .append("tr")
            .attr("class", "rowData")
            .selectAll("td")
            .data(d_row_filter)
            .enter()
            .append("td")
            //align using ternary operator
            //align to the left if true align to to the fight if false
            .attr("align", (d, i) => i == 0 ? "left" : "right")
            //append the correspoinding text from the data
            .text(d => d);
        }
				
        //update the y scale and the y domain drawn on the focus group when the dataFilter
        //data changes upon new selection, add a transition foor smooth change
        y.domain([0, d3.max(dataFilter.map(function(d) {
          return d.value;
        }))]);

        yAxis = focus.select(".Yaxis").transition()
          .duration(1000)
          .call(d3.axisLeft(y).ticks(18));

        // Give these new data to update line
        line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(d => x(+d.date))
            .y(d => y(+d.value))
          )

        // Give these new data to update line
        line2
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(d => x2(+d.date))
            .y(d => y2(+d.value))
          )

      }
			
      //show and hide the table column names
      function hideTableColNames() {
        d3.select("table").style("visibility", "hidden");
      }

      function showTableColNames() {
        d3.select("table").style("visibility", "visible");
      }
			
      //clear table from html
      function clearTableRows() {
      	//call function to hide the table column names and remove all the rows
        hideTableColNames();
        d3.selectAll(".rowData").remove();
      }
      
      // When the button is changed, run the updateChart function
      d3.select("#selectButton").on("change", function(event, d) {
				
        //clear the table rows and remove the brush from the context svg when a data set is changed
        clearTableRows();
        context.select(".brush").remove();
        // recover the option that has been chosen
        let selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
      });
    }
		
    //call the drawLine function
    drawLine(indicatorData)
  });