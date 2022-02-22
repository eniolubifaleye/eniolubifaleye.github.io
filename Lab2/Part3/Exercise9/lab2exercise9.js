  d3.select('body')
    .append("div")
    .style('width', '100px')
    .style('height', '100px')
    .style('background-color', 'blue')
    .style('transform', 'scale(1.0)')
    .transition()
    .ease(d3.easeBounce)
    .duration(1000)
    .style("background-color", "red")
    .style('transform', 'scale(0.5)')


  //new div element with the easing method easeElastic
  //change color from green to yellow during transition
  d3.select('body')
    .append("div")
    .style('width', '100px')
    .style('height', '100px')
    .style('background-color', 'green')
    .style('transform', 'scale(1.0)')
    .transition()
    .ease(d3.easeElastic)
    .duration(1000)
    .style("background-color", "yellow")
    .style('transform', 'scale(0.5)')

  //new div element with the easing method easeLinear
  //change the colour from orange to black during transition
  d3.select('body')
    .append("div")
    .style('width', '100px')
    .style('height', '100px')
    .style('background-color', 'orange')
    .style('transform', 'scale(1.0)')
    .transition()
    .ease(d3.easeLinear)
    .duration(1000)
    .style("background-color", "black")
    .style('transform', 'scale(0.5)')

  //new div element with the easing method easeExp
  //change the colour from orange to black during transition
  d3.select('body')
    .append("div")
    .style('width', '100px')
    .style('height', '100px')
    .style('background-color', 'violet')
    .style('transform', 'scale(1.0)')
    .transition()
    .ease(d3.easeExp)
    .duration(1000)
    .style("background-color", "indigo")
    .style('transform', 'scale(0.5)')