//https://www.kaggle.com/datasets/jehanbhathena/big-5-european-football-leagues-stats
  var top6 = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Big%205%20European%20football%20leagues%20teams%20stats.csv";

  // set the dimensions and margins of the Line Graph
  const marginLines = {
    topLines: 30,
    rightLines: 0,
    bottomLines: 30,
    leftLines: 50
  }
	
  //set the dimensions of the line graph
  const widthLines = 650 - marginLines.leftLines - marginLines.rightLines;
  const heightLines = 250 - marginLines.topLines - marginLines.bottomLines;
	
  //load the data
  d3.csv(top6, function(newData) {
    return newData;
  }).then(function(data) {
		
    //filter the data for the 5 major leagues to get the top 6 teams
    //in each league
    var filteredPremier = data.filter(function(d) {
      return d.competition == "Premier League" &&
        (d.squad == "Manchester United" ||
          d.squad == "Manchester City" ||
          d.squad == "Chelsea" ||
          d.squad == "Arsenal" ||
          d.squad == "Liverpool" ||
          d.squad == "Tottenham")
    })

    var filteredLaLiga = data.filter(function(d) {
      return d.competition == "La Liga" &&
        (d.squad == "Real Madrid" ||
          d.squad == "Barcelona" ||
          d.squad == "Atlético Madrid" ||
          d.squad == "Sevilla" ||
          d.squad == "Valencia" ||
          d.squad == "Villarreal")
    })

    var filteredLigue1 = data.filter(function(d) {
      return d.competition == "Ligue 1" &&
        (d.squad == "Paris S-G" ||
          d.squad == "Lille" ||
          d.squad == "Marseille" ||
          d.squad == "Monaco" ||
          d.squad == "Lyon" ||
          d.squad == "Rennes")
    })

    var filteredSerieA = data.filter(function(d) {
      return d.competition == "Serie A" &&
        (d.squad == "Juventus" ||
          d.squad == "Roma" ||
          d.squad == "Napoli" ||
          d.squad == "Inter" ||
          d.squad == "Milan" ||
          d.squad == "Atalanta")
    })

    var filteredBundesliga = data.filter(function(d) {
      return d.competition == "Fußball-Bundesliga" &&
        (d.squad == "Bayern Munich" ||
          d.squad == "RB Leipzig" ||
          d.squad == "M'Gladbach" ||
          d.squad == "Leverkusen" ||
          d.squad == "Dortmund" ||
          d.squad == "Schalke 04")
    })
		
    //https://d3-graph-gallery.com/graph/line_smallmultiple.html
    //group data from each major league filtered daa by squad name
    const groupPremier = d3.group(filteredPremier, d => d.squad)
    const groupLaLiga = d3.group(filteredLaLiga, d => d.squad)
    const groupLigue1 = d3.group(filteredLigue1, d => d.squad)
    const groupSerieA = d3.group(filteredSerieA, d => d.squad)
    const groupBundesliga = d3.group(filteredBundesliga, d => d.squad)

    // Add an svg element for each group. The will be one beside each other and will 
    //go on the next row when no more room available
    var svgMultiple = d3.select("#my_dataviz")
      .selectAll("uniqueChart")
      .data(groupPremier)
      .enter()
      .append("svg")
      .attr("width", widthLines + marginLines.leftLines + marginLines.rightLines)
      .attr("height", heightLines + marginLines.topLines + marginLines.bottomLines)
      .append("g")
      .attr("transform",
        `translate(${marginLines.leftLines},${marginLines.topLines})`);
		
    //create variable to hold mapped season from dataset filteredPremier
    var season = filteredPremier.map(function(d) {
      return d.season
    })
    
    //https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    //remove duplicates to only have unique season values
    var uniqueSeason = [...new Set(season)];

    // X bottom axis for line graphs
    var xMultiple = d3.scalePoint()
      .range([0, widthLines])
      .domain(uniqueSeason)

    //call and draw x axis
    var xAxisMultiple = svgMultiple.append("g")
      .attr("class", "XaxisMultiple")
      .attr("transform", "translate(0," + heightLines + ")")
      .call(d3.axisBottom(xMultiple));

    //Add Y axis for line graphs
    var yMultiple = d3.scaleLinear()
      .domain([d3.max(filteredPremier, function(d) {
        return +d.rank;
      }), 1])
      .range([heightLines, 0]);
		
    //call and draw y axis
    var yAxisMultiple = svgMultiple.append("g")
      .attr("class", "YaxisMultiple")
      .call(d3.axisLeft(yMultiple));
      
    //x label positioning for each of the line graphs
    svgMultiple.append("text")
      .attr("class", "xLabelMultiple")
      .attr("text-anchor", "end")
      .attr("x", (widthLines / 2))
      .attr("y", heightLines + 30)
      .attr("font-size", 15)
      .text("Season");
      
    //y label positioning for each of the line graphs 
    svgMultiple.append("text")
      .attr("class", "yLabelMultiple")
      .attr("text-anchor", "end")
      .attr("y", -marginLines.leftLines + 5)
      .attr("x", -marginLines.bottomLines)
      .attr("dy", "1em")
      .attr("transform", "rotate(-90)")
      .text("League Position Finished");

    // color for each of the line graphs
    const color = d3.scaleOrdinal()
      .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33'])
      
    //https://d3-graph-gallery.com/graph/connectedscatter_tooltip.html
    // create a tooltip for each hover over a country
    var clubTooltip = d3.select("#my_dataviz")
        .append("div")
        .attr("class", "clubTooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

		//function to update the line graph with league data 
    function updateLineGraphs(data, groupData) {
			
      //update the data bound to the svg
      svgMultiple.data(groupData)

      //update the domain for each y axis
      yMultiple
        .domain([d3.max(data, function(d) {
          return +d.rank;
        }), 1])
			
      //call the new y axis and transitio between the old one 
      yAxisMultiple = svgMultiple.select(".YaxisMultiple")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(yMultiple));

      // Draw the line with updated data
      svgMultiple
        .append("path")
        .attr("class", "clubLine")
        .transition()
        .duration(500)
        .attr("fill", "none")
        .attr("stroke", function(d) {
          return color(d[0])
        })
        .attr("stroke-width", 1.9)
        .attr("d", function(d) {
          return d3.line()
            .x(function(d) {
              return xMultiple(d.season);
            })
            .y(function(d) {
              return yMultiple(+d.rank);
            })
            (d[1])
        })

      // Add the club names 
      svgMultiple
        .append("text")
        .attr("class", "clubName")
        .transition()
        .duration(500)
        .attr("text-anchor", "start")
        .attr("y", -5)
        .attr("x", 0)
        .text(function(d) {
          return (d[0])
        })
        .style("fill", function(d) {
          return color(d[0])
        })
			
      	//function to log the event of a mouse over a data point
      function mouseOver(event, data) {
      	//make the tooltip for the datapoint visible
        clubTooltip.style("opacity", 1)
        d3.select(".clubTooltip").transition().duration(500)
          .style("display", "block");
      }
			
      //function to log the event of a mouse moving over a data point
      function mouseMove(event, data) {
				
        //add html text from data stored from moving over the data points
        //in the line into the tooltip
        clubTooltip
          .html("Club: " + data.squad + "<br>" +
            "Position: " + data.rank + "<br>" +
            "Points: " + data.points + "<br>" +
            "Wins: " + data.wins + "<br>" +
            "Draws: " + data.draws + "<br>" +
            "Losses: " + data.losses + "<br>" +
            "Goals for: " + data.goals_for + "<br>" +
            "Goals against: " + data.goals_against)
      }
			
      //function set the opacity of the tooltip to 0
      //making it not visible when the mouse leaves a datapoint
      function mouseLeave(event, data) {
        clubTooltip.style("opacity", 0)
      }

      // Add the data points
      svgMultiple.selectAll("myCircles")
        .data(function(d) {
          return d[1]
        })
        .enter()
        .append("circle")
        .attr("class", "clubCircles")
        .attr("cx", function(d) {
          return xMultiple(d.season)
        })
        .attr("cy", function(d) {
          return yMultiple(+d.rank)
        })
        .attr("r", 6)
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill", "white")
        .on("mouseover", mouseOver)
        .on("mousemove", mouseMove)
        .on("mouseleave", mouseLeave)
    }
    
    //function to clear the graph when transitioning between different lines
    //removes the line, the data points and the club name
    function clearGraph() {
      d3.selectAll(".clubLine").transition().duration(500).style("opacity", 0).remove();
      d3.selectAll(".clubCircles").transition().duration(500).style("opacity", 0).remove();
      d3.selectAll(".clubName").style("opacity", 0).remove();
    }
		
    //select the relevant button with its class name and then on click event
    //call clearGraph and updateLineGraphs with the relevant filtered data set
    //and grouped data
    d3.select(".laLiga").on("click", function(event, d) {
      clearGraph();
      updateLineGraphs(filteredLaLiga, groupLaLiga)
    })

    d3.select(".premierLeague").on("click", function(event, d) {
      clearGraph();
      updateLineGraphs(filteredPremier, groupPremier)
    })

    d3.select(".ligue1").on("click", function(event, d) {
      clearGraph();
      updateLineGraphs(filteredLigue1, groupLigue1)
    })

    d3.select(".serieA").on("click", function(event, d) {
      clearGraph();
      updateLineGraphs(filteredSerieA, groupSerieA)
    })

    d3.select(".bundesliga").on("click", function(event, d) {
      clearGraph();
      updateLineGraphs(filteredBundesliga, groupBundesliga)
    })
  })