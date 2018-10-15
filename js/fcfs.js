let all_processes = sessionStorage.getItem("list_processes")
let obj = JSON.parse(all_processes).slice()
let pList = JSON.parse(all_processes).slice()
function back(){
    this.window.location = "../"
}

console.log(obj)
let process_list_container = document.getElementById("plist-parent")
for(let p = 0; p < obj.length;p++){
    let card = document.createElement("div")
    card.className = "process-list-card"
    card.id = obj[p].id
    card.innerHTML = "P" + card.id + "&nbsp&nbspBurst time: " + obj[p].burst_time + "&nbsp&nbspArrival time: " + obj[p].arrival_time
    process_list_container.appendChild(card)
}

// Array.prototype.shuffle = function() {
//     let input = this
//     for (let i = input.length-1; i >=0; i--) {
//         let randomIndex = Math.floor(Math.random()*(i+1))
//         let itemAtIndex = input[randomIndex]
//         input[randomIndex] = input[i]
//         input[i] = itemAtIndex
//     }
//     return input
// }
// pList.shuffle()
// console.log(pList)

//gant chart variables here

// function scheduler(){
//     let last_node = document.createElement("div")
   
//     // let tick = setInterval(function(){
       
//     let box_label =  "<div id='box-label'>P" + pList[pi].id + "</div>"
//     if(pi == 0){ // if(pi % 4 == 0){
//         let first_node = document.createElement("div")
//         first_node.className = "concave-box"
//         first_node.id = "first-element"
//         let tick = setInterval(function(){
//             update(wt,tt,first_node,box_label)
//             if(tt == 3){
//                 tick = null;
//                 clearInterval(tick)
//             }
//             tt += 1;
//             process_container.appendChild(first_node)
//         },1000)    
//         console.log("first")   
//         setTimeout(function(){
//             console.log("Sdasd")
//         },10000) 
//     }else{
        
//             let inner = document.createElement("div")
//             let node = document.createElement("div")
//             node.className = "convex-box"
//             inner.className = "concave-box"
//             inner.style = "background:rgb(85, 187, 76);"
//             let x = tt; 
            
//             let tick2 = setInterval(function(){
//                 update(wt,x,inner,box_label)
//                 if(x == 20){
//                     return;
//                     clearInterval(tick2)
//                 }
//                 x += 1;
//                 console.log(tt) 
//                 node.appendChild(inner)
//                 ticking = true;
//                 process_container.appendChild(node)
        
//             },1000)    
//             console.log("nodes")
            
        
           
//     }
//     gantt_chart_parent.appendChild(process_container)
//     pi += 1



// }
let pi = 0
let gantt_chart_parent = document.getElementById("gantt-chart-container")
let wt = 0
let tt = 0
let process_container = document.createElement("div")
process_container.className = "box-container"
let first_node = document.createElement("div")

function scheduler(pi){
    let box_label =  "<div id='box-label'>P" + pList[pi].id + "</div>"
    let node = document.createElement("div")
    let inner = document.createElement("div")
    if(pi == 0){
        first_node.className = "concave-box"
        first_node.id = "first-element"
        let label = "<div id='time-container'>" + wt + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + tt + "</div>"
        
        if(tt != 3){
            tt += 1;
        }
        
        first_node.innerHTML = box_label + label
        process_container.appendChild(first_node)
        console.log("first")
    }
    if(pi > 0){
        node.className = "convex-box"
        inner.className = "concave-box"
        let x = tt;
        if(tt != 7){
            tt += 1
        }
        let label = "<div id='time-container'>" + wt + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + tt + "</div>"
        inner.style = "background:rgb(85, 187, 76);"
        inner.innerHTML = box_label + label
        
        node.appendChild(inner)
        process_container.appendChild(node)
        console.log("nodes")
    }
    gantt_chart_parent.appendChild(process_container)    
    
}
setInterval(function(){
    scheduler(1)
    // scheduler(1)
},1000)
      

//main
// while(pi != pList.length - 1){
//     scheduler()
// }
