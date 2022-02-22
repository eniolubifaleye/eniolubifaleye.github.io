  var svg = d3.select("svg");
  var margin = 200;
  var width = svg.attr("width") - margin;
  var height = svg.attr("height") - margin;

  //added the csv file into the code
  var csvfile = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Lab2Exercise15.csv";

  svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("y", 50)
    //centre the stock price header label and transition it in on load on x axis
    .transition()
    .duration(400)
    .attr("x", width / 2 - 75)
    .attr("font-size", "24px")
    .text("Stock Price")

  var x = d3.scaleBand().range([0, width]).padding(0.4);
  var y = d3.scaleLinear().range([height, 0]);

  var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

  d3.csv(csvfile, function(newData) {
    return newData;

  }).then(function(data) {

    x.domain(data.map(function(d) {
      return d.year;
    }));
    y.domain([0, d3.max(data, function(d) {
      return d.value;
    })]);

    //add a variable to initialise a range of colors from red to blue based on the value in
    //the csv file
    //domain from the lowest value in the csv to the highest in the csv
    var myColor1 = d3.scaleLinear().domain([d3.min(data, function(d) {
      return d.value;
    }), d3.max(data, function(d) {
      return d.value;
    })]).range(["red", "blue"]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("y", height - 250)

      //centre the year label and transition it in on load on x axis
      .transition()
      .duration(400)
      .attr("x", width / 2)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Year");

    g.append("g")
      .call(d3.axisLeft(y).tickFormat(function(d) {
        return "$" + d;
      }).ticks(10))
      .append("text")
      .attr("x", -height / 2 + 50)
      //centre the stock price y label and transition it in on load on x axis
      .transition()
      .duration(400)
      .attr("y", -1)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .attr("transform", "rotate(-90)")
      .text("Stock Price");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      //    .on(..... ) – call mouse events here...
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut)
      .attr("x", function(d) {
        return x(d.year);
      })
      .attr("y", function(d) {
        return y(d.value);
      })
      .attr("width", x.bandwidth())
      .transition()
      .ease(d3.easeLinear)
      .duration(400)
      .delay(function(d, i) {
        return i * 50;
      })
      .attr("height", function(d) {
        return height - y(d.value);
      });

    //mouseover event handler function 
    function onMouseOver(d, i) {
      d3.select(this)
        .transition() // adds animation 
        .duration(400)
        .attr('width', x.bandwidth() + 5)
        .attr("y", function(d) {
          return y(d.value) - 10;
        })
        //transition the style() of the bars upon hover to change to the range of value in
        //myColor1
        .style("fill", function(d) {
          return myColor1(d.value)
        })
        .attr("height", function(d) {
          return height - y(d.value) + 10;
        });

      g.append("text")
        .attr('class', 'val')

        //altered the code so that the value of the text is placed directly on
        //top of the bar
        //adding the data "d" into the function as an arguement and returning 
        //the indexed data "i" as its x and y parameters      	
        .attr('x', function(d) {
          return x(i.year) + x.bandwidth() / 2;
        })

        //added tranasition so the text of the value for each bar drops into place 
        .transition()
        .duration(400)
        .attr('y', function(d) {
          //minus 10 so it sits on top of the bar
          return y(i.value) - 10;
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
          return '$' + i.value;
        }); // Value of the text 
    }

    //mouseout event handler function 
    function onMouseOut(d, i) {
      // use the text label class to remove label on mouseout 
      d3.select(this).attr('class', 'bar');
      d3.select(this)
        .transition() // adds animation 
        .duration(400)
        .attr('width', x.bandwidth())
        .attr("y", function(d) {
          return y(i.value);
        })
        //.style() to change the colour back to steelblue 
        .style("fill", "steelblue")
        .attr("height", function(d) {
          return height - y(i.value);
        });

      //remove the text value after it is removed
      d3.selectAll('.val')
        .remove()
    }
  });