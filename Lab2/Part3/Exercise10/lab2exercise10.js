  var graph = d3.select("body")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200)
    .style("border", "2px solid black");

  //Append circle  
  var circle = graph.append("circle")
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("fill", "red")
    .attr("r", 10);

  d3.selectAll("circle")
    .on("mouseover", function(event) {
      d3.select(this)
        //added a transition so that the change is smoothe
        .transition()
        .duration(2000)
        //altering the radius of the circle to 50
        .attr("r", 50)

        //altering the colour as the circle grows to go to green
        .attr("fill", "green")

    })
    .on("mouseout", function() {
      d3.select(this)

        //added a transition back to its original radius size of 10 
        .transition()
        //added easeBounce to the transition out for bounce effect
        .ease(d3.easeBounce)
        .duration(2000)
        .attr("r", 10)

        //altering the colour as the circle shrinks
        .attr("fill", "red")
    });