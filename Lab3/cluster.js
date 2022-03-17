//add totalDeaths dataset
  var totalDeaths = "https://raw.githubusercontent.com/eniolubifaleye/eniolubifaleye.github.io/main/Data/total_deaths.csv";

  d3.csv(totalDeaths, function(newData) {

    return newData;
  }).then(function(d) {
		
    
    //take the last entry from the dataset which has all the total deaths for each country
    var totalDeathsCluster = d[d.length - 1];
		//take 2 of the lowest income countries from each continent
    //take 2 of the highest income countries from each continent
    var Afghanistan = +totalDeathsCluster.Afghanistan;
    var Yemen = +totalDeathsCluster.Yemen;

    var China = +totalDeathsCluster.China;
    var India = +totalDeathsCluster.India;

    var Burundi = +totalDeathsCluster.Burundi;
    var Somalia = +totalDeathsCluster.Somalia;

    var Nigeria = +totalDeathsCluster.Nigeria;
    var Egypt = +totalDeathsCluster.Egypt;

    var Haiti = +totalDeathsCluster.Haiti;
    var Nicaragua = +totalDeathsCluster.Nicaragua;

    var UnitedStates = +totalDeathsCluster["United States"];
    var Canada = +totalDeathsCluster.Canada;

    var Montserrat = +totalDeathsCluster.Montserrat;
    var Anguilla = +totalDeathsCluster.Anguilla;

    var Chile = +totalDeathsCluster.Chile;
    var Guyana = +totalDeathsCluster.Guyana;

    var Ukraine = +totalDeathsCluster.Ukraine;
    var Georgia = +totalDeathsCluster.Georgia;

    var UnitedKingdom = +totalDeathsCluster["United Kingdom"];
    var Germany = +totalDeathsCluster.Germany;

    var SolomonIslands = +totalDeathsCluster["Solomon Islands"]
    var Kiribati = +totalDeathsCluster.Kiribati;

    var Australia = +totalDeathsCluster.Australia;
    var NewZealand = +totalDeathsCluster["New Zealand"]

		//manually create a json type dataset
    //tried to use group, rollup on the dataset
    //crashes or doesnt produce a correct dataset shape
    var dataCluster = {
      "name": "World",
      "children": [{ //Asia
          "name": "Asia",
          "children": [{
              "name": "High",
              "children": [{
                  "name": "China",
                  "value": China
                },
                {
                  "name": "India",
                  "value": India
                }
              ]
            },
            {
              "name": "Low",
              "children": [{
                  "name": "Afghanistan",
                  "value": Afghanistan
                },
                {
                  "name": "Yemen",
                  "value": Yemen
                }
              ]
            }
          ]
        },
        { //Africa
          "name": "Africa",
          "children": [{
              "name": "High",
              "children": [{
                  "name": "Nigeria",
                  "value": Nigeria
                },
                {
                  "name": "Egypt",
                  "value": Egypt
                }
              ]
            },
            {
              "name": "Low",
              "children": [{
                  "name": "Burundi",
                  "value": Burundi
                },
                {
                  "name": "Somalia",
                  "value": Somalia
                }
              ]
            }
          ]
        },
        { //North America
          "name": "North America",
          "children": [{
              "name": "High",
              "children": [{
                  "name": "United States",
                  "value": UnitedStates
                },
                {
                  "name": "Canada",
                  "value": Canada
                }
              ]
            },
            {
              "name": "Low",
              "children": [{
                  "name": "Haiti",
                  "value": Haiti
                },
                {
                  "name": "Nicaragua",
                  "value": Nicaragua
                }
              ]
            }
          ]
        },
        { //South America
          "name": "South America",
          "children": [{
              "name": "High",
              "children": [{
                  "name": "Chile",
                  "value": Chile
                },
                {
                  "name": "Guyana",
                  "value": Guyana
                }
              ]
            },
            {
              "name": "Low",
              "children": [{
                  "name": "Monsterrat",
                  "value": Montserrat
                },
                {
                  "name": "Anguilla",
                  "value": Anguilla
                }
              ]
            }
          ]
        },
        { //Europe
          "name": "Europe",
          "children": [{
              "name": "High",
              "children": [{
                  "name": "United Kingdom",
                  "value": UnitedKingdom
                },
                {
                  "name": "Germany",
                  "value": Germany
                }
              ]
            },
            {
              "name": "Low",
              "children": [{
                  "name": "Ukraine",
                  "value": Ukraine
                },
                {
                  "name": "Georgia",
                  "value": Georgia
                }
              ]
            }
          ]
        },
        { //Oceania
          "name": "Oceania",
          "children": [{
              "name": "High",
              "children": [{
                  "name": "New Zealand",
                  "value": NewZealand
                },
                {
                  "name": "Australia",
                  "value": Australia
                }
              ]
            },
            {
              "name": "Low",
              "children": [{
                  "name": "Solomon Islands",
                  "value": SolomonIslands
                },
                {
                  "name": "Kiribati",
                  "value": Kiribati
                }
              ]
            }
          ]
        }
      ]
    }
		
    //https://bl.ocks.org/mbostock/2966094
		//create a tree layout of cluster using
    var clusterLayout = d3.cluster()
    	//width and height of the tree
      .size([1500, 300])
      //https://d3-wiki.readthedocs.io/zh_CN/master/Tree-Layout/#separation
      //used seperation to increase the distance between leaf nodes to reduce the overlap
      //between them
      .separation(function(a, b) {
        return a.parent === b.parent ? 1 : 1.3;
      });
      			
    //create nested data structure and cluster the nested data structure
    var root = d3.hierarchy(dataCluster)
    clusterLayout(root)
		
     //https://www.d3indepth.com/hierarchies/
    // Nodes circles
    d3.select('.cluster g.nodes')
      .selectAll('circle.node')
      .data(root.descendants())
      .join('circle')
      .classed('node', true)
      .attr('cx', function(d) {
        return d.x;
      })
      .attr('cy', function(d) {
        return d.y;
      })
      .attr('r', 4);

    // Links connecting the nodes
    d3.select('.cluster g.links')
      .selectAll('line.link')
      .data(root.links())
      .join('line')
      .classed('link', true)
      .attr('x1', function(d) {
        return d.source.x;
      })
      .attr('y1', function(d) {
        return d.source.y;
      })
      .attr('x2', function(d) {
        return d.target.x;
      })
      .attr('y2', function(d) {
        return d.target.y;
      });

    // Labels for the nodes using the root.descendants() data
    // which will holds each children of the clusters data
    d3.select('.cluster g')
      .selectAll('text.label')
      .data(root.descendants())
      .join('text')
      .classed('label', true)
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y - 10;
      })
      // return each nodes name
      .text(function(d) {
        return d.data.name;
      });


    // Leaf total_deaths labels
    d3.select('.cluster g')
      .selectAll('text.count-label')
      .data(root.descendants())
      .join('text')
      .classed('count-label', true)
      .attr('x', function(d) {
        return d.x;
      })
      .attr('y', function(d) {
        return d.y + 20;
      })
      // return the value of the leaf nodes name
      .text(function(d) {
        if (d.height > 0) return '';
        return d.data.value;
      });
  });