/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creeps.harvester');
 * mod.thing == 'a thing'; // true
 */
let utils = require("creeps.utils")
// let builderCreep =  require("creeps.builder")

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
            src = utils.findSource(creep)
            if(creep.harvest(src) == ERR_NOT_IN_RANGE){
                creep.moveTo(src)
            }
        } else {
            let spawn = creep.room.find(FIND_MY_STRUCTURES, {filter: (x)=>{return x.structureType == STRUCTURE_SPAWN}})[0]
            let storage = utils.findEnergyStorage(creep.room)
            if(storage.length > 0){
                utils.storeEnergyInSpawn(creep)
            } else {
                let csite = utils.findConstructionSite(creep)
                if(csite){
                    utils.buildSite(creep, csite)
                }
            }
            
        }
    }
};