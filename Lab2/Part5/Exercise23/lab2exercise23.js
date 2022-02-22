// create 2 data_set 
  const data1 = [{
      x: 1,
      y: 2
    },
    {
      x: 2,
      y: 3
    },
    {
      x: 3,
      y: 4
    },
    {
      x: 4,
      y: 5
    },
    {
      x: 5,
      y: 6
    }, {
      x: 6,
      y: 7
    },

    {
      x: 7,
      y: 8
    },
    {
      x: 8,
      y: 5
    }

  ];

  const data2 = [{
      x: 0,
      y: 8
    },
    {
      x: 1,
      y: 9
    },
    {
      x: 2,
      y: 10
    },
    {
      x: 3,
      y: 11
    },
    {
      x: 4,
      y: 12
    },
    {
      x: 5,
      y: 13
    }, {
      x: 6,
      y: 14
    },

    {
      x: 7,
      y: 15
    },
    {
      x: 8,
      y: 5
    }
  ];

  const xExtent = d3.extent(data2, d => {
    return d.x
  });

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

  // X bottom axis
  var x = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(xExtent)])
  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));


  // X top axis
  var x1 = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(xExtent)])
  var x1Axis = svg.append("g")
    .attr("transform", "translate(0, 0)")
    .call(d3.axisTop(x));


  // Add Y left axis 
  var y = d3.scaleLinear()

    .domain([0, 30])
    .range([height, 0]);
  var yAxis = svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));

  //Add Y right axis  
  var y1 = d3.scaleLinear()

    .domain([0, 30])
    .range([height, 0]);
  var y1Axis = svg.append("g")
    .attr("class", "myYaxis")
    //set to te width of the svg so if the width of the svg changes the right axis will 
    //move accordingly
    .attr("transform", "translate(" + width + ", 0)")
    .call(d3.axisRight(y));

  // A function that create / update the plot for a given variable: 
  function update(data) {

    // Add the line 
    var u = svg.append("path")
      .datum(data)

    u.enter()
      .append("path")
      .merge(u)
      .transition()
      .duration(1000)
      .attr("fill", "none")
      .attr("class", "lineD")
      .attr("stroke", "blue")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) {
          return x(d.x)
        })
        .y(function(d) {
          return y(d.y)
        })
      );

    u = d3.select(".lineD").transition().duration(1000).style("opacity", 0).remove();
  }
  // Initialize the plot with the first dataset 
  update(data1)
