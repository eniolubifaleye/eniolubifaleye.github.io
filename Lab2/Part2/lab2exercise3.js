  d3.select('body')
    .append('div')
    .style('width', '100px')
    .style('height', '20px')
    .style('background-color', 'green');

  d3.selectAll("div")
    .on("mouseover", function(event) {
      d3.select(this)
        //added a transition so that the change is smoothe
        .transition()
        .duration(2000)
        .style("background-color", "orange")

        //adding extra styles so that the size of the rectangle changes
        //and there is a border added to the rectangle.

        .style("width", "200px")
        .style("height", "40px")
        .style("border", "2px solid black");

    })
    .on("mouseout", function() {
      d3.select(this)

        //added a transition back to its original size and color
        .transition()
        .duration(2000)
        .style("background-color", "green")
        .style('width', '100px')
        .style('height', '20px')
    });