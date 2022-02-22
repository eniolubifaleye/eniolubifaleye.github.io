let cc = d3.interpolate('red', 'green')
  console.log(cc(0.5));

  function reveal() {

    d3.select(".answer").style("display", "block")
    var showText = document.getElementsByClassName("answer");

    //https://stackoverflow.com/questions/69479092/cannot-read-properties-of-undefined-reading-display
    //to be able to use getElementsByClassName
    Array.from(showText).forEach((x) => {
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    })
  }


//display a div with the interpolated colour
  d3.select('body')
    .append("p")
    .attr("class", "answer")
    .style('width', '100px')
    .style('height', '100px')
    .style('background-color', cc(0.5))
    .style('transform', 'scale(1.0)')