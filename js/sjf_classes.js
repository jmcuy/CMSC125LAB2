function SJF_process(id,a,b){
    this.id = id
    this.arrival_time = a
    this.burst_time = b
    this.waiting_time = 0
    this.start_time = 0
    this.turn_time = 0
    this.getId = function(i){
        this.id = i
    }
    this.setArrivalTime = function(t){
        this.arrival_time = t
    }
    this.setBurstTime = function(t){
        this.burst_time = t
    }
    this.getArrivalTime = function(){
        return this.arrival_time
    }
    this.getBurstTime = function(){
        return this.burst_time 
    }
}