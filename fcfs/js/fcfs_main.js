function rand(n,i){
    return Math.floor(Math.random() * n) + i
}

let num_processes = rand(10,1)
// let q_time = rand(50,1) 
let all_processes = []


for(let i = 1; i <= num_processes;i++){
    all_processes.push(new Process(i,rand(11, 0),rand(10,1)))
}   

//main
console.log(num_processes)
console.log(all_processes)
