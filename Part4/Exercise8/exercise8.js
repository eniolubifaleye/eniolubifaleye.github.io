 var myData = ["a", 4, 1, "b", 6, 2, 8, 9, "z"];
      
var p = d3.select("body") 
    //modified selectAll to  select all span
    .selectAll("span") 
    .data(myData) 
    .enter()
    //modified append to append span elements
    .append("span")
    .text(function (d, i) { 
        return d; 
        })
        
    //added style() with a function like exercise 7 
    //alters the color of the element from d in the function if the 
    //type of the element is a number the color of the element is set to 
    //green else it is set to blue
    .style("color", function(d,i){
        if (typeof(d) === 'number'){
            return "green";
                } else{
            return "blue";
                }
        });