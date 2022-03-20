// set the dimensions and margins of the graph 
  const marginMap = {
    top: 10,
    right: 30,
    bottom: 60,
    left: 30
  };

  const widthMap = 560 - marginMap.left - marginMap.right;
  const heightMap = 300 - marginMap.top - marginMap.bottom;

  // Map and projection
  const path = d3.geoPath();
  const projection = d3.geoMercator()
    .scale(80)
    .center([0, 20])
    .translate([widthMap / 2, heightMap / 2]);

  // Data and color scale
  const dataMap = new Map();

  const colorScale = d3.scaleThreshold()
    .domain([100, 1000, 10000, 30000, 100000, 500000])
    .range(d3.schemeGreens[7]);

  // append the svg object to the body of the page 
  var svgMap = d3.select('body').select("#my_dataviz")
    .append("svg")
    .attr("width", widthMap + marginMap.left + marginMap.right)
    .attr("height", heightMap + marginMap.top + marginMap.bottom)
    .append("g")
    .attr("transform",
      "translate(" + marginMap.left + "," + marginMap.top + ")")
    .attr("viewBox", `0 0 ` + widthMap + ` ` +  heightMap);


  //adding the datasets for the promise all from my github into variable names
//https://github.com/holtzy/D3-graph-gallery/blob/master/DATA/world.geojson
  var totalDeaths = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/total_deaths.csv";
  var geojson = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/world.geojson";
  var locations = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/locations.csv";
  var totalCases = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/new_cases.csv";

  // Load external data and boot
  Promise.all([
    d3.json(geojson),
    d3.csv(totalDeaths),
    d3.csv(locations),
    d3.csv(totalCases)
  ]).then(function(files) {


    //store datasets in arrays 
    let topo = files[0];
    let totalDeathsCountry = files[1];
    let locationsMap = files[2];
    let totalCasesCountry = files[3];
    let totalDeaths = totalDeathsCountry[totalDeathsCountry.length - 1];


    //function to delete variabl object names from the set
    //https://stackoverflow.com/questions/24864613/delete-multiple-object-properties
    function deleteProps(obj, keyValue) {
      for (const k of keyValue) {
        (k in obj) && (delete obj[k]);
      }
    }

    //create a dataset for the markers for where the circles would be positioned on the map
      //https://www.latlong.net/
    const markers = [{
        long: -110.037361,
        lat: 47.942840,
        name: "North America",
        totalDeathsTotal: totalDeaths["North America"],
        size: 53
      }, //north america
      {
        long: -54.477341,
        lat: -23.950116,
        name: "South America",
        totalDeathsTotal: totalDeaths["South Africa"],
        size: 30
      }, //south america
      {
        long: 24.325241,
        lat: 7.641305,
        name: "Africa",
        totalDeathsTotal: totalDeaths.Africa,
        size: 40
      }, //africa
      {
        long: 17.244226,
        lat: 52.439936,
        name: "Europe",
        totalDeathsTotal: totalDeaths.Europe,
        size: 60
      }, //europe
      {
        long: 135.4931696,
        lat: -23.950116,
        name: "Oceania",
        totalDeathsTotal: totalDeaths.Oceania,
        size: 15
      }, //oceania
      {
        long: 71.421001,
        lat: 38.767787,
        name: "Asia",
        totalDeathsTotal: totalDeaths.Asia,
        size: 50
      } //asia
    ];


    //function call to delete the irrelavant keys from the object
    deleteProps(totalDeaths, ['Africa', 'date', 'Asia', 'Europe', 'European Union', 'High income', 'International', 'Low income', 'Lower middle income', 'Oceania', 'Upper middle income', 'World', 'Eritrea', 'North America', 'South America', 'Vatican', 'Marshall Islands']);

      
    //https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
    //for loops to remove the uneeded entries from the locations dataset
    for (var i = 0; i < locationsMap.length; i++) {
      if (locationsMap[i].iso_code.includes("OWID") || locationsMap[i].iso_code.includes("SXM")) {
        locationsMap.splice(i, 1);
      }

      if (locationsMap[i].location.includes("Northern Ireland")) {
        locationsMap.splice(i, 1);
      }
    }


    //add the iso_codes from the updated locations dataset to a new array
    let locationsISO = [];
    for (var i = 0; i < locationsMap.length; i++) {
      locationsISO.push(locationsMap[i].iso_code);
    }

    //update the iso_code array so that it can be used to map and create a dataset
    //for the colours in the map
    locationsISO.push(locationsISO.splice(locationsISO.indexOf("JEY"), 1)[0]);
    locationsISO.push("OSA");
    locationsISO.push("FSM")
    locationsISO.push("PLW")
    locationsISO.push("SPM")

    //remove uneeded iso_codes
    for (var i = 0; i < locationsISO.length; i++) {
      if (locationsISO[i].includes("NRU") || locationsISO[i].includes("NIU") ||
        locationsISO[i].includes("PCN") || locationsISO[i].includes("TKL") ||
        locationsISO[i].includes("TKM") || locationsISO[i].includes("TUV") ||
        locationsISO[i].includes("GGY")) {
        locationsISO.splice(i, 1);
      }
    }

    let totalDeathsKeys = [];
    let totalDeathsValues = [];
      
      //https://stackoverflow.com/questions/51313811/d3-keys-syntax-clarification
    //for loop to populate the newly created arrays with objects keys and value pairs
    for (var i = 0; i < Object.keys(totalDeaths).length; i++) {
      totalDeathsKeys.push(Object.keys(totalDeaths)[i]);
      totalDeathsValues.push(Object.values(totalDeaths)[i]);
    }


    //update the keys adn values arrays so that the iso_code, keys and values can be mapped well
    // https://stackoverflow.com/questions/24909371/move-item-in-array-to-last-position
    totalDeathsKeys.push("Jersey");
    totalDeathsKeys.push(totalDeathsKeys.splice(totalDeathsKeys.indexOf("Kosovo"), 1)[0]);
    totalDeathsKeys.push(totalDeathsKeys.splice(totalDeathsKeys.indexOf("Micronesia (country)"), 1)[0]);
    totalDeathsKeys.push(totalDeathsKeys.splice(totalDeathsKeys.indexOf("Palau"), 1)[0]);
    totalDeathsKeys.push(totalDeathsKeys.splice(totalDeathsKeys.indexOf("Saint Pierre and Miquelon"), 1)[0]);

    totalDeathsValues.push("");
    totalDeathsValues.push(totalDeathsValues.splice(totalDeathsValues.indexOf("3115.0"), 1)[0]);
    totalDeathsValues.push(totalDeathsValues.splice(124, 1)[0]);
    totalDeathsValues.push(totalDeathsValues.splice(144, 1)[0]);
    totalDeathsValues.push(totalDeathsValues.splice(159, 1)[0]);


    //map iso_codes and values to make a set
    for (var i = 0; i < totalDeathsValues.length; i++) {
      dataMap.set(locationsISO[i], totalDeathsValues[i])
    }

    // Add a scale for bubble size
    var size = d3.scaleLinear()
      .domain([1, 100]) // What's in the data
      .range([4, 50]) // Size in pixel


    // create a tooltip for each hover over a country
    const countryTooltip = d3.select(".left")
      .append("div")
      .attr("class", "countryTooltip")
      .style("opacity", 1)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    //function mouse over for hovering over each country.
    //select the rest of the countries and fade them out
    //the selected country is highlighted and a tooltip of the countrys
    //name and total deaths are shown 
    //https://www.d3-graph-gallery.com/graph/choropleth_hover_effect.html
    function mouseOver(d, i) {
      d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", .5)
      d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("stroke", "black")

      countryTooltip.style("opacity", 1)
      d3.select(".countryTooltip").transition().duration(500)
        .style("display", "block");

      countryTooltip
        .html(i.properties.name + "<br>" + "Total Deaths: " + i.total)
    }

    //function to reset tooltip and rest of country fading
    function mouseLeave(d, i) {
      d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", 1)
      d3.select(this)
        .transition()
        .duration(200)
        .style("stroke", "none")

      countryTooltip.style("opacity", 0)
    }

    // Draw the map
    svgMap.append("g")
      .selectAll("path")
      .data(topo.features)
      .enter()
      .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function(d) {
        d.total = dataMap.get(d.id) || 0;
        return colorScale(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d) {
        return "Country"
      })
      .style("opacity", .8)
      .on("mouseover", mouseOver)
      .on("mouseleave", mouseLeave)

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event, d) {
      Tooltip.style("opacity", 1)
      d3.select(".tooltip").transition().duration(500)
        .style("display", "inline-block");

      if (d.name == "North America") {
        drawContinent(filterNorth);
      }

      if (d.name == "South America") {
        drawContinent(filterSouth);
      }

      if (d.name == "Africa") {
        drawContinent(filterAfrica);
      }

      if (d.name == "Europe") {
        drawContinent(filterEurope);
      }

      if (d.name == "Oceania") {
        drawContinent(filterOceania);
      }

      if (d.name == "Asia") {
        drawContinent(filterAsia);
      }
    }

    var mousemove = function(event, d) {
      Tooltip
        .html(d.name + "<br>" + "long: " + d.long +
          "<br>" + "lat: " + d.lat +
          "<br>" + "Total Deaths: " + d.totalDeathsTotal)
        .style("left", (event.x) / 2 + "px")
        .style("top", (event.y) / 2 - 30 + "px")
    }

    var mouseleave = function(event, d) {
      Tooltip.style("opacity", 0)
    }
    
    //https://www.d3-graph-gallery.com/graph/bubblemap_tooltip.html
    //https://www.d3-graph-gallery.com/graph/bubblemap_basic.html
    svgMap
      .selectAll("myCircles")
      .data(markers)
      .join("circle")
      .attr("cx", d => projection([d.long, d.lat])[0])
      .attr("cy", d => projection([d.long, d.lat])[1])
      .attr("r", function(d) {
        return size(d.size)
      })
      .style("fill", "69b3a2")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 3)
      .attr("fill-opacity", .4)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    // create a tooltip
    const Tooltip = d3.select(".left")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 1)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    //adding continents for variables to keep when filtering using filtering method
    var keysNorthKeep = ["date", "North America"];
    var keysSouthKeep = ["date", "South America"];
    var keysAfricaKeep = ["date", "Africa"];
    var keysEuropeKeep = ["date", "Europe"];
    var keysOceaniaKeep = ["date", "Oceania"];
    var keysAsiaKeep = ["date", "Asia"];

    //filters for each continent for hover over circle
    //https://stackoverflow.com/questions/54907549/keep-only-selected-keys-in-every-object-from-array
    let filterNorth = totalCasesCountry.map(value => Object.assign({}, ...keysNorthKeep.map(key => ({
      [key]: value[key]
    }))))

    let filterSouth = totalCasesCountry.map(value => Object.assign({}, ...keysSouthKeep.map(key => ({
      [key]: value[key]
    }))))

    let filterAfrica = totalCasesCountry.map(value => Object.assign({}, ...keysAfricaKeep.map(key => ({
      [key]: value[key]
    }))))

    let filterEurope = totalCasesCountry.map(value => Object.assign({}, ...keysEuropeKeep.map(key => ({
      [key]: value[key]
    }))))

    let filterOceania = totalCasesCountry.map(value => Object.assign({}, ...keysOceaniaKeep.map(key => ({
      [key]: value[key]
    }))))

    let filterAsia = totalCasesCountry.map(value => Object.assign({}, ...keysAsiaKeep.map(key => ({
      [key]: value[key]
    }))))
    
    //https://stackoverflow.com/questions/6942137/rename-the-keys-in-an-object
    //change the keys names function
    function renameKeys(obj, oldKey, newKey) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }

    //change each of the datasets keys
    filterNorth.forEach(obj => renameKeys(obj, 'North America', 'value'));
    filterSouth.forEach(obj => renameKeys(obj, 'South America', 'value'));
    filterAfrica.forEach(obj => renameKeys(obj, 'Africa', 'value'));
    filterEurope.forEach(obj => renameKeys(obj, 'Europe', 'value'));
    filterOceania.forEach(obj => renameKeys(obj, 'Oceania', 'value'));
    filterAsia.forEach(obj => renameKeys(obj, 'Asia', 'value'));


    //xExtent for the line graph
    const xExtentContinent = d3.extent(totalCasesCountry, d => {
      return d3.timeParse("%Y-%m-%d")(d.date)
    });

    const yExtentContinent = d3.extent(filterAsia, d => {
      return +d.value
    });

    //create svg for line graph 
    var svgContinent = d3.select('body').select("#my_dataviz2")
      .append("svg").attr("width", widthMap + marginMap.left + marginMap.right)
      .attr("height", heightMap + marginMap.top + marginMap.bottom)
      .attr("class", "lineMap")
      .append("g")
      .attr("transform", "translate(" + marginMap.left + "," + marginMap.top + ")")
      .attr("viewBox", `0 0 ` + widthMap + ` ` +  heightMap);

    // X bottom axis for main line graph
    var xLine = d3.scaleTime()
      .range([0, widthMap], .1)
      .domain(xExtentContinent);

    // Add Y left axis for main line graph
    var yLine = d3.scaleLinear()
      .domain([0, 100 + d3.max(yExtentContinent)])
      .range([heightMap, 0]);

    //add the X and Y axis to the focus group
    var xAxisLine = svgContinent.append("g")
      .attr("class", "XaxisLine")
      .attr("transform", "translate(30," + heightMap + ")")
      .call(d3.axisBottom(xLine));

    var yAxisLine = svgContinent.append("g")
      .attr("class", "YaxisLine")
      .attr("transform", "translate(30,0)")
      .call(d3.axisLeft(yLine).ticks(10, "s"));
      
    // add x and y axis labels 
    //x label positioning
    svgContinent.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", (widthMap / 2) + marginMap.top + 10)
        .attr("y", heightMap + marginMap.bottom - 20)
        .style("font-size", 15)
        .text("Date");
      
     //y label positioning
     svgContinent.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -marginMap.left)
            .attr("x", -marginMap.bottom - 50)
            .style("font-size", 15)
            .attr("dy", "1em")
            .attr("transform", "rotate(-90)")
            .text("no. of covid cases");

    function drawContinent(data) {
			
      //update the y domain
      yLine.domain([0, d3.max(data.map(function(d) {
        return +d.value;
      }))]);
			
      //update the y axis
      yAxisLine = svgContinent.select(".YaxisLine").transition()
        .duration(1000)
        .call(d3.axisLeft(yLine).ticks(10, "s"));

      // Add the line 
      var u = svgContinent.append("path")
        .datum(data)

      u.enter()
        .append("path")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("fill", "none")
        .attr("class", "lineDContinent")
        .attr("stroke", "lightgreen")
        .attr("stroke-width", 1)
        .attr("d", d3.line()
          .x(function(d) {
            return xLine(d3.timeParse("%Y-%m-%d")(d.date))
          })
          .y(function(d) {
            return yLine(+d.value)
          })
        );

      u = d3.select(".lineDContinent").transition().duration(200).style("opacity", 0).remove();
    }

  })
