/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creeps.harvester');
 * mod.thing == 'a thing'; // true
 */
let utils = require("creeps.utils")

module.exports = {
    run: (creep) => {
        let upgrading = creep.memory.upgrading
        if(upgrading===undefined){
            creep.memory.upgrading = false
        }
        if(upgrading && creep.store[RESOURCE_ENERGY] == 0){
            creep.say("Gathering")
            creep.memory.upgrading = false
        }
        if(!upgrading && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.say(creep.store.getFreeCapacity(RESOURCE_ENERGY))
            creep.memory.upgrading = true;
        }
        if(!upgrading){
            
            let src = utils.findSource(creep)
            if(creep.harvest(src) == ERR_NOT_IN_RANGE){
                creep.moveTo(src)
            }
        } else {
            let controller = creep.room.controller
            if(creep.transfer(controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(controller)
            }
        }
    }
};