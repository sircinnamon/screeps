let harvesterCreep =  require("creeps.harvester")
let upgraderCreep =  require("creeps.upgrader")
let builderCreep =  require("creeps.builder")
let messengerCreep =  require("creeps.messenger")
let repairerCreep =  require("creeps.repairer")
let spawnController = require("spawnController")
let creepCoordination = require("creeps.coordination")

module.exports.loop = () => {
    
    spawnController.spawnRoleIfLessThan("harvester", 5)
    spawnController.spawnRoleIfLessThan("upgrader", 2)
    spawnController.spawnRoleIfLessThan("builder", 2)
    spawnController.spawnRoleIfLessThan("messenger", 0)
    spawnController.spawnRoleIfLessThan("repairer", 1)

    for(let name in Game.creeps){
        let creep = Game.creeps[name]
        if(creep.memory.source_id == undefined){
            let src = creepCoordination.getEnergySourceAssignment(creep)
            creep.memory.source_id = src.id
        }
        if(creep.memory.role == "harvester"){
            harvesterCreep.run(creep)
        } else if(creep.memory.role == "upgrader"){
            upgraderCreep.run(creep)
        } else if(creep.memory.role == "builder"){
            builderCreep.run(creep)
        } else if(creep.memory.role == "messenger"){
            messengerCreep.run(creep)
        } else if(creep.memory.role == "repairer"){
            repairerCreep.run(creep)
        }
    }
}