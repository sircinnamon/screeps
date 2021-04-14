/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creeps.coordination');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    getEnergySourceAssignment: (creep) => {
        // Request to be assigned to an energy source
        let currentAssignments = Memory.creepAssignments.energySources
        let potentialSources = creep.room.find(FIND_SOURCES_ACTIVE)
        let target_src = potentialSources[0]
        for(let i in potentialSources){
            // console.log(potentialSources[i])
            let src = potentialSources[i]
            if(currentAssignments[src.id] === undefined){
                currentAssignments[src.id] = []
            }
            let rm_ind = currentAssignments[src.id].indexOf(creep.id)
            if( rm_ind > -1){
                currentAssignments[src.id].splice(rm_ind, 1)
            }
            if(currentAssignments[src.id].length < currentAssignments[target_src.id].length){
                target_src = src
            }
        }
        currentAssignments[target_src.id].push(creep.id)
        Memory.creepAssignments.energySources = currentAssignments
        return target_src
    },
    clearDeadCreepAssignments: () => {
        let currentAssignments = Memory.creepAssignments.energySources
        let liveCreeps = Object.values(Game.creeps).map(x => {return x.id})
        let onlyAlive = (x => {
            liveCreeps.includes(x)
        })
        for(let k in currentAssignments){
            currentAssignments[k] = currentAssignments[k].filter(onlyAlive)
        }
        Memory.creepAssignments.energySources = currentAssignments
    }
};