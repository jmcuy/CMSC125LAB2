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

function update(wt,tt,parent,box_label){
    let label = "<div id='time-container'>" + wt + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + tt + "</div>"
    parent.innerHTML = box_label + label
}
//gant chart variables here
let pi = 0
let gantt_chart_parent = document.getElementById("gantt-chart-container")
let tt = 0
let process_container = document.createElement("div")
process_container.className = "box-container"
let first_node = document.createElement("div")
let last_node = document.createElement("div")



function scheduler(){
    let wt = 0
    let box_label =  "<div id='box-label'>P" + pList[pi].id + "</div>"   
    if(pi == 0){
        first_node.className = "concave-box"
        first_node.id = "first-element"
        if(pList[pi].burst_time != tt){
            tt += 1;
            let label = "<div id='time-container'>" + wt + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + tt + "</div>"
            first_node.innerHTML = box_label + label
            process_container.appendChild(first_node) 
        } else {
            pi += 1
        }
    }
    else if(pi > 0 && pi < pList.length - 1){
        console.log("nodes")
        console.log("current turn  " + pList[pi].turn_time)
        let node = document.createElement("div")
        console.log(tt)
        wt = pList[pi - 1].turn_time
        if(wt + pList[pi].burst_time != tt){
            let inner = document.createElement("div")
            node.className = "convex-box"
            inner.className = "concave-box"
            tt += 1
            let label = "<div id='time-container'>" + wt + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + tt + "</div>"
            inner.style = "background:rgb(85, 187, 76);"
            inner.innerHTML = box_label + label 
            node.appendChild(inner)
            process_container.appendChild(node)     
        } else {
            pi += 1
        }
    } 
    else { 
        console.log("last" + box_label)
        last_node.className = "convex-box"
        console.log(tt)
        wt = pList[pi - 1].turn_time
        console.log("bursttime  " + pList[pi].burst_time + "id:  " + pList[pi].id)
        if(pList[pi].burst_time + wt != tt){
            tt += 1;
            let label = "<div id='time-container'>" + wt + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + tt + "</div>"
            last_node.innerHTML = box_label + label
            process_container.appendChild(last_node) 
        } else {
            pi += 1
        }
    }
    
    gantt_chart_parent.appendChild(process_container)    
    if(pi == pList.length){
        clearInterval(tick)
    } 
    pList[pi].turn_time = tt;
    pList[pi].waiting_time = wt;

   
}
//main
var tick = setInterval(function(){
    scheduler(tick)
},500)






