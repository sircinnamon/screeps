/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creeps.utils');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    findSource: (creep) => {
        let src;
        let override = creep.memory.override_source_id
        if(override && Game.getObjectById(override) && Game.getObjectById(override).room == creep.room){
            src = Game.getObjectById(override)
            return src
            // creep.say("SOURCE OVERRIDE")
        }
        if(creep.memory.source_id !== undefined){
            src = Game.getObjectById(creep.memory.source_id)
            return src
        }
        if(creep.memory.temp_source){
            src = Game.getObjectById(creep.memory.temp_source)
            return src
        }
        let min_src = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)[0]
        creep.memory.temp_source = min_src.id
        
        return min_src
    },
    buildSite: (creep, site) => {
        if(site){
            if(creep.build(site, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(site)
            }
        }
    },
    findConstructionSite: (creep) => {
        return creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
    },
    storeEnergyInSpawn: (creep) => {
        let storage = module.exports.findEnergyStorage(creep.room)[0]
        if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(storage, {visualizePathStyle:{}})
        }
    },
    findEnergyStorage: (room) => {
        let filter_func = (struct) => {
            let storeTypes = [
                STRUCTURE_SPAWN,
                STRUCTURE_EXTENSION
            ]
            if(!storeTypes.includes(struct.structureType)){return false}
            if(struct.store.getFreeCapacity(RESOURCE_ENERGY) == 0){return false}
            return true
        }
        let storage_arr = room.find(FIND_MY_STRUCTURES, {filter: filter_func})

        let neutral_filter_func = (struct) => {
            let storeTypes = [
                STRUCTURE_CONTAINER,
                STRUCTURE_STORAGE
            ]
            if(!storeTypes.includes(struct.structureType)){return false}
            if(struct.store.getFreeCapacity(RESOURCE_ENERGY) == 0){return false}
            return true
        }

        let overflow_storage = room.find(FIND_STRUCTURES, {filter: neutral_filter_func})
        storage_arr = storage_arr.concat(overflow_storage)
        return storage_arr
    },
    findRepairable: (room) => {
        let filter_func = (struct) => {
            let repairable = [
                STRUCTURE_ROAD,
                STRUCTURE_EXTENSION,
                STRUCTURE_SPAWN,
                STRUCTURE_CONTAINER
            ]
            if(!repairable.includes(struct.structureType)){return false}
            if(struct.hits === struct.hitsMax){return false}
            return true
        }
        let repairable_arr = room.find(FIND_STRUCTURES, {filter: filter_func})
        return repairable_arr
    },
    repair: (creep, struct) => {
        if(struct){
            if(creep.repair(struct) == ERR_NOT_IN_RANGE){
                creep.moveTo(struct, {visualizePathStyle:{}})
            }
        }
    }
};