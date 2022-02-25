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
    },
    {
      group: "D",
      value: 4
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
  var xAxis = svg.append("g")
    .transition()
    .duration(1000)
    .attr("transform", "translate(0," + height + ")")
    //added classes to be easy to select and alter duringt the update function
    .attr("class", "bottomAxis")
    .call(d3.axisBottom(x))

  //X axis top
  var x1 = d3.scaleBand()
    .range([0, width])
    .domain(data1.map(function(d) {
      return d.group;
    }))
    .padding(0.2);
  var x1Axis = svg.append("g")
    .transition()
    .duration(1000)
    .attr("transform", "translate(0, 0)")
    .attr("class", "topAxis")
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
    .call(d3.axisRight(y1));

  // A function that create / update the plot for a given variable: 
  function update(data) {

    //update the bar chart so that when there is a dataset of different length, the
    //bar chart gets updated dynamically
    //update the domain of the bottom x axis
    x.domain(data.map(function(d) {
      return d.group;
    }))

    //update the svg element of the bottom x Axis
    xAxis = svg.select(".bottomAxis")
      .transition()
      .duration(1000)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    //update the domain of the top x axis
    x1.domain(data.map(function(d) {
      return d.group;
    }))

    //update the svg element of the bottom x Axis
    x1Axis = svg.select(".topAxis")
      .transition()
      .duration(1000)
      .attr("transform", "translate(0, 0)")
      .call(d3.axisTop(x1))
    
    //update the domain of the left y axis
    y.domain([0, d3.max(data.map(function(d){return d.value})) + 2])
    
    //update the svg element of the left y Axis
    yAxis = svg.select(".myYaxis")
    					 .transition()
               .duration(1000)
               .call(d3.axisLeft(y))
    
    //update the domain of the right y axis
    y1.domain([0, d3.max(data.map(function(d){return d.value})) + 2])
     
    //update the svg element of the right y Axis 
    y1Axis = svg.select(".myYaxis1")
    					 .transition()
               .duration(1000)
               .call(d3.axisRight(y1))
               

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

    //remove the extra data bar when transitioning back to a smaller dataset
    //added a style() to reduce the opacity to 0 before removing the extra dataset bar
    u.exit().transition().duration(1000).style("opacity", 0).remove();
  }

  // Initialize the plot with the first dataset 
  update(data1)

  //mouseover event handler function 
  function onMouseOver(d, i) {

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

    //select the class val, which is the text in onMouseOver and remove the text
    d3.selectAll('.val')
      .remove()
  }
