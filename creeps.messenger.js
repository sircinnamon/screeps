// let utils = require("creeps.utils")

module.exports = {
    run: (creep) => {
        let roomPos = new RoomPosition(1, 33, "W36N33")
        if(!creep.pos.isEqualTo(roomPos)){ creep.moveTo(roomPos) }
        else { creep.say("Jim ILY", true) }
    }
};