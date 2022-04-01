//https://www.kaggle.com/code/kerneler/starter-top-football-leagues-scorers-04eaf62e-6/data
  var topScorer = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/DataFootball.csv";

  // set the dimensions and margins of the graph for messi or ronaldo
  var marginMR = {
      top: 30,
      right: 30,
      bottom: 70,
      left: 60
    },
    widthMR = 400 - marginMR.left - marginMR.right,
    heightMR = 400 - marginMR.top - marginMR.bottom;
	
  //set dimensions for pie chart
  var widthPie = 350,
    heightPie = 300,
    radiusPie = Math.min(widthPie, heightPie) / 2;
	
  
  //load in the data
  d3.csv(topScorer, function(newData) {

    return newData;
  }).then(function(data) {
		
    
    //filter the data to only get messi adn ronaldos goals for the years
    var filteredMVR = data.filter(function(d) {
      return d["Player Names"] == "Cristiano Ronaldo" || d["Player Names"] == "Lionel Messi"
    })
		
    //filter goals scored for each year of the data set
    var filteredGoals2016 = filteredMVR.filter(function(d) {
      return d.Year == 2016
    })
    var filteredGoals2017 = filteredMVR.filter(function(d) {
      return d.Year == 2017
    })
    var filteredGoals2018 = filteredMVR.filter(function(d) {
      return d.Year == 2018
    })
    var filteredGoals2019 = filteredMVR.filter(function(d) {
      return d.Year == 2019
    })
    var filteredGoals2020 = filteredMVR.filter(function(d) {
      return d.Year == 2020
    })
		
    
    //array to hold the players name
    var playerNames = ["Lionel Messi", "Cristiano Ronaldo"]

    // append the svg object to the div dataMR
    var svgMR = d3.select(".dataMR")
      .append("svg")
      .attr("width", widthMR + marginMR.left + marginMR.right)
      .attr("height", heightMR + marginMR.top + marginMR.bottom)
      .append("g")
      .attr("transform",
        "translate(" + marginMR.left + "," + marginMR.top + ")");

    // append the svg object to the div dataMR
    var svgPie = d3.select(".dataMR")
      .append("svg")
      .attr("width", widthPie)
      .attr("height", heightPie)
      .append("g")
      .attr("transform", "translate(" + widthPie / 2 + "," + heightPie / 2.5 + ")");

    // Initialize the X axis for the bar graph of messi vs ronaldo
    var xMR = d3.scaleBand()
      .range([0, widthMR])
      .padding(0.2)
      .domain(playerNames);
		
    //call and draw the x axis
    var xAxisMR = svgMR.append("g")
      .attr("transform", "translate(0," + heightMR + ")")
      .attr("class", "XaxisMR")
      .call(d3.axisBottom(xMR));

    // Initialize the Y axis for the bar graph of messi vs ronaldo
    var yMR = d3.scaleLinear()
      .range([heightMR, 0])
      .domain([0, 40]);
		
    //call and draw the y axis
    var yAxisMR = svgMR.append("g")
      .attr("class", "myYaxisMR")
      .call(d3.axisLeft(yMR));

    // add x and y axis labels 
    //x label positioning for bar graph
    svgMR.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", (widthMR / 2) + marginMR.top + 40)
      .attr("y", heightMR + marginMR.bottom - 20)
      .attr("font-size", 15)
      .text("Top 2 Football Players");
      
    //x label positioning for pie chart 
    svgPie.append("text")
      .attr("class", "x label pie")
      .attr("text-anchor", "end")
      .attr("x", (widthPie / 10))
      .attr("y", -110)
      .attr("font-size", 15)
      .text("Players Expected Goals vs Goals");

    //y label positioning for bar graph
    svgMR.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -marginMR.left + 5)
      .attr("x", -marginMR.bottom)
      .attr("dy", "1em")
      .attr("transform", "rotate(-90)")
      .text("No. of Goals");
		
    //https://d3-graph-gallery.com/graph/connectedscatter_tooltip.html
    // create a tooltip for each hover over a players goals scored in bar graph
    var rmTooltip = d3.select(".dataMR")
      .append("div")
      .attr("class", "rmTooltip")
      .style("opacity", 1)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
		
    //function to update the bar graph on button press to change the year
    //and number of goals scored
    function updateBarGraph(data) {

      //update the domain of the left y axis
      yMR.domain([0, d3.max(data.map(function(d) {
        return +d.Goals
      })) + 2])

      //update the svg element of the left y Axis
      yAxisMR = svgMR.select(".myYaxisMR")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(yMR))
			
			//function to log the event of a mouse over a bar
      function onMouseOverRM(d, i) {
      	//call createPieChart function with the data stored inside
        //the current bar graph highlighted
        createPieChart(i);
				
        //set the tooltips opacity to 1 to make it visible 
        rmTooltip.style("opacity", 1)
        d3.select(".rmTooltip").transition().duration(500)
          .style("display", "block");
				
        //add html text from data stored from hovering over the bar
        //graph into the tooltip
        //https://blog.hubspot.com/website/html-space
        //used to add white space inbetween text
        rmTooltip
          .html("Club: " + i.Club + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            "Name: " + i["Player Names"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            "League: " + i.League + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            "Matches Played: " + i.Matches_Played + "<br>" + "<br>" +
            "Minutes Played: " + i.Mins + "<br>" +
            "Shots: " + i.Shots + "<br>" +
            "Shots Per Average Match: " + i["Shots Per Avg Match"] + "<br>" +
            "xG Per Average Match: " + i["xG Per Avg Match"] + "<br>" +
            "No. of Substitutions: " + i["Substitution "])
          
           //added a class to the text val so that it can be removed in the onMouseout
        //function
        svgMR.append("text")
          .attr('class', 'val')
          //altered the code so that the value of the text is placed directly on
          //top of the bar
          //adding the data "d" into the function as an arguement and returning 
          //the indexed data "i" as its x and y parameters
          .attr('x', function(d) {
            return xMR(i["Player Names"]) + xMR.bandwidth() / 2;
          })
          .attr('y', function(d) {
            return yMR(i.Goals);
          })
          .attr("text-anchor", "middle")
          .text(function(d) {
            return i.Goals;
          }); // Value of the text 
      }
			
      //function for when the mouse isnt hovering over a bar in bar graph
      function onMouseOutRM(d, i) {
      	//reduce opacity to 0 to make it not visible
        //remove the pie chart
        rmTooltip.transition().duration(500).style("opacity", 0)
        d3.selectAll(".pieRM").transition().duration(500).style("opacity", 0).remove();
          
        //select the class val, which is the text in onMouseOver and remove the text
        d3.selectAll('.val')
          .remove()
      }
			
      //draw the bars 
      var u = svgMR.selectAll("rect")
        .data(data)

      u.enter()
        .append("rect")
        .attr("class", "barsMR")
        .on("mouseover", onMouseOverRM)
        .on("mouseout", onMouseOutRM)
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function(d) {
          return xMR(d["Player Names"]);
        })
        .attr("y", function(d) {
          return yMR(+d.Goals);
        })
        .attr("width", xMR.bandwidth())
        .attr("height", function(d) {
          return heightMR - yMR(+d.Goals);
        })
        .attr("fill", "blue")
    }
		
    
    //function to clear the bar graph and the pie chart
    function clearBarGraph() {
      d3.selectAll(".barsMR").transition().duration(500).style("opacity", 0).remove();
      d3.selectAll(".pieRM").transition().duration(500).style("opacity", 0).remove();
    }
		
    //function to create pie chart on bar hover
    function createPieChart(data) {
			
      //array to hold expected goals and goals value from bar hover
      var expectedGoals = [+data.Goals, +data.xG]
      
      //http://bl.ocks.org/zanarmstrong/05c1e95bf7aa16c4768e
      //create a variable to hold the goal ratio for each player and each season
      var goalRatio = [d3.format(".3n")(+data.Goals / +data.Matches_Played)]
			
      //array to hold the values for the legend
      var legend = ["xG (Expected Goals)", "Goals"]

      //move color pie and arc variables
      var color = d3.scaleOrdinal().range(d3.schemeSet1);
      var colorLegend = d3.scaleOrdinal().domain(legend).range(d3.schemeSet1);
			
      //https://d3-graph-gallery.com/graph/custom_legend.html
      //create and draw legend squares
      var size = 20
      svgPie.selectAll("mydots")
        .data(legend)
        .enter()
        .append("rect")
        .attr("class", "pieRM")
        .attr("x", 0)
        .attr("y", function(d, i) {
          return 120 + i * (size + 5)
        })
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d) {
          return colorLegend(d)
        })
			
      //create and draw legend text
      svgPie.selectAll("mylabels")
        .data(legend)
        .enter()
        .append("text")
        .attr("class", "pieRM")
        .attr("x", size * 1.2)
        .attr("y", function(d, i) {
          return 120 + i * (size + 5) + (size / 2)
        })
        .style("fill", function(d) {
          return colorLegend(d)
        })
        .text(function(d) {
          return d
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
			
      //initialize pie chary
      var pie = d3.pie()
        .sort(null);
		
      //create pie arcs
      var arc = d3.arc()
        .innerRadius(radiusPie - 100)
        .outerRadius(radiusPie - 50);

      //similar to what was done in Part 5 of the lab 2
      //create a variable called path pie which selects all the paths and binds them to the data to be
      //passed into the function
      var pathPie = svgPie.selectAll("path")
        .data(pie(expectedGoals));

      //enter method chaining to draw the arcs and the transition using attrTween
      pathPie.enter().append("path")
        .attr("class", "pieRM")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("d", arc)
        .transition()
        .duration(1000)
        .attrTween("d", function(d) {
          var i = d3.interpolate(d.endAngle, d.startAngle);
          return function(t) {
            d.startAngle = i(t);
            return arc(d);
          }
        });
        
        //append goals text to the middle of the pie chart
      svgPie.append("text")
        .attr("fill", function(d, i) {
          return color(i+1);
        })
        .attr("class", "pieRM")
        //anchor the text to the middle of each arc
        .attr("text-anchor", "middle")
        .attr("y", heightPie/22 - 20)
        .data(expectedGoals)
        //return the value of each arc
        .text(function(d, i) {
          return expectedGoals[0] + " Goals";
        });
        
        //append expected goals to the middle of the pie chart
         svgPie.append("text")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("class", "pieRM")
        //anchor the text to the middle of each arc
        .attr("text-anchor", "middle")
        .attr("y", heightPie/20 - 7)
        .data(expectedGoals)
        //return the value of each arc
        .text(function(d, i) {
          return expectedGoals[1] + " xG";
        });
        
        //adding the goal ratio to middle of the pie chart
        svgPie.append("text")
        .attr("fill", "black")
        .attr("class", "pieRM")
        //anchor the text to the middle of each arc
        .attr("text-anchor", "middle")
        .attr("y", heightPie/11 - 5)
        .data(goalRatio)
        //return the value of each arc
        .text(function(d, i) {
          return goalRatio[0] + " p/game";
        });
    }
		
    //select the relevant button with its class name and then on click event
    //call clearBarGraph and updateBarGraph with the relevant filtered data set
    d3.select(".MR2016").on("click", function(event, d) {
      clearBarGraph();
      updateBarGraph(filteredGoals2016)
    })

    d3.select(".MR2017").on("click", function(event, d) {
      clearBarGraph();
      updateBarGraph(filteredGoals2017)
    })

    d3.select(".MR2018").on("click", function(event, d) {
      clearBarGraph();
      updateBarGraph(filteredGoals2018)
    })

    d3.select(".MR2019").on("click", function(event, d) {
      clearBarGraph();
      updateBarGraph(filteredGoals2019)
    })

    d3.select(".MR2020").on("click", function(event, d) {
      clearBarGraph();
      updateBarGraph(filteredGoals2020)
    })
  })