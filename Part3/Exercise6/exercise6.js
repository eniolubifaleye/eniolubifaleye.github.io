let nums = [10, 50, 200]; 

//in otherdata array of objects, add new variable color and set each eleent to red green and blue
let otherdata = [ {name:'test',  val:1, color: 'red'},  
                  {name:'other', val:2, color: 'green'}, 
                  {name:'b',     val:3, color: 'blue'},
                  
         ];
                  
let paragraph = d3.select("body") 
                .selectAll("div") 
                .data(otherdata) 
                .text(function (d, i) { 
                    console.log("d.name: " + d.name); 
                    console.log("d.val:  " + d.val);
                    console.log("d.color: " + d.color)
                    console.log("i: " + i); 
                    console.log("this: " + this); 
										
                   // return value is used to set the 'text' and the name, the value and the color
                    return 'cont: ' + d.name + " , " + "val: " +  d.val + " , " + "color: " + d.color;  
                })
                
                //set the color of the text of each object "each line displayed" to be the color set
                //in the object
                .style("color", function(d,i) {return d.color}); 