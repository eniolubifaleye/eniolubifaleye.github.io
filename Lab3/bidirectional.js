//https://jsfiddle.net/eniolubifaleye/me16wzgc/86/
  //http://bl.ocks.org/NPashaP/96447623ef4d342ee09b
  var ireland = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Ireland.csv";
  var scotland = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Scotland.csv";
  var england = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/England.csv";
  var wales = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/Wales.csv";

  //https://stackoverflow.com/questions/21842384/importing-data-from-multiple-csv-files-in-d3
  //promise all to take all the uk country data for vaccinations
  Promise.all([d3.csv(ireland), d3.csv(scotland), d3.csv(england), d3.csv(wales)])

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
      //id takes in the html elements id and fData is the data to be passed in
      function dashboard(id, countryData) {

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
        function histoGram(fD) {

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
          var histogramsSVG = d3.select(id).append("svg").attr("class", "histogramSVG")
            .attr("width", width + margins.left + margins.right)
            .attr("height", height + margins.top + margins.bottom).append("g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")")

          //create x scale
          var x = d3.scaleBand().domain(fD.map(function(d) {
              return d[0];
            }))
            .range([70, width])
            .padding([0.2])

          // Add x-axis to the histogram svg.
          var xAxis = histogramsSVG.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

          // Create y scale
          var y = d3.scaleLinear().range([height, 0]).domain([0, fD[2][1]]);

          // add y-axis to the histogram svg
          var yAxis = histogramsSVG.append("g")
            .attr("class", "myYaxis")
            .attr("transform", "translate(70,0)")
            .call(d3.axisLeft(y).ticks(10, "s"));

          //https://www.d3-graph-gallery.com/graph/histogram_basic.html
          // Create bars for histogram
          var bars = histogramsSVG.selectAll(".bar")
            .data(fD)
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
            .attr("x", -margins.bottom + 25)
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
            leg.update(newData);
          }

          function mouseout(d) {
            // reset the pie-chart and legend.    
            pC.update(totalValues);
            leg.update(totalValues);
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
          var piesvg = d3.select(id).append("svg").attr("class", "histogramSVG")
            .attr("width", marginP.width).attr("height", marginP.height).append("g")
            .attr("transform", "translate(" + marginP.width / 2 + "," + marginP.height / 2 + ")");

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

        // function to create the animated legend
        function legend(legendData) {
          var leg = {};

          //https://www.d3-graph-gallery.com/graph/custom_legend.html
          // create table for legend.
          var legend = d3.select(id).append("table").attr('class', 'legend');

          // create one row per segment.
          var tr = legend.append("tbody").selectAll("tr").data(legendData).enter().append("tr");

          // create the first column for each segment.
          tr.append("td").append("svg").attr("width", '16')
            .attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
            .attr("fill", function(d) {
              return pieSectionColour(d.type);
            });

          // create the second column for each segment.
          tr.append("td").text(function(d) {
            return d.type;
          });

          // create the third column for each segment.
          tr.append("td").attr("class", 'legendFreq')
            .text(function(d) {
              return d3.format(",")(d.totals);
            });

          // create the fourth column for each segment.
          tr.append("td").attr("class", 'legendPerc')
            .text(function(d) {
              return getLegend(d, legendData);
            });


          leg.update = function(newData) {
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(newData);

            // update the frequencies.
            l.select(".legendFreq").transition().duration(500).text(function(d) {
              return d3.format(",")(d.totals);
            });

            // update the percentage column.
            l.select(".legendPerc").transition().duration(500).text(function(d) {
              return getLegend(d, newData);
            });
          }

          function getLegend(d, aD) { // Utility function to compute percentage.
            return d3.format(".2%")(d.totals / d3.sum(aD.map(function(v) {
              return v.totals;
            })));
          }

          return leg;
        }

        // calculate total values by segment for all Countries.
        var totalValues = ['totalVacc', 'peopleVacc', 'peopleFully', "totalBoost"].map(function(d) {
          return {
            type: d,
            totals: d3.sum(countryData.map(function(t) {
              return t.totals[d];
            }))
          };
        });

        // calculate total frequency by state for all segments
        var sF = countryData.map(function(d) {
          return [d.Country, d.total];
        })

        //initiate the histogram with the total frequency for the types in totals variable
        //initiaate the pie chart and legend with the total values calculated
        //pie chart used to change the bar chart
        var hG = histoGram(sF),
          pC = pieChart(totalValues),
          leg = legend(totalValues);
      }

      //call the dashboard function with the div id #dashboard and the dataset we created ukData
      dashboard("#dashboard", ukData);

    }).catch(function(err) {
      // handle error here

    })
