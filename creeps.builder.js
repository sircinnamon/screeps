let utils = require("creeps.utils")

module.exports = {
    run: (creep) => {
        let building = creep.memory.building
        if(building===undefined){
            creep.memory.building = false
        }
        if(building && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.building = false
        }
        if(!building && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.building = true;
        }
        if(!building){
            
            let src = utils.findSource(creep)
            if(creep.harvest(src) == ERR_NOT_IN_RANGE){
                creep.moveTo(src)
            }
        } else {
            let csite = utils.findConstructionSite(creep)
            let repairable = utils.findRepairable(creep.room)
            if(csite){
                utils.buildSite(creep, csite)
            } else if (repairable.length) {
                utils.repair(creep, repairable[0])
            } else {
                utils.storeEnergyInSpawn(creep)
            }
            
        }
    }
};