  let intr = d3.interpolate([20, 40, 4], [1, 12, 10])

  console.log("Type of returned function is: ", typeof(intr));
  console.log(intr(0.2))

  function reveal() {
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
