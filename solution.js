{
    init: function(elevators, floors) {
            let floorsPressed = {
                        up: [],
                        down: [],
                    }
    
            floors.forEach( floor => {
                        floor.on("up_button_pressed", function() {
                                        floorsPressed.up.push(floor.floorNum());
                                    })
                        floor.on("down_button_pressed", function() {
                                        floorsPressed.down.push(floor.floorNum());
                                    })
                    })
    
    
            elevators.forEach( elevator => {
            
                        elevator.on("stopped_at_floor", function(floorNum) {
                                        elevator.checkDestinationQueue();                     
                                    })
            
                        elevator.on("idle", () => {
                                        console.log("idle")
                                        if(elevator.getPressedFloors().length > 0) {
                                                            elevator.checkDestinationQueue();                     
                                                        }
                        
                                        if(elevator.destinationQueue.length === 0){
                                                            elevator.destinationQueue = floorsPressed.up || floorsPressed.down;
                                                            elevator.checkDestinationQueue();                     
                                                        }
                                    });
                        elevator.on("passing_floor", function(floorNum, direction) {
                                        if(floorsPressed[direction].indexOf(floorNum) >= 0){
                                                            elevator.goToFloor(floorNum, true)
                                                        }
                                    });
            
                        elevator.on("stopped_at_floor", function(floorNum) {
                                        ['up', 'down'].forEach( direction => {
                                                            let index = floorsPressed[direction].indexOf(floorNum);
                                                            if (index > -1) {
                                                                                    floorsPressed[direction].splice(index, 1);
                                                                                }
                                                        })
                                    })
            
                        elevator.on("floor_button_pressed", function(floorNum) {
                                        elevator.destinationQueue.push(floorNum);            
                                        elevator.destinationQueue.sort();
                                        elevator.checkDestinationQueue();
                                    })
                    })
    
        },
        update: function(dt, elevators, floors) {
                    // We normally don't need to do anything here
                    //         }
                    //         }}}
