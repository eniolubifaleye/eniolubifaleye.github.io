  let graphData = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Exercise23File.csv";


  // Creating the different sets of data for each line; cosine and sine
  // Create Random Points
  const numPoints = 100;
  const data = [];

  for (let i = 0; i < numPoints; i++) {
    data.push({
      x: i / 100,
      y: Math.sin(6.2 * i / 100)
    });
  }

  // create random points for third line cosine line
  const dataCosine = [];

  for (let i = 0; i < numPoints; i++) {
    dataCosine.push({
      x: i / 100,
      y: Math.cos(6.2 * i / 100)
    });
  }
	
  // Set Dimensions
  
  //the code for creating the axis left right bottom and top are outside the
  //function call to prevent the axis being drawn everytime the function is 
  //called
  const xSize = 600;
  const ySize = 600;
  const margin = 40;
  const xMax = xSize - margin * 2;
  const yMax = ySize - margin * 2;


  // Get the 'limits' of the data - the full extent (mins and max) 
  // so the plotted data fits perfectly  
  const xExtent = d3.extent(data, d => {
    return d.x
  });
  const yExtent = d3.extent(data, d => {
    return d.y
  });

  // Append SVG Object to the Page 
  const svg = d3.select("body")
    .append("svg")
    .attr('width', xSize)
    .attr('height', ySize)
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

  // X Axis 
  const x = d3.scaleLinear()
    .domain([xExtent[0], xExtent[1]])
    .range([0, xMax]);

  // bottom 
  svg.append("g")
    .attr("transform", "translate(0," + yMax + ")")
    .call(d3.axisBottom(x))
    .attr('color', 'green'); // make bottom axis green 

  // top 
  svg.append("g")
    .call(d3.axisTop(x));

  // Y Axis 
  const y = d3.scaleLinear()
    .domain([yExtent[0], yExtent[1]])
    .range([yMax, 0]);

  // left y axis 
  svg.append("g")
    .call(d3.axisLeft(y));

  // right y axis 
  svg.append("g")
    .attr("transform", `translate(${yMax},0)`)
    .call(d3.axisRight(y));


//function lineGraph takes in two arguements, the data for the line to be
//drawn and the colour of the line
  function lineGraph(typeOfGraphData, lineColour) {

    // Add the line 
    svg.append("path")
    //the data of the line is the arguement data passed into the function
      .datum(typeOfGraphData)
      .attr("fill", "none")
      .attr("stroke", lineColour)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) {
          return x(d.x)
        })
        .y(function(d) {
          return y(d.y)
        })
      );
		
    
    //one of the function calls will have to use the graphData from csv
    d3.csv(typeOfGraphData, function(data) {

      //return the data loaded in by csv callback function
      return data;

      // then() used to return a promise of csv callback function
      // so that data can be loaded before any updates to data and variables, arrays are made 
    }).then(function(d) {

      // Add the line 
      svg.append("path")
      	//using data from function call
        .datum(d)
        .attr("fill", "none")
        .attr("stroke", lineColour)
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) {
            return x(d.x)
          })
          .y(function(d) {
            return y(d.y)
          })
        );

    });

  }
  
  //function call to call 3 different lines on the graph, 1 cosine, 1 sine and 
  //one line from csv file
  lineGraph(data, "steelblue");
  lineGraph(dataCosine, "green");
  lineGraph(graphData, "red");
