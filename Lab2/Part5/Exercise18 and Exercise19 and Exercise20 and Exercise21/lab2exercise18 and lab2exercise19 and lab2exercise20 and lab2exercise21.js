 //each data set contains a new variable color which is used to set 
  //the color of each dataset
  // create 2 data_set 
  const data1 = [{
      group: "A",
      value: 5,
      color: "red"
    },
    {
      group: "B",
      value: 20,
      color: "red"
    },
    {
      group: "C",
      value: 9,
      color: "red"
    }
  ];

  const data2 = [{
      group: "A",
      value: 10,
      color: "blue"
    },
    {
      group: "B",
      value: 2,
      color: "blue"
    },
    {
      group: "C",
      value: 22,
      color: "blue"
    }
  ];


  //Added a 3rd data set
  const data3 = [{
      group: "A",
      value: 1,
      color: "green"
    },
    {
      group: "B",
      value: 2,
      color: "green"
    },
    {
      group: "C",
      value: 3,
      color: "green"
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

    .domain([0, d3.max(data1.map(function(d){return d.value})) + 2])
    .range([height, 0]);
 var yAxis = svg.append("g")
  	.transition()
    .duration(1000)
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));

  //Add Y right axis  
  var y1 = d3.scaleLinear()

    .domain([0, d3.max(data1.map(function(d){return d.value})) + 2])
    .range([height, 0]);
  var y1Axis = svg.append("g")
  	.transition()
    .duration(1000)
    .attr("class", "myYaxis1")
    //set to te width of the svg so if the width of the svg changes the right axis will 
    //move accordingly
    .attr("transform", "translate(" + width + ", 0)")
    .call(d3.axisRight(y));

  // A function that create / update the plot for a given variable: 
  function update(data) {

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
      //change the color of the each data set to be different colors
      .style("fill", function(d){ return d.color})
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
     
      //select the class val, which is the text in onMouseOver and remove the text
      d3.selectAll('.val')
        .remove()
    }
  }

  // Initialize the plot with the first dataset 
  update(data1);