function rand(n,i){
    return Math.floor(Math.random() * n) + i
}

let num_processes = rand(5,1)
let q_time = rand(50,1) 
let all_processes = []


for(let i = 1; i <= num_processes;i++){
    all_processes.push(new Process(i,rand(11, 0),rand(10,1),rand(10,1)))
}

//main
console.log(num_processes)
console.log(q_time)
console.log(all_processes)

let fcfs = document.getElementById("fcfs")
let p = document.getElementById("prio")
let job = document.getElementById("sjf")
let rr = document.getElementById("rr")

let schedule_button_group = [fcfs,p,job,rr]

let index = 0;
function toggle_button(n){
    schedule_button_group[n].style = "background:#dd6300;"
    let copy = schedule_button_group.slice()
    copy.splice(n,1)
    for(let i = 0; i < copy.length;i++){
       copy[i].style = "background:#0dbd33;"
    }
    index = n;
}

function _fcfs(){    
    toggle_button(0)
}
function _shortest_job(){
    toggle_button(2)
}
function _prio(){
    toggle_button(1)
}
function _rr(){
    toggle_button(3)
}
function ready(){
    sessionStorage.setItem('list_processes',JSON.stringify(all_processes))
    this.window.location = "../CMSC125LAB2/html/" + schedule_button_group[index].id + ".html" 
}
this.window.onload = function (){
    sessionStorage.clear()
}