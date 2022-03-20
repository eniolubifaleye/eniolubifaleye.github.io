
  var locations = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/locations.csv";

  // set the dimensions and margins of the graph 
  const margin = {
    top: 40,
    right: 30,
    bottom: 70,
    left: 60
  };

  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  var graph = d3.select(".dashboard2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border", "2px black solid")
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")
    .attr("viewBox", `0 0 ` + width + ` ` +  height)
  
  //https://stackoverflow.com/questions/68519988/simple-pan-and-zoom-in-d3-v7
  //handle zoom events for the svg container
  function handleZoom(e) {
    graph.attr('transform', e.transform);
  }

 //https://www.d3-graph-gallery.com/graph/interactivity_zoom.html
  //cant zoom out from initial graph set 
  let zoom = d3.zoom()
    .scaleExtent([1, 5])
    .translateExtent([
      [-50, 0],
      [width + 50, height + 50]
    ])
    .on('zoom', handleZoom);

  graph.call(zoom);

//d3 promise all to 
  Promise.all([
    d3.csv(locations),
  ]).then(function(files) {

    let locations = [];
    locations = files[0];

    //Count of all WHO main vaccines
    let modernaCountWHO = 0;
    let pfizerCountWHO = 0;
    let johnsonCountWHO = 0;
    let oxfordCountWHO = 0;

    //Count of all MIN main vaccines
    let modernaCountMIN = 0;
    let pfizerCountMIN = 0;
    let johnsonCountMIN = 0;
    let oxfordCountMIN = 0;

    //Count of all SPC main vaccines
    let modernaCountSPC = 0;
    let pfizerCountSPC = 0;
    let johnsonCountSPC = 0;
    let oxfordCountSPC = 0;

    //list for all the source_names
    var sourceNameData = ["World Health Organization", "Ministry of Health", "SPC Public Health Division"]
    let vaccineNameData = ["Moderna", "Pfizer/BioNTech", "Johnson&Johnson", "Oxford/AstraZeneca"]

    //list for the different counts
    let modernaData = [];
    let pfizerData = [];
    let johnsonData = [];
    let oxfordData = [];

    let stackedData = [];

		//for loops to collect the count of the different main vaccines
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].source_name.includes("World Health Organization")) {
        if (locations[i].vaccines.includes("Moderna")) {
          modernaCountWHO++;
        }

        if (locations[i].vaccines.includes("Pfizer")) {
          pfizerCountWHO++;
        }

        if (locations[i].vaccines.includes("Johnson")) {
          johnsonCountWHO++;
        }

        if (locations[i].vaccines.includes("Oxford")) {
          oxfordCountWHO++;
        }
      }

      if (locations[i].source_name.includes("Ministry of Health")) {
        if (locations[i].vaccines.includes("Moderna")) {
          modernaCountMIN++;
        }

        if (locations[i].vaccines.includes("Pfizer")) {
          pfizerCountMIN++;
        }

        if (locations[i].vaccines.includes("Johnson")) {
          johnsonCountMIN++;
        }

        if (locations[i].vaccines.includes("Oxford")) {
          oxfordCountMIN++;
        }
      }

      if (locations[i].source_name.includes("SPC Public Health Division")) {
        if (locations[i].vaccines.includes("Moderna")) {
          modernaCountSPC++;
        }

        if (locations[i].vaccines.includes("Pfizer")) {
          pfizerCountSPC++;
        }

        if (locations[i].vaccines.includes("Johnson")) {
          johnsonCountSPC++;
        }

        if (locations[i].vaccines.includes("Oxford")) {
          oxfordCountSPC++;
        }
      }
    }

		//add those to the relevant vaccine arrays
    modernaData.push(modernaCountWHO)
    modernaData.push(modernaCountMIN)
    modernaData.push(modernaCountSPC)

    pfizerData.push(pfizerCountWHO)
    pfizerData.push(pfizerCountMIN)
    pfizerData.push(pfizerCountSPC)

    johnsonData.push(johnsonCountWHO)
    johnsonData.push(johnsonCountMIN)
    johnsonData.push(johnsonCountSPC)

    oxfordData.push(oxfordCountWHO)
    oxfordData.push(oxfordCountMIN)
    oxfordData.push(oxfordCountSPC)

    for (var i = 0; i < oxfordData.length; i++) {
      stackedData[i] = {
        source: sourceNameData[i],
        moderna: modernaData[i],
        pfizer: pfizerData[i],
        johnson: johnsonData[i],
        oxford: oxfordData[i]
      }
    }
    
    //create a html table to display the counts
    var html = "<table border = '1|1'>"

    html += '<thead>'
    html += '<tr>'
    html += '<td>' + "Source/Vaccine" + '</td>'
    html += '<td>' + "Moderna" + '</td>'
    html += '<td>' + "Pfizer/BioNTech" + '</td>'
    html += '<td>' + "Johnson&Johnson" + '</td>'
    html += '<td>' + "Oxford/AstraZeneca" + '</td>'
    html += '</tr>'
    html += '</thead>'

    for (var i = 0; i < oxfordData.length; i++) {
      html += '<tr>'
      html += '<td>' + sourceNameData[i] + '</td>'
      html += '<td>' + modernaData[i] + '</td>'
      html += '<td>' + pfizerData[i] + '</td>'
      html += '<td>' + johnsonData[i] + '</td>'
      html += '<td>' + oxfordData[i] + '</td>'
      html += '</tr>'
    }

    document.getElementById("table").innerHTML = html;

//https://www.d3-graph-gallery.com/graph/barplot_stacked_basicWide.html
    var subgroups = ["moderna", "pfizer", "johnson", "oxford"];
    var groups = d3.map(stackedData, function(d) {
      return (d.source)
    })

    // Add X axis
    var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
    var xAxis = graph.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 180])
      .range([height, 0]);
    var yAxis = graph.append("g")
      .call(d3.axisLeft(y));

    // Add second Y axis
    //changed its domain specifically for the SPC
    var y1 = d3.scaleLinear()
      .domain([5, 40])
      .range([70, 0]);
    var yAxis1 = graph.append("g")
      .attr("transform", "translate(" + width + ", " + (height - 70) + ")")
      .call(d3.axisRight(y1));
		
    
    //colour scale
    var color = d3.scaleOrdinal().domain(vaccineNameData)
      .range(["red", "green", "blue", "orange"]);

    //stack the data --> stack per subgroup
    var stackedDataPlot = d3.stack().keys(subgroups)(stackedData)

    var stacked = graph.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedDataPlot)
      .enter().append("g")
      .attr("fill", function(d) {
        return color(d.key);
      })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) {
        return d;
      })
      .enter().append("rect")
      .attr("x", function(d) {
        return x(d.data.source);
      })
      .attr("y", function(d) {
        return y(d[1]);
      })
      .attr("height", function(d) {
        return y(d[0]) - y(d[1]);
      })
      .attr("width", x.bandwidth())

    // This add an invisible rect on top of the chart area. 
    //This rect can recover pointer events: necessary to understand when the user zoom
    graph.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(zoom);

   
      //adding the legend to the graph to display which colour is which vaccine
   //creating the rect sizes
    var size = 15
    graph.selectAll("mydots")
      .data(vaccineNameData)
      .enter()
      .append("rect")
      .attr("x", width - 100)
      .attr("y", function(d, i) {
        return i * (size + 5)
      }) 
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d) {
        return color(d)
      })
    
      	//adding the vaccine name to the side of the rects
    graph.selectAll("mylabels")
      .data(vaccineNameData)
      .enter()
      .append("text")
      .attr("x", width - 100 + size * 1.2)
      .attr("y", function(d, i) {
        return i * (size + 5) + (size / 2)
      })
      .style("font-size", "12px")
      .text(function(d) {
        return d
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      
      
      // add x and y axis labels 
    //x label positioning
    graph.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.left - 60)
      .attr("y", height + margin.top)
      .style("font-size", 15)
      .text("Health Organisations");
      
      
      //y label positioning
    graph.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -margin.left)
      .attr("x", -margin.top - 80)
      .attr("dy", "1em")
      .style("font-size", 15)
      .attr("transform", "rotate(-90)")
      .text("No. of Vaccinations per Country");

  }).catch(function(err) {
    // handle error here
  })

  //https://www.d3indepth.com/zoom-and-pan/
  //https://www.geeksforgeeks.org/d3-js-zoomidentity-function/
  //https://stackoverflow.com/questions/48790190/how-to-reset-zoom-in-d3-js
  //function to reset the zoon
  function zoomReset() {
    graph.transition().duration(500).attr("transform", d3.zoomIdentity)
    graph.transition().duration(500).attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
      .attr("viewBox", [0, 0, width, height]);
  }
