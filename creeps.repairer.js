let utils = require("creeps.utils")

module.exports = {
    run: (creep) => {
        let working = creep.memory.working
        if(working===undefined){
            creep.memory.working = false
        }
        if(working && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.working = false
        }
        if(!working && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.working = true;
        }
        if(!working){
            let src = utils.findSource(creep)
            if(creep.harvest(src) == ERR_NOT_IN_RANGE){
                creep.moveTo(src)
            }
        } else {
            let repairable = utils.findRepairable(creep.room)
            if(repairable.length){
                utils.repair(creep, repairable[0])
            } else {
                utils.storeEnergyInSpawn(creep)
            }
            
        }
    }
};