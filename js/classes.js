function Process(id,a,b,p){
    this.id = id
    this.arrival_time = a
    this.burst_time = b
    this.priority = p
    this.getId = function(i){
        this.id = i
    }
    this.setArrivalTime = function(t){
        this.arrival_time = t
    }
    this.setBurstTime = function(t){
        this.burst_time = t
    }
    this.setPriority = function(p){
        this.priority = p
    }
    this.getArrivalTime = function(){
        return this.arrival_time
    }
    this.getBurstTime = function(){
        return this.burst_time 
    }
    this.getPriority = function(){
        return this.priority 
    }
}