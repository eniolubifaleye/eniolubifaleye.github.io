  // create 2 data_set 
  const data1 = [{
      group: "A",
      value: 5
    },
    {
      group: "B",
      value: 20
    },
    {
      group: "C",
      value: 9
    }
  ];

  const data2 = [{
      group: "A",
      value: 10
    },
    {
      group: "B",
      value: 2
    },
    {
      group: "C",
      value: 22
    }
  ];


  //Added a 3rd data set
  const data3 = [{
      group: "A",
      value: 1
    },
    {
      group: "B",
      value: 2
    },
    {
      group: "C",
      value: 3
    }
  ];

  // set the dimensions and margins of the graph 
  const margin = {
    top: 40,
    right: 30,
    bottom: 70,
    left: 60
  };
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page 
  var svg = d3.select('body')
    .append('div')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  //added a transition to all the axis when the graph initially gets loaded up 
  // X bottom axis 
  var x = d3.scaleBand()
    .range([0, width])
    .domain(data1.map(function(d) {
      return d.group;
    }))
    .padding(0.2);
  svg.append("g")
    .transition()
    .duration(1000)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  //X axis top
  var x1 = d3.scaleBand()
    .range([0, width])
    .domain(data1.map(function(d) {
      return d.group;
    }))
    .padding(0.2);
  svg.append("g")
    .transition()
    .duration(1000)
    .attr("transform", "translate(0, 0)")
    .call(d3.axisTop(x))


  // Add Y left axis 
  var y = d3.scaleLinear()

    .domain([0, 30])
    .range([height, 0]);
  svg.append("g")
    .transition()
    .duration(1000)
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));

  //Add Y right axis  
  var y = d3.scaleLinear()

    .domain([0, 30])
    .range([height, 0]);
  svg.append("g")
    .transition()
    .duration(1000)
    .attr("class", "myYaxis")
    //set to te width of the svg so if the width of the svg changes the right axis will 
    //move accordingly
    .attr("transform", "translate(" + width + ", 0)")
    .call(d3.axisRight(y));

  // A function that create / update the plot for a given variable: 
  function update(data) {

    var myColor1 = d3.scaleLinear().domain([d3.min(data, function(d) {
      return d.value;
    }), d3.max(data, function(d) {
      return d.value;
    })]).range(["red", "blue"]);

    var u = svg.selectAll("rect")
      .data(data)

    u.enter()
      .append("rect")
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut)
      .merge(u)
      .transition()
      .duration(1000)
      .attr("x", function(d) {
        return x(d.group);
      })
      .attr("y", function(d) {
        return y(d.value);
      })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
        return height - y(d.value);
      })
      .attr("fill", "#69b3a2")

    //mouseover event handler function 
    function onMouseOver(d, i) {

      d3.select(this)
        .transition() // adds animation 
        .duration(400)
        //change the colour of the bar to a colour inbetween red and blue based on its value
        //from the variable myColor1
        .style("fill", function(d) {
          return myColor1(d.value)
        })

      //added a class to the text val so that it can be removed in the onMouseout
      //function
      svg.append("text")
        .attr('class', 'val')
        //altered the code so that the value of the text is placed directly on
        //top of the bar
        //adding the data "d" into the function as an arguement and returning 
        //the indexed data "i" as its x and y parameters
        .attr('x', function(d) {
          return x(i.group) + x.bandwidth() / 2;
        })
        .attr('y', function(d) {
          return y(i.value);
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
          return i.value;
        }); // Value of the text 
    }

    //mouseout event handler function 
    function onMouseOut(d, i) {
      d3.select(this)
        .transition() // adds animation 
        .duration(400)
        //when you leave a bar the colour goes back to how it was before hover
        .style("fill", "#69b3a2");
      //select the class val, which is the text in onMouseOver and remove the text
      d3.selectAll('.val')
        .remove()
    }
  }

  // Initialize the plot with the first dataset 
  update(data1);
