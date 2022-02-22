var graph = d3.select("body") 
      .append("svg") 
      .attr("width", 200) 
      .attr("height", 200)
      .style("border", "2px solid black");

//Append text into the svg in the middle
var text =  graph.append("text")
    .attr("x", 100)
    .attr("y", 110)
    .attr("stroke", "black")
    .attr('text-anchor', 'middle')
    .text("Exercise 11");

    
  d3.selectAll(text)
    .on("mouseover", function(event) {
      d3.select(this)
      //added a transition so that the change is smoothe
      	.transition()
        .ease(d3.easeLinear)
        .duration(2000)
        //added easeLinear to the transition
        //changed the colour to red
        .attr("stroke", "red")
        .attr("fill", "red")
        .attr("font-size", "1.5em")
       
     
    })
    .on("mouseout", function() {
      d3.select(this)
      
        .transition()
        //added easeBounce to the transition out for bounce effect
        .ease(d3.easeBounce)
 				.duration(2000)
        .attr("stroke", "black")
        .attr("fill", "black")
        .attr("font-size", "1em")
       
    });