  var svg = d3.select("body")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200)
    .style("border", "2px solid black");

  var bar1 = svg.append("rect")
    .attr("fill", "blue")
    .attr("x", 100)
    .attr("y", 20)
    .attr("height", 20)
    .attr("width", 10)

  var bar2 = svg.append("rect")
    .attr("fill", "blue")
    .attr("x", 120)
    .attr("y", 20)
    .attr("height", 20)
    .attr("width", 10)

  //added bar 3 into the svg element 
  var bar3 = svg.append("rect")
    .attr("fill", "blue")
    .attr("x", 140)
    .attr("y", 20)
    .attr("height", 20)
    .attr("width", 10)

  function update() {
    bar1.transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr("height", 100)
      .attr("fill", "red")

      //chained new transition to make bar return back to its original size
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr("fill", "blue")
      .attr("height", 20);

    bar2.transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .delay(2000)
      .attr("height", 100)
      .attr("fill", "red")

      //chained new transition to make bar return back to its original size
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr("fill", "blue")
      .attr("height", 20)
      .attr("fill", "blue");

    //added bar 3s transition and added a delay of 4 seconds   
    bar3.transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .delay(4000)
      .attr("height", 100)
      .attr("fill", "red")

      //chained new transition to make bar return back to its original size
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr("fill", "blue")
      .attr("height", 20);
  }
