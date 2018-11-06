let processes = sessionStorage.getItem("prio_processes")
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
    card.innerHTML = "P" + card.id +  "&nbsp&nbspArrival time: " + obj[p].arrival_time + "<br>Priority: " 
                    + obj[p].priority + "&nbsp&nbspBurst time: " + obj[p].burst_time 
    process_list_container.appendChild(card)
}

function max_priority(list){
    if (list.length <= 0){
        return -1
    }
    let max = 0
    for(let i = 0; i < list.length; i++){ 
        if(list[i].priority < list[max].priority){
            max = i
        } else if (list[i].priority == list[max].priority){
            if(list[i].id < list[max].id){
                max = i
            } 
        }
    }
    return max
}

let prio_list = pList.slice()
let schedule = []
let tt = 0
let current_process = []
function preemptive_prio(){
    let previous = prio_list.filter(p => p.arrival_time == tt)
    current_process = current_process.concat(previous)
    prio_list = prio_list.filter(e => !current_process.includes(e))
    if(prio_list.length == 0 && current_process.length == 0){
        clearInterval(x)
        waiting_time_scheduler()
        return
    } 
    let max = max_priority(current_process)
    // console.log(current_process)
    if(max >= 0){
        let current = current_process[max]
        console.log("maximum element: " + current.id + " burst time: " + current.burst_time + " prio: " + current.priority)
        current.burst_time -= 1
        if(schedule.length <= 0 || schedule[schedule.length - 1].id != current.id){
            current.start_time = tt
            current.turn_time = tt
            schedule.push(Object.assign({},current))
        }
        schedule[schedule.length - 1].turn_time += 1
        if(current.burst_time == 0){
            current_process.splice(max, 1)
        }
    } else {
        if(schedule.length <= 0 || schedule[schedule.length - 1].id != "IDLE"){
            let idle_obj = JSON.parse(JSON.stringify(new PRIO_process("IDLE", 0,0,0)))
            schedule.push(idle_obj)
        }
        schedule[schedule.length - 1].turn_time += 1
    }
    tt += 1
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
    preemptive_prio()
},10)
