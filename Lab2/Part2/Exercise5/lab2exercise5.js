  var graph = d3.select("body")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200)
    .style("border", "2px solid black");

  //mouse over to add text to position of the cursor
  //when the mouse stops the text is displayed on the svg graph element
  d3.select("svg")
    .on("mouseenter", function(event) {

      d3.select(this)

      //set x and y variables for x and y coords for the text from the pointer
      // event which takes the x and y  coords of the pointer
      let x = d3.pointer(event)[0];
      let y = d3.pointer(event)[1];

      //Create and append text element into group 
      var text = graph.append("text")
        //use x and y variables set
        .attr("x", x)
        .attr("y", y)
        .attr("stroke", "red")
        .text("B")
    });

  //mouse move to add text to position of the cursor
  d3.select("svg")
    .on("mousemove", function(event) {

      d3.select(this)

      //set x and y variables for x and y coords for the text from the pointer
      // event which takes the x and y  coords of the pointer
      let x = d3.pointer(event)[0];
      let y = d3.pointer(event)[1];


      //Create and append text element into group 
      var text = graph.append("text")
        //use x and y variables set
        .attr("x", x)
        .attr("y", y)
        .attr("stroke", "black")
        .text("A")

        //add a transition so that when the cursor is moving 100
        //seconds after the text has been appended to the svg
        //it is removed to give the imitition that the text is following
        //the cursor
        .transition()
        .duration(100)
        .remove();
    });