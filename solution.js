{
    init: function(elevators, floors) {
        var elevator1 = elevators[0]; // Let's use the first elevator
        var elevator2 = elevators[1]; // Let's use the first elevator

        for (var i = 0; i < elevators.length; i++) {
            elevators[i].on("idle", function() {
                elevators[i].on("floor_button_pressed", function(floorNum) {
                    elevators[i].goToFloor(floorNum);
                })
            });
            elevators[i].on("floor_button_pressed", function(floorNum) {
                elevators[i].goToFloor(floorNum);
            })
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
