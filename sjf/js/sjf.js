let processes = sessionStorage.getItem("sjf_processes")
let obj = JSON.parse(processes)
let pList = JSON.parse(processes)
// let pList =JSON.parse(JSON.stringify(all_processes.slice()))
if(obj == null){
    let body = document.getElementById("plist-parent")
    let gantt_chart = document.getElementById("gantt-chart-container")
    body.innerHTML = "Nothing to display yet"
    gantt_chart.innerHTML = "press GENERATE to view elements"
 }else{
     console.log(obj)
 }

function back(){
    sessionStorage.clear()
    this.window.location = "../"
}

let process_list_container = document.getElementById("plist-parent")
for(let p = 0; p < obj.length;p++){
    let card = document.createElement("div")
    card.className = "process-list-card"
    card.id = obj[p].id
    card.innerHTML = "P" + card.id + "&nbsp&nbspBurst time: " + obj[p].burst_time + "&nbsp&nbspArrival time: " + obj[p].arrival_time
    process_list_container.appendChild(card)
}

function min_element(list){
    if (list.length <= 0){
        return -1
    }
    let min = 0
    for(let i = 0; i < list.length; i++){ 
        if(list[i].burst_time < list[min].burst_time){
            min = i
        } else if (list[i].burst_time == list[min].burst_time){
            if(list[i].id < list[min].id){
                min = i
            } 
        }
    }
    return min
}
let newlist = pList.slice()
let schedule = []
let tt = 0
let recieved = []
function preemptive_sjf(){
    let previous = newlist.filter(p => p.arrival_time == tt)
    recieved = recieved.concat(previous)   
    newlist = newlist.filter(e => !recieved.includes(e))
    if(newlist.length == 0 && recieved.length == 0){
        clearInterval(x)
        waiting_time_scheduler()
        return
    } 
    let min = min_element(recieved)
    if(min >= 0 ){
        let current = recieved[min]
        console.log("minimum element: " + current.id + " burst time: " + current.burst_time)
        current.burst_time -= 1
        if(schedule.length <= 0 || schedule[schedule.length - 1].id != current.id){
            current.start_time = tt
            current.turn_time = tt
            schedule.push(Object.assign({},current))
        }
        schedule[schedule.length - 1].turn_time += 1
        if(current.burst_time == 0){
            recieved.splice(min,1)
        }
    } else {
        if(schedule.length <= 0 || schedule[schedule.length - 1].id != "IDLE"){
            let idle_obj = JSON.parse(JSON.stringify(new SJF_process("IDLE", 0,0)))
            schedule.push(idle_obj)
        }
        schedule[schedule.length - 1].turn_time += 1
    }
    tt+= 1
    console.log(schedule)
}
 
function waiting_time_scheduler(){
    let prev = []
    for(let i = 0; i < obj.length;i++){
        prev = schedule.filter( p => p.id == obj[i].id)
        let sum = 0
        for(let j = 0;j < prev.length - 1; j++){
            sum += (prev[j].turn_time - prev[j].start_time)
        }
        let current = prev[prev.length - 1]
        obj[i].waiting_time = current.start_time - sum - current.arrival_time
    }
    
}

  
var x = setInterval(function(){
    preemptive_sjf()
},10)


