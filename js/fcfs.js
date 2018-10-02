let all_processes = sessionStorage.getItem("list_processes")
let obj = JSON.parse(all_processes).slice()
let pList = JSON.parse(all_processes).slice()
function back(){
    this.window.location = "../"
}

console.log(obj)
for(let p = 0; p < obj.length;p++){
    pList[p].burst_time = 0
}

Array.prototype.shuffle = function() {
    let input = this;    
    for (let i = input.length-1; i >=0; i--) {
        let randomIndex = Math.floor(Math.random()*(i+1)); 
        let itemAtIndex = input[randomIndex]; 
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}
pList.shuffle()
console.log(pList)
