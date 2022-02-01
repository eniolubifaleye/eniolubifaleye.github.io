    //Create SVG element 
    var svg = d3.select("body") 
    .append("svg") 
    .attr("width",  400) 
    .attr("height", 400) 
    .style("border", '1px solid green'); 
 
    //Create and append rectangle element 
    svg.append("rect") 
            .attr("x", 0) 
            .attr("y", 0) 
            .attr("width", 200) 
            .attr("height", 100) 
            .attr("fill", 'pink');
           
    //Append circle  
    svg.append("circle") 
       .attr("cx", 250) 
       .attr("cy", 150) 
       .attr("r", 10); 
 
    svg.append("ellipse") 
       .attr("cx", 250) 
       .attr("cy", 50) 
       .attr("rx", 150) 
       .attr("ry", 50); 
 
    //Create and append text element into group 
    svg.append("text") 
     .attr("x", 150) 
     .attr("y", 50) 
     .attr("stroke", "#fff") 
     .text("This is some text!");
     
   //adding a square element with different coloured lines by creating rects of 1 width and then
   //changing the x and y position alongside colour
   svg.append("rect")
   		.attr("x", 100) 
      .attr("y", 100) 
      .attr("width", 100) 
      .attr("height", 1) 
      .attr("fill", 'blue');
   
   //effectively adding 4 rects with a very thin width 
   // (width 1) to make it appear like a line
   svg.append("rect")
   		.attr("x", 100) 
      .attr("y", 100) 
      .attr("width", 1) 
      .attr("height", 100) 
      .attr("fill", 'red');
      
   svg.append("rect")
   		.attr("x", 200) 
      .attr("y", 100) 
      .attr("width", 1) 
      .attr("height", 100) 
      .attr("fill", 'green');
      
   svg.append("rect")
   		.attr("x", 100) 
      .attr("y", 200) 
      .attr("width", 100) 
      .attr("height", 1) 
      .attr("fill", 'yellow');
      