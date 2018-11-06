let obj = JSON.parse(JSON.stringify(all_processes.slice()))
let pList =JSON.parse(JSON.stringify(all_processes.slice()))
function back(){
    this.window.location = "../"
}

console.log(obj)
let process_list_container = document.getElementById("plist-parent")
for(let p = 0; p < obj.length;p++){
    let card = document.createElement("div")
    card.className = "process-list-card"
    card.id = obj[p].id
    card.innerHTML = "P" + card.id + "&nbsp&nbspBurst time: " + obj[p].burst_time 
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
let tt = 0
let gantt_chart_parent = document.getElementById("gantt-chart-container")
let process_container = document.createElement("div")
process_container.className = "box-container"
let first_node = document.createElement("div")
let last_node = document.createElement("div")
let popup_content = document.getElementById("popup-content")

function schedule(){
    let waiting_time = 0;
    for(let i =0; i < pList.length;i++){
        pList[i].waiting_time = waiting_time;
        waiting_time += pList[i].turn_time
        
    }
}
function schedule(){
    let waiting_time = 0;
    for(let i =0; i < pList.length;i++){
        pList[i].waiting_time = waiting_time;
        waiting_time += pList[i].burst_time;
    }
    console.log(pList)
    //waiting time
    popup_content.innerHTML = "" 
    let sum = 0
    for(let i = 0; i < pList.length;i++){
        popup_content.innerHTML += "<br><div class='popup-elements'>" + "P" + pList[i].id + " = " + pList[i].waiting_time + "<div>"
        sum += pList[i].waiting_time
    }
    popup_content.innerHTML += "<div class='popup-elements'" 
    + "style='position:fixed;background:white;top:510px;text-align:right;"
    +  "max-width: 600px;min-width: 690px;'>"
    + "Average Waiting Time = " + (sum/pList.length).toFixed(2) +"</div"

}
function scheduler(){
    let wt = 0
    let box_label =  "<div id='box-label'>P" + pList[pi].id + "</div>"   
    let curr_node = document.getElementById("curr")
    let next_node = document.getElementById("next")
    curr_node.innerHTML = "P" + pList[pi].id + " Time: " + pList[pi].turn_time 
    if(pi == 0){
        first_node.className = "concave-box"
        first_node.id = "first-element"
        if(pList[pi].burst_time != tt){
            tt += 1;
            let label = "<div id='time-container'>"+ wt + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + tt + "</div>"
            first_node.innerHTML = box_label + label
            process_container.appendChild(first_node) 
        } else {
          
            pi += 1
            
        }
    }
    else if(pi > 0 && pi < pList.length - 1){
        console.log("nodes")
        console.log( pList[pi].id)
        wt = pList[pi - 1].turn_time
        if(wt + pList[pi].burst_time != tt){
            try{
                let current_node = document.getElementById("node" + pList[pi].id)
                let inner = current_node.firstChild
                console.log(inner.innerHTML)
                tt += 1
                let label = "<div id='time-container'>" + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + tt + "</div>"
                inner.innerHTML = box_label + label 
                process_container.appendChild(current_node) 
            } catch (e){
                let node = document.createElement("div")
                node.id = "node" + pList[pi].id
                node.className = "convex-box"
                let inner = document.createElement("div")
                inner.className = "concave-box"
                inner.style = "background:rgb(85, 187, 76);"
                node.appendChild(inner)
                process_container.appendChild(node)
            } 
            
        } else {
            pi += 1
        }

    } else {
        last_node.className = "convex-box"
        last_node.id = "last-element"
        wt = pList[pi - 1].turn_time
        if(pList[pi].burst_time + wt != tt){
            tt += 1;
            let label = "<div id='time-container'>"  + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + tt + "</div>"
            last_node.innerHTML = box_label + label
            process_container.appendChild(last_node) 
        } else {
            clearInterval(tick)
            next_node.innerHTML = "done"
        }
    }
    if(pList.length >= 1 && pi < pList.length - 1){
        next_node.innerHTML = "P" +  pList[pi + 1].id
    }
    
    gantt_chart_parent.appendChild(process_container)    
    pList[pi].waiting_time = wt; 
    pList[pi].turn_time = tt;
   
    // popup_content.innerHTML += "P" + pList[pi].id + " waiting time: " + pList[pi].waiting_time + "<br>"
}


//main
setTimeout(function(){
    schedule()
},3000)
var tick = setInterval(function(){
    scheduler(tick)
},1000)






