let nums = [10, 50, 200]; 

let otherdata = [ {name:'test',  val:1},  
                  {name:'other', val:2}, 
                  {name:'b',     val:3},
                  
                  //in other array of objects, add new object with name color and val 4
                  {name:'color', val:4}];
                  
let paragraph = d3.select("body") 
                .selectAll("div") 
                .data(otherdata) 
                .text(function (d, i) { 
                    console.log("d.name: " + d.name); 
                    console.log("d.val:  " + d.val); 
                    console.log("i: " + i); 
                    console.log("this: " + this); 
										
                    // return value is used to set the 'text' and the name
                    return 'cont:' + d.name + " , " + "val:" +  d.val;  
                }); 