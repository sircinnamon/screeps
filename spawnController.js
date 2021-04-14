/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnController');
 * mod.thing == 'a thing'; // true
 */
let creepCoordination = require("creeps.coordination")

module.exports = {
    
    cleanupNames: () => {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                creepCoordination.clearDeadCreepAssignments()
                delete Memory.creeps[name];
            }
        }
    },
    spawnRoleIfLessThan: (role, count) => {
        module.exports.cleanupNames()
    
        var valid = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        // console.log(`Role ${role}: ${valid.length}`);
        
        if(valid.length < count) {
            var newName = role + Game.time;
            console.log('Spawning new creep: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
                {memory: {role: role}});        
        }
    }
};