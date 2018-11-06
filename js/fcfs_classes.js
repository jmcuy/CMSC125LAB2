function Process(id,b,p){
    this.id = id
    this.burst_time = b
    this.priority = p
    this.waiting_time = 0
    this.turn_time = this.burst_time + this.waiting_time
    this.getId = function(i){
        this.id = i
    }
   
    this.setBurstTime = function(t){
        this.burst_time = t
    }
    this.setPriority = function(p){
        this.priority = p
    }
    this.getBurstTime = function(){
        return this.burst_time 
    }
    this.getPriority = function(){
        return this.priority 
    }
}