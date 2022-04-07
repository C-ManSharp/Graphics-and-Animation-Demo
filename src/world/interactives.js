import { CreateCannon } from './models/cannonModel.js';
import { CreateCannonball } from './models/cannonBall.js';
import { CreateDummy } from './models/dummy.js';

// Group to store the dummies. Is placed here so that it can be accessed in the main.js
//let dummiesArray = [];

function CreateInteractives() {
    var interactives = new THREE.Group();

    interactives.add(SpawnDummies());
    interactives.add(SpawnCannons());

    return interactives;
}

// This function creating and adding multiple dummies to the scene
function SpawnDummies() {
    var dummies = new THREE.Group();

    var dummy_1 = CreateDummy();
    dummy_1.position.set(-15, 0.75, -10);
    dummy_1.rotation.y = Math.PI;
    dummy_1.name = "dummy1";
    dummies.add(dummy_1);
    
    var dummy_2 = CreateDummy();
    dummy_2.position.set(-20, 0.75, -10);
    dummy_2.rotation.y = Math.PI;
    dummy_2.name = "dummy2";
    dummies.add(dummy_2);

    var dummy_3 = CreateDummy();
    dummy_3.position.set(-25, 0.75, -10);
    dummy_3.rotation.y = Math.PI;
    dummy_3.name = "dummy3";
    dummies.add(dummy_3);
    
    var dummy_4 = CreateDummy();
    dummy_4.position.set(-32.5, 0.75, -15);
    dummy_4.rotation.y = Math.PI/2;
    dummy_4.name = "dummy4";
    dummies.add(dummy_4);
    
    var dummy_5 = CreateDummy();
    dummy_5.position.set(-32.5, 0.75, -20);
    dummy_5.rotation.y = Math.PI/2;
    dummy_5.name = "dummy5";
    dummies.add(dummy_5);

    var dummy_6 = CreateDummy();
    dummy_6.position.set(-32.5, 0.75, -25);
    dummy_6.rotation.y = Math.PI/2;
    dummy_6.name = "dummy6";
    dummies.add(dummy_6);

    return dummies;
}

// Create Cannon with Cannonballs nearby
function SpawnCannons() {
    var cannons = new THREE.Group();

    // var cannonArea = new THREE.Group();
    var cannon_1 = CreateCannon();
    cannon_1.position.set(35, 1, -55);
    cannon_1.rotation.y = Math.PI*-0.7;
    cannons.add(cannon_1);

    // var cannonArea = new THREE.Group();
    var cannon_2 = CreateCannon();
    cannon_2.position.set(35.5, 1, -45);
    cannon_2.rotation.y = Math.PI*-0.6;
    cannons.add(cannon_2);

    // var cannonArea = new THREE.Group();
    var cannon_3 = CreateCannon();
    cannon_3.position.set(35, 1, -35);
    cannon_3.rotation.y = Math.PI*-0.65;
    cannons.add(cannon_3);

    var cannonball_group_1 = CreateCannonballGroup();
    cannonball_group_1.position.set(35, 0, -53);
    cannons.add(cannonball_group_1);

    var cannonball_group_2 = CreateCannonballGroup();
    cannonball_group_2.position.set(36, 0, -43);
    cannons.add(cannonball_group_2);

    var cannonball_group_3 = CreateCannonballGroup();
    cannonball_group_3.position.set(37, 0, -33);
    cannons.add(cannonball_group_3);

    return cannons;
}

// Create multiple cannonballs in a group
function CreateCannonballGroup() {
    var cannonball_group = new THREE.Group();
    
    var cannon_balls_1 = CreateCannonball();
    cannon_balls_1.position.set(0, 0.25, 0);
    cannon_balls_1.rotation.y = Math.PI*-0.65;
    cannonball_group.add(cannon_balls_1);
    
    var cannon_balls_2 = CreateCannonball();
    cannon_balls_2.position.set(0, 0.25, -0.5);
    cannon_balls_2.rotation.y = Math.PI*-0.65;
    cannonball_group.add(cannon_balls_2);
    
    var cannon_balls_3 = CreateCannonball();
    cannon_balls_3.position.set(0.6, 0.25, -0.25);
    cannon_balls_3.rotation.y = Math.PI*-0.65;
    cannonball_group.add(cannon_balls_3);
    
    var cannon_balls_4 = CreateCannonball();
    cannon_balls_4.position.set(0.25, 0.73, -0.25);
    cannon_balls_4.rotation.y = Math.PI*-0.65;
    cannonball_group.add(cannon_balls_4);
    
    return cannonball_group;
}

export { CreateInteractives };