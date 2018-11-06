function rand(n,i){
    return Math.floor(Math.random() * n) + i
}

let num_processes = rand(10,1)
let all_processes = []


for(let i = 1; i <= num_processes;i++){
    all_processes.push(new SJF_process(i,rand(11, 0),rand(10,1)))
}   

let count = 0
function ready(){
    sessionStorage.setItem('sjf_processes',JSON.stringify(all_processes))
    location.reload()
    if(count > 0){
        sessionStorage.clear()
        count = 0
    }
    count += 1
   
    
}

//main
console.log(num_processes)
console.log(all_processes)


