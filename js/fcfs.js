let all_processes = sessionStorage.getItem("list_processes")
let obj = JSON.parse(all_processes).slice()
let pList = JSON.parse(all_processes).slice()
function back(){
    this.window.location = "../index.html"
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