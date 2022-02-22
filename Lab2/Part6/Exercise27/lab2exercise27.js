//https://stackoverflow.com/questions/40815889/updating-donut-graph-using-d3-js

  //created 2 data sets to alternate between
  //changed from apples to values
  var dataset1 = {
    values: [5345, 2879, 1997, 2437, 4045]
  };
  var dataset2 = {
    values: [6000, 2000, 1000, 2000, 3000, 8000]
  };

  var width = 560,
    height = 400,
    radius = Math.min(width, height) / 2;

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  function drawPie(data) {

    //move color pie and arc variables into a function drawPie
    var color = d3.scaleOrdinal().range(d3.schemeSet3);

    var pie = d3.pie()
      .sort(null);

    var arc = d3.arc()
      .innerRadius(radius - 100)
      .outerRadius(radius - 50);

    //similar to what was done in Part 5 of the lab 2
    //create a variable called path pie which selects all the paths and binds them to the data to be
    //passed into the function
    var pathPie = svg.selectAll("path")
      .data(pie(data.values))

    //enter method chaining to draw the arcs and the transition 
    pathPie.enter().append("path")
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

    //update the arc and giving the same transition as initial rendering of pie chart
    var pathUpdate = pathPie.transition()
      .duration(1000)
      .attr("d", arc)
      .attrTween("d", function(d) {
        var i = d3.interpolate(d.endAngle, d.startAngle);
        return function(t) {
          d.startAngle = i(t);
          return arc(d);
        }
      })

    //exit() to remove any unwanted arcs during transition back to a smaller dataset with the same
    //transition and added an opacity to 0 so that there are no overlaps visible when removing
    pathPie.exit().transition().duration(1000).attrTween("d", function(d) {
      var i = d3.interpolate(d.endAngle, d.startAngle);
      return function(t) {
        d.startAngle = i(t);
        return arc(d);
      }
    }).style("opacity", 0).remove();

  };

  //initialize with dataset 1  
  drawPie(dataset1)