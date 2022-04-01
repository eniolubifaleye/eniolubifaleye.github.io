//https://www.kaggle.com/datasets/sanjeetsinghnaik/football-club-market-value-2021
  var clubWealth = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/club.csv";

  // set the dimensions and margins of the graph 
  const margin = {
    top: 40,
    right: 5,
    bottom: 70,
    left: 5
  };
	
  //create the dimensions for the svg that will hold the cirlce layout
  const widthCircles = 550,
    heightCircles = 550;

	//create dimensions for the svg that will hold the bar graph
  const widthB = 700 - margin.left - margin.right;
  const heightB = 400 - margin.top - margin.bottom;

  // setup svg with responsive svg
  //https://stackoverflow.com/questions/55629182/using-variables-into-viewbox
  var svgCircles = d3.select(".svgCircles").append("svg")
    .attr("width", widthCircles)
    .attr("height", heightCircles)
    .append("g")
    .attr("viewBox", `0 0 ` + widthCircles + ` ` + heightCircles);
    
 	  //x label positioning for the circles svg
    svgCircles.append("text")
      .attr("class", "xLabelCircle")
      .attr("text-anchor", "end")
      .attr("x", widthCircles/2)
      .attr("y", 50)
      .attr("font-size", 15)
      .text("Top 20 Clubs Market Value in Millions (£)");
      
  // setup svg with responsive svg
  //https://stackoverflow.com/questions/55629182/using-variables-into-viewbox
  var svgBarGraph = d3.select(".svgCircles").append("svg")
    .attr("width", widthB - 100 + margin.left + margin.right)
    .attr("height", heightB + margin.top + margin.bottom)
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")
    .attr("viewBox", `0 0 ` + widthB + ` ` + heightB);
    
    //x label positioning for the bar graph
    svgBarGraph.append("text")
      .attr("class", "xLabelCircleBar")
      .attr("text-anchor", "end")
      .attr("x", widthB/ 2 + 20)
      .attr("y", heightB + 40)
      .attr("font-size", 15)
      .text("Club Name");
      
     //y label positioning for the bar graph
    svgBarGraph.append("text")
      .attr("class", "ylabelCirleBar")
      .attr("text-anchor", "end")
      .attr("y", -margin.left + 5)
      .attr("x", -margin.bottom)
      .attr("dy", "1em")
      .attr("transform", "rotate(-90)")
      .text("Value of Club in Millions (£)");
	
  //use d3 to load in the data 
  //alter the data as it is parsed in to the script as a string
  //changed from string to int for relevant data
  d3.csv(clubWealth, function(newData) {
    return {
      ID: +newData.ID,
      Club_Name: newData.Club_Name,
      Competition_Name: newData.Competition_Name,
      Squad_Size: newData.Squad_Size,
      Average_Age_Of_Players: +newData.Average_Age_Of_Players,
      Market_Value_Of_Club_In_Millions: +newData.Market_Value_Of_Club_In_Millions,
      Average_Market_Value_Of_Players_In_Millions: +newData.Average_Market_Value_Of_Players_In_Millions,
      Market_Value_Of_Top_18_Players_In_Millions: +newData.Market_Value_Of_Top_18_Players_In_Millions
    }
  }).then(function(data) {
		
    //filter the data to find the top 20 most valuable clubs in europe
    var top20 = data.filter(function(d) {
      return d.ID < 21
    })
    
    //create yExtent variable for bar graph so domain can be set
    const yExtent = d3.extent(top20, d => {
      return d.Market_Value_Of_Club_In_Millions
    });

    // X bottom axis for bar graph
    var xBar = d3.scaleBand()
      .range([0, widthB - 100], .1)
      .domain(top20.map(function(d) {
        return d.Club_Name;
      }))
      .padding(0.2);
		
    //call and draw the x axis onto the bar graph svg
    var xAxisBar = svgBarGraph.append("g")
      .attr("class", "XaxisBar")
      .attr("transform", "translate(50," + heightB + ")")
      .call(d3.axisBottom(xBar).tickValues([]));

    // Add Y left axis for bar graph
    var yBar = d3.scaleLinear()
      .domain([0, 200 + d3.max(yExtent)])
      .range([heightB, 0]);
		
    //call and draw the y axis onto the bar graph svg
    var yAxisBar = svgBarGraph.append("g")
      .attr("class", "YaxisBar")
      .attr("transform", "translate(50,0)")
      .call(d3.axisLeft(yBar).tickValues([]));
      
    //added a colour range based on each circles radius
    //from Lab 1 Exercise 28
    //the higher the value of the club, the closer it is to blue
    //the value held in market value for club is scaled down by a multiple of 15
    var myColor1 = d3.scaleLinear().domain([d3.min(top20, function(d) {
      return d.Market_Value_Of_Club_In_Millions / 15;
    }), d3.max(top20, function(d) {
      return d.Market_Value_Of_Club_In_Millions / 15;
    })]).range(["red", "blue"]);
		
    //forcedSimulation from Lab 2 Exercise 28 - 32 initialized with the top20 data 
    //and the scaled down market value data
    var simulation = d3.forceSimulation(top20)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(widthCircles / 2, heightCircles / 2))
      //increased the forceCollide value to 
      .force('collision', d3.forceCollide().radius(function(d) {
        return d.Market_Value_Of_Club_In_Millions / 15
      }))
      .on("tick", ticked);

    //https://stackoverflow.com/questions/20662192/how-to-place-text-on-the-circle-when-using-d3-js-force-layout
    //append the circles inside a g element
    var nodes = svgCircles.selectAll(".node")
      .data(top20)
      .enter()
      .append('g')
      .attr("class", "footballCircles");
		  
    //create the circles with the radius based on the scaled down market value
    nodes.append("circle")
      .attr("r", function(d) {
        return d.Market_Value_Of_Club_In_Millions / 15;
      })
      .attr('fill', function(d) {
        return myColor1(d.Market_Value_Of_Club_In_Millions / 15)
      })
      .append("title")
      .text(function(d) {
        return d.Club_Name;
      });
		
    //add the clubs name to each circle
    nodes.append("text")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.Club_Name
      });
		
    //function ticked to run the forcedSimulation
    //translate the x and y position of each circle during the function call
    function ticked() {
      nodes.attr("transform", function(d) {
        return 'translate(' + [d.x, d.y] + ')';
      })
    }
		
    //create a brush element, with its extent the size of the svg for the circles
    //when brushing action ends, call the function highlightCircles
    let brush = d3.brush()
      .extent([
        [0, 0],
        [widthCircles, heightCircles]
      ])
      .on("end", highlightCircles);
		
    //add the brush element to the svg svgCircles
    svgCircles.append("g")
      .attr("class", "brush")
      .call(brush)
		
    //https://www.d3indepth.com/interaction/
    //initialize variable brushExtent
    let brushExtent;
	
  	//function highlight circles used to store the brush selection x and y data
    //and call function updateCircles
    function highlightCircles(e) {
      brushExtent = e.selection;
      updateCircles();
    }
		
    //function to update the styles of the circles selected
    //and take the data stored in them to update a bar graph 
    //and draw a table
    function updateCircles() {
			
      // arrays which will be used to store data for bar chart and table
      //emptied once function is called again
      var selectedData = [];
      var clubNameArray = [];
      var clubMarketValueArray = [];
      var barChartData = [];
			
      //select all the circles
      d3.selectAll(".footballCircles").each(function(d) {
				
        //check if a circle isnt in the brush selection
        //if not make the opacity of the circle half
        if (!isInBrushExtent(d)) {
          d3.select(this).style("opacity", 0.5);
        } else {
        
        //else keep its opacity and push the data selected from the brush into
        //the respective arrays
          d3.select(this).style("opacity", 1);
          selectedData.push(d);
          clubNameArray.push(d.Club_Name);
          clubMarketValueArray.push(d.Market_Value_Of_Club_In_Millions)
        }
      })
			
      //populate array barChartData
      for (var i = 0; i < clubNameArray.length; i++) {
        barChartData[i] = {
          Club_Name: clubNameArray[i],
          Club_Value: clubMarketValueArray[i],
        }
      }
			
      //if statement to check length of selectedData
      if (selectedData.length > 0) {
      
      	//if its more than 0, call clearTable function, drawTable and drawBarGraph function
        //with the relevant data
        //from lab 3 
        ////http://bl.ocks.org/feyderm/6bdbc74236c27a843db633981ad22c1b
        clearTable();
        selectedData.forEach(d_row => drawTable(d_row))
        drawBarGraph(barChartData);
      } else {
      
      //else table is cleared and the opacity of the non selected circles are reset
      //back to being clear
        clearTable();
        d3.selectAll(".footballCircles").style("opacity", 1);
      }
    }

    //show and hide the table column names
    function hideTableColNames() {
      d3.select("table").style("visibility", "hidden");
    }

    function showTableColNames() {
      d3.select("table").style("visibility", "visible");
    }

    //clear table from html
    function clearTable() {
      //call function to hide the table column names and remove all the rows
      hideTableColNames();
      d3.selectAll(".rowData").remove();
    }
		
    //function to draw table by tables rows
    function drawTable(d_row) {
			
      //shows the tabel column headers
      showTableColNames();
			
       //to hold each row of name, market value and squad size for each data point from the circles
      var d_row_filter = [d_row.Club_Name, d_row.Market_Value_Of_Club_In_Millions,
        d_row.Market_Value_Of_Top_18_Players_In_Millions,
        d_row.Squad_Size
      ];

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
	
		//function to draw bar graphs
    function drawBarGraph(data) {

      //added a colour range based on each circles radius
      var myColor2 = d3.scaleLinear().domain([d3.min(top20, function(d) {
        return d.Market_Value_Of_Club_In_Millions / 15;
      }), d3.max(top20, function(d) {
        return d.Market_Value_Of_Club_In_Millions / 15;
      })]).range(["red", "blue"]);

      //update the y domain
      yBar.domain([0, d3.max(data.map(function(d) {
        return d.Club_Value;
      }))]);

      //update the y axis
      yAxisBar = svgBarGraph.select(".YaxisBar").transition()
        .duration(1000)
        .call(d3.axisLeft(yBar));

      //update the x domain
      xBar.domain(data.map(function(d) {
        return d.Club_Name;
      }))

      //update the y axis
      xAxisBar = svgBarGraph.select(".XaxisBar").transition()
        .duration(1000)
        .call(d3.axisBottom(xBar));
			  
      //draw the bars
      var u = svgBarGraph.selectAll("rect")
        .data(data)
			
      //merge data for smoothe transition when a new brush selection occurs
      u.enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function(d) {
          return xBar(d.Club_Name);
        })
        .attr("y", function(d) {
          return yBar(d.Club_Value);
        })
        .attr("width", xBar.bandwidth())
        .attr("height", function(d) {
          return heightB - yBar(d.Club_Value);
        })
        .attr("transform", "translate(50,0)")
        .attr("fill", function(d) {
          return myColor2(d.Club_Value / 15)
        })

      //remove the extra data bar when transitioning back to a smaller dataset
      //added a style() to reduce the opacity to 0 before removing the extra dataset bar
      u.exit().transition().duration(1000).style("opacity", 0).remove();
    }
		
    //https://www.d3indepth.com/interaction/
    //function to check if an object is in the brush selection
    function isInBrushExtent(d) {
      return brushExtent &&
        d.x >= brushExtent[0][0] &&
        d.x <= brushExtent[1][0] &&
        d.y >= brushExtent[0][1] &&
        d.y <= brushExtent[1][1];
    }
  });