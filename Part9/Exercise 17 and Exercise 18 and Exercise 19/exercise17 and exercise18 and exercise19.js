//the same data values as the const data array
let barData = "https://raw.githubusercontent.com/eniolubifaleye/F21DV/main/Exercise18File.csv"
//const data = [50, 400, 300, 900, 250, 1000]


//put the whole bar chart into a function called barChart
function barChart(chartData){
    d3.csv(barData, function(data) { 

        //return the data loaded in by csv callback function
        return data;

    // then() used to return a promise of csv callback function
    // so that data can be loaded before any updates to data and variables, arrays are made 
    }).then(function(d){

        const width     = 500; 
        const barHeight = 20; 
        const margin    = 1; 

        //create array to hold data so that it can be changed from string to integer
        //after being parsed in
        let dataValues = [];

        //for loop to send data from csv into array dataValues 
        //+ used to change data from string into integer
        for(var i = 0; i < d.length; i++){
            dataValues.push(+d[i].value);
        }

        //edit data to dataValues
        var scale = d3.scaleLinear() 
               .domain([d3.min(dataValues), d3.max(dataValues)]) 
               .range([50, 500]); 

        var svg = d3.select("body") 
                .append("svg") 
                .attr("width", width) 
                .attr("height", barHeight * dataValues.length); 

        var g = svg.selectAll("g") 
                .data(dataValues) 
                .enter() 
                .append("g") 
                .attr("transform", function (d, i) { 
                  return "translate(0," + i * barHeight + ")"; 
                }); 

        g.append("rect") 
           .attr("width", function (d) { 
             return scale(d); 
           }) 
           //.attr('fill', 'blue') 
           //modify the bar colours to change based on the value each bar holds 
           //if above 500 set the bar colour to red else green
           .attr("fill", function(d,i){
              if(d > 500){
                return "red";
              }else{
                return "green"; 
              }
           })
           .attr("height", barHeight - margin) 

        g.append("text") 
           .attr("x", function (d) { return (scale(d)); }) 
           .attr("y", barHeight / 2) 
           .attr("dy", ".35em") 
           .style('text-anchor', 'end') 
           .text(function (d) { return d; });
    });

};

//Called the function twice 2 produce a duplicate of the same bar chart
barChart(barData);
barChart(barData);