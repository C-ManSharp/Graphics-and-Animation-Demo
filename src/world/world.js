import { CreateEntireCastle } from './castle.js';
import { CreateEnvironment } from './environment.js';
import { CreateInteractives } from './interactives.js';
var world = new THREE.Group();

function CreateWorld() {
    
    world.add(CreateEntireCastle());
    world.add(CreateEnvironment());
    world.add(CreateInteractives());

    return world;
}

export { CreateWorld };