 //https://www.geeksforgeeks.org/d3-js-interpolatedate-function/
  let dateIntr = d3.interpolateDate(new Date("02/01/2022"), new Date("02/14/2022"))
  console.log(dateIntr(0.5));

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
  
    //display a p with the interpolated date
  d3.select('body')
    .append("p")
    .attr("class", "answer")
    .text(dateIntr(0.5))
    .style("color", "blue")