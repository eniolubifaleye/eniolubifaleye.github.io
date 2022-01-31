let num = [10, 50, 100, 200]; 
 
let paragraph = d3.select("body") 
                .selectAll("div") 
                .data(num) 
                .text(function (d, i) { 
                    return 'cont:' + d; // return value is used to set the 'text' 
                }) 
                .style("color", function(d, i) { 
                //changed the if statement to check if the array element held in d
                //is between 50 and 100, if so set color to red, else the colour
                //it set to yellow
                    if ( d >= 50 && d <= 100) { 
                        return "red"; 
                    } else { 
                        return "yellow"; 
                    } 
                    return 'blue'; 
                }); 