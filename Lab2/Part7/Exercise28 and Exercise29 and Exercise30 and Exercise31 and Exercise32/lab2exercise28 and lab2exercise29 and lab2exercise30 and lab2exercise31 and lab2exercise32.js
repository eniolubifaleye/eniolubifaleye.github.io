 //altered the width to 1000px to see the radial plus the 3 clusters in one
  var width = 1000,
    height = 480;

  // setup svg with responsive svg
  d3.select('body').append('svg').attr("viewBox", `0 0 ` + width + ` ` +  height)

  var csvNodes = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Lab2Exercise29File.csv";

  //csv callback function to read radius and category data in instead of generating randomly
  d3.csv(csvNodes, function(newData) {
    return newData;

  }).then(function(data) {
   
    //https://www.d3indepth.com/force-layout/
    var xCenter = [100, 350, 600];

    var simulation = d3.forceSimulation(data)
      //https://observablehq.com/@ben-tanen/a-tutorial-to-using-d3-force-from-someone-who-just-learned-ho
      //radial added to form the circles around a centre point, (width/2) (height/2)  and a radius of 400
      .force("radial", d3.forceRadial(width/3, width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      //increased the forceCollide value to 
      .force('collision', d3.forceCollide(9).strength(1).radius(function(d) {
        return d.radius
      }))

      //created 3 categories for each of the circles to be clustered to
      //based on category feild set in nodes
      //then we position each center along an xAxis point in xCenter
      .force('x', d3.forceX().strength(0.1).x(function(d) {
        return xCenter[d.category];
      }))
      //and position along the Y axis
      //strength of 0.1 to pull the circles into each other, a negative sstrength will repel the circles along the y axis
      .force('y', d3.forceY().strength(0.1).y(function(d) {
        return 0;
      }))
      .on('tick', ticked);


    //added a colour range based on each circles radius
    var myColor1 = d3.scaleLinear().domain([d3.min(data, function(d) {
      return d.radius;
    }), d3.max(data, function(d) {
      return d.radius;
    })]).range(["red", "blue"]);

    function ticked() {
      var u = d3.select('svg')
        .selectAll('circle')
        .data(data)
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .join('circle')
        .style('fill', function(d) {
          return myColor1(d.radius)
        })
        .attr('r', function(d) {
          return d.radius
        })
        .attr('cx', function(d) {
          return d.x
        })
        .attr('cy', function(d) {
          return d.y
        })


      //mouseover event handler function 
      function onMouseOver(d, i) {
        d3.select(this)
          .transition() // adds animation 
          .duration(400)
          //change the colour of the circle to black
          .style("fill", "#69b3a2")

        //added a class to the text val so that it can be removed in the onMouseout
        //function
        var j = d3.select("svg").append("text")
          .attr('class', 'val')
          //making the font bolder
          .attr("font-weight", 900)
          //altered the code so that the value of the text is placed directly in the
          //middle of the ecircle
          //adding the data "d" into the function as an arguement and returning 
          //the indexed data "i" as its x and y parameters

          .attr('dx', function(d) {
            return (i.x)
          })
          .attr('dy', function(d) {
            return (i.y)
          })
          .attr('r', function(d) {
            return i.radius;
          })
          .attr("text-anchor", "middle")
          .text(function(d) {
            return d3.format(".4n")((i.radius));
          }); // Value of the radius of each circle to text
      }

      //mouseout event handler function 
      function onMouseOut(d, i) {
        d3.select(this)
          .transition() // adds animation 
          .duration(400)
          //when you leave a circle the colour goes to how it was before the initial hover
          .style("fill", function(d) {
            return myColor1(d.radius)
          });

        //select the class val, which is the text in onMouseOver and remove the text
        d3.selectAll('.val')
          .remove()
      }
    }

  });
