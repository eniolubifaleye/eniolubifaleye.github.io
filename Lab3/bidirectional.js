//https://jsfiddle.net/eniolubifaleye/me16wzgc/86/
  //http://bl.ocks.org/NPashaP/96447623ef4d342ee09b
  var ireland = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Ireland.csv";
  var scotland = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Scotland.csv";
  var england = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/England.csv";
  var wales = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Wales.csv";
  var vaccination = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/vaccinations.csv";


  //https://stackoverflow.com/questions/21842384/importing-data-from-multiple-csv-files-in-d3
  //promise all to take all the uk country data for vaccinations
  Promise.all([d3.csv(ireland), d3.csv(scotland), d3.csv(england), d3.csv(wales), d3.csv(vaccination)])

    .then(function(files) {

      // arrays for each country to hold the country data 
      let ireland = [];
      ireland = files[0];

      let scotland = [];
      scotland = files[1];

      let england = [];
      england = files[2];

      let wales = [];
      wales = files[3];

      let vaccinationData = [];
      vaccinationData = files[4];

      //filter the vaccinations dataset for the 4 different UK countries
      var filteredDataIreland = vaccinationData.filter(function(d) {
        return d.location == "Ireland"
      });
      var filteredDataScotland = vaccinationData.filter(function(d) {
        return d.location == "Scotland"
      });
      var filteredDataEngland = vaccinationData.filter(function(d) {
        return d.location == "England"
      });
      var filteredDataWales = vaccinationData.filter(function(d) {
        return d.location == "Wales"
      });

      //adding continents for variables to keep when filtering using filtering method
      var keysKeep = ["date", "location", "daily_vaccinations"];

      //filters for each country for hover over bar chart
      //https://stackoverflow.com/questions/54907549/keep-only-selected-keys-in-every-object-from-array
      let filterIreland = filteredDataIreland.map(value => Object.assign({}, ...keysKeep.map(key => ({
        [key]: value[key]
      }))))

      let filterScotland = filteredDataScotland.map(value => Object.assign({}, ...keysKeep.map(key => ({
        [key]: value[key]
      }))))

      let filterEngland = filteredDataEngland.map(value => Object.assign({}, ...keysKeep.map(key => ({
        [key]: value[key]
      }))))

      let filterWales = filteredDataWales.map(value => Object.assign({}, ...keysKeep.map(key => ({
        [key]: value[key]
      }))))

      //"people_fully_vaccinated_per_hundred",
      //  "people_vaccinated_per_hundred", "total_boosters_per_hundred",
      //  "total_vaccinations_per_hundred"

      let peopleFullyVaccH = []
      let peopleVaccH = []
      let totalBoostersH = []
      let totalVaccH = [];

      //populating the datasets for the pie chart to draw multiple lines on the line graph area
      for (var i = 0; i < filterWales.length; i++) {
        peopleFullyVaccH[i] = {
          date: filterWales[i].date,
          value1: +filteredDataIreland[i].people_fully_vaccinated_per_hundred,
          value2: +filteredDataScotland[i].people_fully_vaccinated_per_hundred,
          value3: +filteredDataEngland[i].people_fully_vaccinated_per_hundred,
          value4: +filteredDataWales[i].people_fully_vaccinated_per_hundred,
          label: "People Fully Vaccinated Per Hundred"
        }
      }

      for (var i = 0; i < filterWales.length; i++) {
        peopleVaccH[i] = {
          date: filterWales[i].date,
          value1: +filteredDataIreland[i].people_vaccinated_per_hundred,
          value2: +filteredDataScotland[i].people_vaccinated_per_hundred,
          value3: +filteredDataEngland[i].people_vaccinated_per_hundred,
          value4: +filteredDataWales[i].people_vaccinated_per_hundred,
          label: "People Vaccinated Per Hundred"
        }
      }

      for (var i = 0; i < filterWales.length; i++) {
        totalBoostersH[i] = {
          date: filterWales[i].date,
          value1: +filteredDataIreland[i].total_boosters_per_hundred,
          value2: +filteredDataScotland[i].total_boosters_per_hundred,
          value3: +filteredDataEngland[i].total_boosters_per_hundred,
          value4: +filteredDataWales[i].total_boosters_per_hundred,
          label: "Total Boosters Per Hundred"
        }
      }

      for (var i = 0; i < filterWales.length; i++) {
        totalVaccH[i] = {
          date: filterWales[i].date,
          value1: +filteredDataIreland[i].total_vaccinations_per_hundred,
          value2: +filteredDataScotland[i].total_vaccinations_per_hundred,
          value3: +filteredDataEngland[i].total_vaccinations_per_hundred,
          value4: +filteredDataWales[i].total_vaccinations_per_hundred,
          label: "Total Vaccinations Per Hundred"
        }
      }

      //xExtent for the line graph
      const xExtentCountry = d3.extent(filteredDataIreland, d => {
        return d3.timeParse("%Y-%m-%d")(d.date)
      });

      //yExtent for the line graph
      const yExtentCountry = d3.extent(filterEngland, d => {
        return +d.daily_vaccinations
      });

      //arrays of totals
      var totalVaccArray = [];
      let peopleVaccArray = [];
      let peopleFullyVacc = [];
      let totalBooster = [];

      //ireland totals
      let irelandTotalVacc = +ireland[ireland.length - 1].total_vaccinations;
      let irelandPeopleVacc = +ireland[ireland.length - 1].people_vaccinated;
      let irelandPeopleFullyVacc = +ireland[ireland.length - 1].people_fully_vaccinated;
      let irelandBooster = +ireland[ireland.length - 1].total_boosters;

      totalVaccArray.push(irelandTotalVacc)
      peopleVaccArray.push(irelandPeopleVacc)
      peopleFullyVacc.push(irelandPeopleFullyVacc)
      totalBooster.push(irelandBooster)

      //scotland totals
      let scotlandTotalVacc = +scotland[scotland.length - 1].total_vaccinations;
      let scotlandPeopleVacc = +scotland[scotland.length - 1].people_vaccinated;
      let scotlandPeopleFullyVacc = +scotland[scotland.length - 1].people_fully_vaccinated;
      let scotlandBooster = +scotland[scotland.length - 1].total_boosters;

      totalVaccArray.push(scotlandTotalVacc)
      peopleVaccArray.push(scotlandPeopleVacc)
      peopleFullyVacc.push(scotlandPeopleFullyVacc)
      totalBooster.push(scotlandBooster)

      //england totals
      let englandTotalVacc = +england[england.length - 1].total_vaccinations;
      let englandPeopleVacc = +england[england.length - 1].people_vaccinated;
      let englandPeopleFullyVacc = +england[england.length - 1].people_fully_vaccinated;
      let englandBooster = +england[england.length - 1].total_boosters;

      totalVaccArray.push(englandTotalVacc)
      peopleVaccArray.push(englandPeopleVacc)
      peopleFullyVacc.push(englandPeopleFullyVacc)
      totalBooster.push(englandBooster)

      //wales totals
      let walesTotalVacc = +wales[wales.length - 1].total_vaccinations;
      let walesPeopleVacc = +wales[wales.length - 1].people_vaccinated;
      let walesPeopleFullyVacc = +wales[wales.length - 1].people_fully_vaccinated;
      let walesBooster = +wales[wales.length - 1].total_boosters;

      totalVaccArray.push(walesTotalVacc)
      peopleVaccArray.push(walesPeopleVacc)
      peopleFullyVacc.push(walesPeopleFullyVacc)
      totalBooster.push(walesBooster)

      //creating dataset for all the UK values
      let ukData = []
      let countriesSelected = ["Ireland", "Scotland", "England", "Wales"]

      //create an array of objects using each total country array
      for (var i = 0; i < countriesSelected.length; i++) {
        ukData[i] = {
          Country: countriesSelected[i],
          totals: {
            totalVacc: totalVaccArray[i],
            peopleVacc: peopleVaccArray[i],
            peopleFully: peopleFullyVacc[i],
            totalBoost: totalBooster[i]
          }
        }
      }

      //function to initialize the dashboard
      //countryData is the data to be passed in
      function dashboard(countryData) {

        //histogram contraints
        var marginCountry = {
          top: 60,
          right: 0,
          bottom: 30,
          left: 60
        };

        //histogram width and height 
        var widthCountry = 500 - marginCountry.left - marginCountry.right;
        var heightCountry = 300 - marginCountry.top - marginCountry.bottom;

        //create svg for line graph 
        var svgCountry = d3.select("#dashboard")
          .append("svg").attr("width", widthCountry + marginCountry.left + marginCountry.right)
          .attr("height", heightCountry + marginCountry.top + marginCountry.bottom)
          .append("g")
          .attr("transform", "translate(" + marginCountry.left + "," + marginCountry.top + ")")
          .attr("viewBox", `0 0 ` + widthCountry + ` ` +  heightCountry)
          .on("click", resetLineGraph);
        // X bottom axis for main line graph
        var xCountry = d3.scaleTime()
          .range([0, widthCountry], .1)
          .domain(xExtentCountry);

        // Add Y left axis for main line graph
        var yCountry = d3.scaleLinear()
          .domain([0, 100 + d3.max(yExtentCountry)])
          .range([heightCountry, 0]);

        //add the X and Y axis to the focus group
        var xAxisLineCountry = svgCountry.append("g")
          .attr("class", "XaxisLineCountry")
          .attr("transform", "translate(0," + heightCountry + ")")
          .call(d3.axisBottom(xCountry).ticks(5));

        var yAxisLineCountry = svgCountry.append("g")
          .attr("class", "YaxisLineCountry")
          .attr("transform", "translate(0,0)")
          .call(d3.axisLeft(yCountry).ticks(10, "s"));

        //function to draw the line graph of daily vaccinations when you hover over
        function drawCountry(data) {

          //update the y domain
          yCountry.domain([0, d3.max(data.map(function(d) {
            return +d.daily_vaccinations;
          }))]);

          //update the y axis
          yAxisLineCountry = svgCountry.select(".YaxisLineCountry").transition()
            .duration(1000)
            .call(d3.axisLeft(yCountry).ticks(10, "s"));

          // Add the line 
          var uCountry = svgCountry.append("path")
            .datum(data)

          //draw the line and merge each of the data for each different line
          uCountry.enter()
            .append("path")
            .merge(uCountry)
            .transition()
            .duration(1000)
            .attr("fill", "none")
            .attr("class", "lineDCountry")
            .attr("stroke", "lightgreen")
            .attr("stroke-width", 1)
            .attr("d", d3.line()
              .x(function(d) {
                //parse the date to a date object
                return xCountry(d3.timeParse("%Y-%m-%d")(d.date))
              })
              .y(function(d) {
                return yCountry(+d.daily_vaccinations)
              })
            );
            
          //y label positioning
          svgCountry.append("text")
            .attr("class", "ylabelDaily")
            .attr("text-anchor", "end")
            .attr("y", -marginCountry.left)
            .attr("x", -marginCountry.top + 50)
            .attr("dy", "1em")
            .style("font-size", 15)
            .attr("transform", "rotate(-90)")
            .text(keysKeep[2]);

          uCountry = d3.select(".lineDCountry").transition().duration(200).style("opacity", 0).remove();
        }

        //function to hold a colour for each different segment for a pie chart
        function pieSectionColour(c) {
          return {
            totalVacc: "#807dba",
            peopleVacc: "#e08214",
            peopleFully: "#41ab5d",
            totalBoost: "yellow"
          } [c];
        }

        // compute total for each state.
        countryData.forEach(function(d) {
          d.total = d.totals.totalVacc + d.totals.peopleVacc + d.totals.peopleFully + d.totals.totalBoost;
        });

        // function to handle histogram.
        function histoGram(histoData) {

          var hG = {},
            //histogram contraints
            margins = {
              top: 60,
              right: 0,
              bottom: 30,
              left: 0
            };

          //histogram width adn height 
          var width = 500 - margins.left - margins.right;
          var height = 300 - margins.top - margins.bottom;

          //create svg for histogram.
          var histogramsSVG = d3.select("#dashboard").append("svg").attr("class", "histogramSVG")
            .attr("width", width + margins.left + margins.right)
            .attr("height", height + margins.top + margins.bottom).append("g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
            .attr("viewBox", `0 0 ` + width + ` ` +  height)

          //create x scale
          var x = d3.scaleBand().domain(histoData.map(function(d) {
              return d[0];
            }))
            .range([70, width])
            .padding([0.2])

          // Add x-axis to the histogram svg.
          var xAxis = histogramsSVG.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

          // Create y scale
          var y = d3.scaleLinear().range([height, 0]).domain([0, histoData[2][1]]);

          // add y-axis to the histogram svg
          var yAxis = histogramsSVG.append("g")
            .attr("class", "myYaxis")
            .attr("transform", "translate(70,0)")
            .call(d3.axisLeft(y).ticks(10, "s"));

          //https://www.d3-graph-gallery.com/graph/histogram_basic.html
          // Create bars for histogram
          var bars = histogramsSVG.selectAll(".bar")
            .data(histoData)
            .enter()
            .append("g")
            .attr("class", "bar");

          //create the rectangles and add them to the svg
          bars.append("rect")
            .attr("x", function(d) {
              return x(d[0]);
            })
            .attr("y", function(d) {
              return y(d[1]);
            })
            .attr("class", "rectBi")
            .attr("width", x.bandwidth())
            .attr("height", function(d) {
              return height - y(d[1]);
            })
            .attr('fill', "steelblue")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);

          //Create the text
          bars.append("text")
            .text(function(d) {
              return d3.format(",")(d[1])
            })
            .attr("x", function(d) {
              return x(d[0]) + x.bandwidth() / 2;
            })
            .attr("y", function(d) {
              return y(d[1]) - 5;
            })
            .attr("text-anchor", "middle");

          // add x and y axis labels 
          //x label positioning
          histogramsSVG.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", (width / 2) + margins.top + 10)
            .attr("y", height + margins.bottom)
            .attr("font-size", 15)
            .text("UK Countries");

          //y label positioning
          histogramsSVG.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -margins.left + 5)
            .attr("x", -margins.bottom - 60)
            .attr("dy", "1em")
            .attr("transform", "rotate(-90)")
            .text("No. of Vaccinations per Country");

          function mouseover(d, i) {

            // filter for selected state.
            //state to select the ukData for the country the mouse is over
            // using a filter of the countryData
            //https://stackoverflow.com/questions/51313811/d3-keys-syntax-clarification
            var state = countryData.filter(function(d) {
              return d.Country == i[0];
            })[0];

            //newData takes the keys from the totals variable inside ukData and remaps them to give them new 
            //variable names as it creates a new array of objects
            var newData = Object.keys(state.totals).map(function(s) {
              return {
                type: s,
                totals: state.totals[s]
              };
            });

            // call update functions of pie-chart and legend.    
            pC.update(newData);

            //if statements to check the country of the state variable
            //if the country matches call the drawLine function with the respective
            //country's line graph data
            if (state.Country == "Ireland") {
              drawCountry(filterIreland);
            }

            if (state.Country == "Scotland") {
              drawCountry(filterScotland);
            }

            if (state.Country == "England") {
              drawCountry(filterEngland);
            }

            if (state.Country == "Wales") {
              drawCountry(filterWales);
            }

          }

          function mouseout(d) {
            // reset the pie-chart and legend.    
            pC.update(totalValues);
            d3.select(".lineDCountry").transition().duration(500).style("opacity", 0).remove();
            d3.select(".ylabelDaily").transition().duration(500).style("opacity", 0).remove();
          }

          // create function to update the bars. This will be used by pie-chart.
          hG.update = function(newData, color) {

            //create variable bars to select all the bars in the histogram and bind it to the newData 
            var bars = histogramsSVG.selectAll(".bar").data(newData);

            // transition the height and color of rectangles with the newData and the colour
            // from the pieSectionColour
            bars.select("rect").transition().duration(500)
              .attr("y", function(d) {
                return y(d[1]);
              })
              .attr("height", function(d, i) {
                return height - y(d[1]);
              })
              .attr("fill", color);

            // transition the text and change the value to the values from the newData
            bars.select("text").transition().duration(500)
              .text(function(d) {
                return d3.format(",")(d[1])
              })
              .attr("y", function(d) {
                return y(d[1]) - 5;
              });
          }
          return hG;
        }

        // function to create the pie chart
        function pieChart(pieData) {
            //https://d3-graph-gallery.com/graph/pie_basic.html
          var pC = {}

          //pie chart dimensions
          var marginP = {
            width: 250,
            height: 250
          };

          //color variable to hold a range of colours
          var color = d3.scaleOrdinal().range(d3.schemeSet3);

          //calculate the radius to use for the pie chart outer radius
          marginP.radius = Math.min(marginP.width, marginP.height) / 2;

          // create svg for pie chart.
          var piesvg = d3.select("#dashboard").append("svg").attr("class", "histogramSVG")
            .attr("width", marginP.width).attr("height", marginP.height).append("g")
            .attr("transform", "translate(" + marginP.width / 2 + "," + marginP.height / 2 + ")")
            .attr("viewBox", `0 0 ` + width + ` ` +  height);

          // create function to draw the arcs of the pie slices.
          var arc = d3.arc().outerRadius(marginP.radius - 10).innerRadius(20);

          // create a function to compute the pie slice angles.
          //using the totals for the values of each angle 
          var pie = d3.pie().sort(null).value(function(d) {
            return d.totals
          })

          // Draw the pie slices.
          var pathPie = piesvg.selectAll("path").data(pie(pieData))

          //draw the pie chart slices in an enter section
          pathPie.enter()
            .append("path")
            .attr("class", "pieChartPath")
            .attr("d", arc)
            .each(function(d) {
              this.current = d;
            })
            .style("fill", function(d, i) {
              return pieSectionColour(d.data.type);
            })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);

          // create function to update pie-chart. This will be used by histogram.
          pC.update = function(newData) {

            //update the data bound to the piechart with the new data and change the angle of the arc
            // using the actTween function
            piesvg.selectAll("path").data(pie(newData)).transition().duration(500)
              .attrTween("d", arcTween);
          }

          //on mouseover the slice in the pie chart, update the bars of the histogram
          function mouseover(d, i) {
            // call the update function of histogram with new data.
            //and update the colours
            hG.update(countryData.map(function(d) {
                return [d.Country, d.totals[i.data.type]];
              }),
              pieSectionColour(i.data.type));

            if (i.data.type == "totalVacc") {
              drawMultipleCountry(totalVaccH)
            }

            if (i.data.type == "peopleFully") {
              drawMultipleCountry(peopleFullyVaccH)
            }

            if (i.data.type == "peopleVacc") {
              drawMultipleCountry(peopleVaccH)
            }

            if (i.data.type == "totalBoost") {
              drawMultipleCountry(totalBoostersH)
            }
          }

          //reset the bars of the histogram to before they were hovered over
          function mouseout(d) {
              
            // call the update function of histogram with all data.
            //use the hG.update function and pass in the mapped data of each country and value from ukData
            //and the colour steem blue
            hG.update(countryData.map(function(d) {
              return [d.Country, d.total];
            }), "steelblue");
          }
          // Animating the pie-slice requiring a custom function which specifies
          // how the intermediate paths should be drawn.
          //arcTween function same as the function used in lab 2 pie chart exercise
          function arcTween(a) {
            var i = d3.interpolate(this.current, a);
            this.current = i(0);
            return function(t) {
              return arc(i(t));
            };
          }
          return pC;
        }
        
       let dataTypes = ['totalVacc', 'peopleVacc', 'peopleFully', "totalBoost"];
          
        // calculate total values by segment for all Countries.
        var totalValues = dataTypes.map(function(d) {
          return {
            type: d,
            totals: d3.sum(countryData.map(function(t) {
              return t.totals[d];
            }))
          };
        });
        
        var graphData = [];
        
        for(var i = 0; i < countryData.length; i++){
        	graphData[i] = [countryData[i].Country, countryData[i].total]
        }
       

        //initiate the histogram with the total frequency for the types in totals variable
        //initiate the pie chart with the total values calculated
        //pie chart used to change the bar chart
        var hG = histoGram(graphData), pC = pieChart(totalValues)


        function drawMultipleCountry(lineCountryData) {
          //update the y domain
          yCountry.domain([0, d3.max(lineCountryData.map(function(d) {
            return +d.value1;
          }))]);

          //update the y axis
          yAxisLineCountry = svgCountry.select(".YaxisLineCountry").transition()
            .duration(1000)
            .call(d3.axisLeft(yCountry).ticks(10, "s"));

          // Add the line 
          var uCountryMultiple1 = svgCountry.append("path")
            .datum(lineCountryData)

          //draw the line and merge each of the data for each different line
          uCountryMultiple1.enter()
            .append("path")
            .merge(uCountryMultiple1)
            .transition()
            .duration(1000)
            .attr("fill", "none")
            .attr("class", "lineDCountryMultiple")
            .attr("stroke", "lightgreen")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
              .x(function(d) {
                //parse the date to a date object
                return xCountry(d3.timeParse("%Y-%m-%d")(d.date))
              })
              .y(function(d) {
                return yCountry(d.value1)
              })
            );

          // Add the line 
          var uCountryMultiple2 = svgCountry.append("path")
            .datum(lineCountryData)

          //draw the line and merge each of the data for each different line
          uCountryMultiple2.enter()
            .append("path")
            .merge(uCountryMultiple2)
            .transition()
            .duration(1000)
            .attr("fill", "none")
            .attr("class", "lineDCountryMultiple")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
              .x(function(d) {
                //parse the date to a date object
                return xCountry(d3.timeParse("%Y-%m-%d")(d.date))
              })
              .y(function(d) {
                return yCountry(d.value2)
              })
            );

          // Add the line 
          var uCountryMultiple3 = svgCountry.append("path")
            .datum(lineCountryData)

          //draw the line and merge each of the data for each different line
          uCountryMultiple3.enter()
            .append("path")
            .merge(uCountryMultiple3)
            .transition()
            .duration(1000)
            .attr("fill", "none")
            .attr("class", "lineDCountryMultiple")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
              .x(function(d) {
                //parse the date to a date object
                return xCountry(d3.timeParse("%Y-%m-%d")(d.date))
              })
              .y(function(d) {
                return yCountry(d.value3)
              })
            );

          // Add the line 
          var uCountryMultiple4 = svgCountry.append("path")
            .datum(lineCountryData)

          //draw the line and merge each of the data for each different line
          uCountryMultiple4.enter()
            .append("path")
            .merge(uCountryMultiple4)
            .transition()
            .duration(1000)
            .attr("fill", "none")
            .attr("class", "lineDCountryMultiple")
            .attr("stroke", "orange")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
              .x(function(d) {
                //parse the date to a date object
                return xCountry(d3.timeParse("%Y-%m-%d")(d.date))
              })
              .y(function(d) {
                return yCountry(d.value4)
              })
            );

          var countryNameData = ["Ireland", "Scotland", "England", "Wales"]

          //colour scale
          var color = d3.scaleOrdinal().domain(countryNameData)
            .range(["lightgreen", "red", "blue", "orange"]);

          //adding the legend to the graph to display which colour is which vaccine
          //creating the rect sizes
          var sizeLegend = 15
          svgCountry.selectAll("mydotsCountry")
            .data(countryNameData)
            .enter()
            .append("rect")
            .attr("class", "countryLegend")
            .attr("x", widthCountry - 410)
            .attr("y", function(d, i) {
              return i * (sizeLegend + 5)
            })
            .attr("width", sizeLegend)
            .attr("height", sizeLegend)
            .style("fill", function(d) {
              return color(d)
            })

          //adding the vaccine name to the side of the rects
          svgCountry.selectAll("mylabelsCountry")
            .data(countryNameData)
            .enter()
            .append("text")
            .attr("class", "countryLegendText")
            .attr("x", widthCountry - 410 + sizeLegend * 1.2)
            .attr("y", function(d, i) {
              return i * (sizeLegend + 5) + (sizeLegend / 2)
            })
            .style("font-size", "12px")
            .text(function(d) {
              return d
            })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")


          //y label positioning
          svgCountry.append("text")
            .attr("class", "ylabelCountry")
            .attr("text-anchor", "end")
            .attr("y", -marginCountry.left)
            .attr("x", -marginCountry.top + 50)
            .attr("dy", "1em")
            .style("font-size", 13)
            .attr("transform", "rotate(-90)")
            .text(lineCountryData[0].label);

        }

        //function to reset the line graph
        function resetLineGraph() {
          d3.selectAll(".lineDCountryMultiple").transition().duration(200).style("opacity", 0).remove();
          d3.selectAll(".countryLegend").transition().duration(200).style("opacity", 0).remove();
          d3.selectAll(".countryLegendText").transition().duration(200).style("opacity", 0).remove();
          d3.selectAll(".ylabelCountry").transition().duration(200).style("opacity", 0).remove();
          
        }
      }

      //call the dashboard function with the dataset created ukData
      dashboard(ukData);

    }).catch(function(err) {
      // handle error here

    })
