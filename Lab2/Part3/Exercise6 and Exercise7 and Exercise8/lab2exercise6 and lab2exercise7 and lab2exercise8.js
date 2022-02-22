  //create the rect dimensions and color
  var rect = d3.select('body')
    .append("div")
    .style('width', '100px')
    .style('height', '100px')
    .style('background-color', 'blue');

  function drawRect() {
    //when you hover the rect a new rect is created underneath it
    //with the ease elastic transition
    var rectCreate = d3.select('body')
      .append("div")
      .attr("class", "newRect")
      .transition()
      .ease(d3.easeElastic)
      .duration(3000)
      .style('width', '50px')
      .style('height', '50px')
      .style('background-color', 'blue');
  }

  //remove the rect from the page
  function removeRect(rectCreate) {
    d3.select(".newRect").remove();
  }

  d3.selectAll(rect)
    .on("mouseover", function(event) {

      //call draw rect function
      drawRect();

      d3.select(this)
        .transition()
        //added elastic ease into transition for added extra effect for transition
        //into different shape size
        .ease(d3.easeElastic)
        .duration(3000)
        .style("background-color", "red")
        //altered the width and height so that the dimensions change
        //during the transition
        .style('width', '200px')
        .style('height', '200px')
    })
    .on("mouseout", function() {

      //call remove rect function 
      removeRect();

      d3.select(this)
        //add extra transition to change color to green after 2 seconds
        .transition()
        .ease(d3.easeElastic)
        .duration(2000)
        .style("background-color", "green")
        //altered the width and height so that the dimensions change back
        //during the transition
        .style('width', '100px')
        .style('height', '100px')
    });