import { CreateWall } from './models/wall.js';
import { CreateBlankWall } from './models/blankWall.js';
import { CreateTower } from './models/tower.js';
import { CreateRoofPavement } from './models/roofPavement.js';
import { CreateGate } from './models/gate.js';

function CreateEntireCastle() {
    var castle = new THREE.Group();

    castle.add(CreateWallsAroundCastle());
    castle.add(CreateCastle());

    return castle;
}

// Generate castle
function CreateCastle() {
    var castle = new THREE.Group();
    //GenerateCastleFrontWall(-38.99, 2, -33.49 /* Prevent flickering */, 4, 3);
    castle.add(GenerateCastleXWall(-38.99, 2, -33.49, 4, 2)); // Generate castle back wall
    castle.add(GenerateCastleXWall(-38.99, 2, -72.51, 4, 2)); // Generate castle front wall
    castle.add(GenerateCastleYWall(-42.5, 2, -37, 5, 2));// Generate castle left wall
    castle.add(GenerateCastleYWall(-11.48, 2, -37, 5, 2)); // Generate castle right wall

    // Basement top part with blanks
    castle.add(GenerateXWall(-38.99, 10, -33.49, 4, 1, 2)); // Generate castle back wall
    castle.add(GenerateXWall(-38.99, 10, -72.51, 4, 1, 1)); // Generate castle front wall
    castle.add(GenerateYWall(-42.5, 10, -37, 5, 1, -1)); // Generate castle left wall
    castle.add(GenerateYWall(-11.48, 10, -37, 5, 1, 1)); // Generate castle right wall

    castle.add(CreateCastleTowers());

    const roof = CreateRoofPavement(30, 40);
    castle.add(roof);
    roof.position.set(-27, 12.5, -53);

    castle.add(GenerateCastleXWall(-31, 14, -41.49, 2, 1)); // Generate castle front wall
    castle.add(GenerateCastleXWall(-31, 14, -64.51, 2, 1)); // Generate castle back wall
    castle.add(GenerateCastleYWall(-34.5, 14, -45, 3, 1)); // Generate castle left wall
    castle.add(GenerateCastleYWall(-19.48, 14, -45, 3, 1)); // Generate castle right wall

    castle.add(GenerateXWall(-31, 18, -41.49, 2, 1, 2)); // Generate castle front wall
    castle.add(GenerateXWall(-31, 18, -64.51, 2, 1, 1)); // Generate castle back wall
    castle.add(GenerateYWall(-34.5, 18, -45, 3, 1, -1)); // Generate castle left wall
    castle.add(GenerateYWall(-19.48, 18, -45, 3, 1, 1)); // Generate castle right wall

    castle.add(CreateTopCastleTowers());

    const roof2 = CreateRoofPavement(15, 24);
    castle.add(roof2);
    roof2.position.set(-27, 20.5, -53);

    const castleGate_1 = CreateGate();
    castle.add(castleGate_1);
    castleGate_1.scale.set(2, 2, 2);
    castleGate_1.position.set(-11, 3, -53.5);
    castleGate_1.rotation.y = Math.PI/2;

    const castleGate_2 = CreateGate();
    castle.add(castleGate_2);
    castleGate_2.scale.set(2, 2, 2);
    castleGate_2.position.set(-11, 3, -56.5);
    castleGate_2.rotation.y = Math.PI/2; 

    return castle;
}

function CreateTopCastleTowers() {
    var towers = new THREE.Group();

    const tower101 = CreateTower();
    towers.add(tower101);
    tower101.scale.set(0.9, 1.5, 0.9);
    tower101.position.set(-19.5, 18.5, -41);

    const tower102 = CreateTower();
    towers.add(tower102);
    tower102.scale.set(0.9, 1.5, 0.9);
    tower102.position.set(-34.5, 18.5, -41);

    const tower103 = CreateTower();
    towers.add(tower103);
    tower103.scale.set(0.9, 1.5, 0.9);
    tower103.position.set(-34.5, 18.5, -65);

    const tower104 = CreateTower();
    towers.add(tower104);
    tower104.scale.set(0.9, 1.5, 0.9);
    tower104.position.set(-19.5, 18.5, -65);
    return towers;
}

function CreateCastleTowers() {
    var towers = new THREE.Group();

    const tower101 = CreateTower();
    towers.add(tower101);
    tower101.scale.set(1.7, 2.3, 1.7);
    tower101.position.set(-11.5, 9, -35);

    const tower102 = CreateTower();
    towers.add(tower102);
    tower102.scale.set(1.7, 2.3, 1.7);
    tower102.position.set(-43, 9, -35);

    const tower103 = CreateTower();
    towers.add(tower103);
    tower103.scale.set(1.7, 2.3, 1.7);
    tower103.position.set(-43, 9, -72);

    const tower104 = CreateTower();
    towers.add(tower104);
    tower104.scale.set(1.7, 2.3, 1.7);
    tower104.position.set(-11.5, 9, -72);

    return towers;
}

function CreateWallsAroundCastle() {
    var walls = new THREE.Group();

    // Create gate
    const gate = CreateGate();
    walls.add(gate);
    gate.position.x = -0.75;

    const gate2 = CreateGate();
    walls.add(gate2);
    gate2.position.x = 0.95;
    gate2.position.z = 0.6
    gate2.rotation.y = Math.PI * 1.3;
    
    // Create a wall at the specific position in world
    const wall1 = CreateBlankWall();
    walls.add(wall1);    
    wall1.position.x = -5.5;

    const wall2 = CreateBlankWall();
    walls.add(wall2);    
    wall2.position.x = 5.5;

    // Create a tower at the specific position in world
    const tower1 = CreateTower();
    walls.add(tower1);
    tower1.position.x = -7;  

    const tower2 = CreateTower();
    walls.add(tower2);
    tower2.position.x = 7;    

    const wall3 = CreateBlankWall();
    walls.add(wall3);    
    wall3.position.x = -13.5;

    const wall4 = CreateBlankWall();
    walls.add(wall4);    
    wall4.position.x = 13.5;

    const wall5 = CreateBlankWall();
    walls.add(wall5);    
    wall5.position.x = -21.5;

    const wall6 = CreateBlankWall();
    walls.add(wall6);    
    wall6.position.x = 21.5;

    const tower3 = CreateTower();
    walls.add(tower3);
    tower3.position.x = -28;

    const tower4 = CreateTower();
    walls.add(tower4);
    tower4.position.x = 28;   

    const wall7 = CreateBlankWall();
    walls.add(wall7);    
    wall7.position.x = -32.5;
    wall7.position.z = -4.5;    
    wall7.rotation.y = Math.PI /-4;

    const wall8 = CreateBlankWall();
    walls.add(wall8);    
    wall8.position.x = 32.5;
    wall8.position.z = -4.5;    
    wall8.rotation.y = Math.PI /4;

    const wall9 = CreateBlankWall();
    walls.add(wall9);    
    wall9.position.x = -38;
    wall9.position.z = -10;    
    wall9.rotation.y = Math.PI /-4;

    const wall10 = CreateBlankWall();
    walls.add(wall10);    
    wall10.position.x = 38;
    wall10.position.z = -10;    
    wall10.rotation.y = Math.PI /4;

    const tower5 = CreateTower();
    walls.add(tower5);
    tower5.position.x = -42.5;
    tower5.position.z = -14.5;  

    const tower6 = CreateTower();
    walls.add(tower6);
    tower6.position.x = 42.5;  
    tower6.position.z = -14.5;  

    const wall11 = CreateBlankWall();
    walls.add(wall11);    
    wall11.position.x = -42.5;
    wall11.position.z = -21;    
    wall11.rotation.y = Math.PI /-2;

    const wall12 = CreateBlankWall();
    walls.add(wall12);    
    wall12.position.x = 42.5;
    wall12.position.z = -21;    
    wall12.rotation.y = Math.PI /2;

    const wall13 = CreateBlankWall();
    walls.add(wall13);    
    wall13.position.x = -42.5;
    wall13.position.z = -29;    
    wall13.rotation.y = Math.PI /-2;

    const wall14 = CreateBlankWall();
    walls.add(wall14);    
    wall14.position.x = 42.5;
    wall14.position.z = -29;    
    wall14.rotation.y = Math.PI /2;

    const wall16 = CreateBlankWall();
    walls.add(wall16);    
    wall16.position.x = 42.5;
    wall16.position.z = -37;    
    wall16.rotation.y = Math.PI /2;

    const wall18 = CreateBlankWall();
    walls.add(wall18);    
    wall18.position.x = 42.5;
    wall18.position.z = -45;    
    wall18.rotation.y = Math.PI /2;


    const wall20 = CreateBlankWall();
    walls.add(wall20);    
    wall20.position.x = 42.5;
    wall20.position.z = -53;    
    wall20.rotation.y = Math.PI /2;

    // NON SYMETRIC RIGTH WING WALL
    const tower7 = CreateTower();
    walls.add(tower7);    
    tower7.position.x = 42.5;
    tower7.position.z = -59;    

    const wall32 = CreateBlankWall();
    walls.add(wall32);    
    wall32.position.x = 38;
    wall32.position.z = -63;
    wall32.rotation.y = Math.PI* 0.75;

    const wall33 = CreateBlankWall();
    walls.add(wall33);    
    wall33.position.x = 32.5;
    wall33.position.z = -68.5;
    wall33.rotation.y = Math.PI* 0.75;
    
    const tower8 = CreateTower();
    walls.add(tower8);    
    tower8.position.x = 28;
    tower8.position.z = -73;  

    // BACK WALL
    const wall27 = CreateBlankWall();
    walls.add(wall27);    
    wall27.position.x = -7; // prevent texture flickering
    wall27.position.z = -72.5;    
    wall27.rotation.y = Math.PI;

    const wall28 = CreateBlankWall();
    walls.add(wall28);    
    wall28.position.x = 1;
    wall28.position.z = -72.5;    
    wall28.rotation.y = Math.PI;

    const wall29 = CreateBlankWall();
    walls.add(wall29);    
    wall29.position.x = 9; // prevent texture flickering
    wall29.position.z = -72.5;    
    wall29.rotation.y = Math.PI;

    const wall30 = CreateBlankWall();
    walls.add(wall30);    
    wall30.position.x = 17;
    wall30.position.z = -72.5;    
    wall30.rotation.y = Math.PI;

    const wall31 = CreateBlankWall();
    walls.add(wall31);    
    wall31.position.x = 25;
    wall31.position.z = -72.5;
    wall31.rotation.y = Math.PI;

    return walls;
}

// Castle Y axis castle wall generator
function GenerateCastleYWall(xPosition, yPosition, zPosition, numberOfRows, numberOfLevels) {
    var wallsGroup = new THREE.Group();

    var walls = new Array();
    for (var i=0; i< numberOfLevels; i++) {
        for (var j=0; j< numberOfRows ; j++) {
            walls[i+j] = CreateWall();
            wallsGroup.add(walls[j+i]);
            walls[i+j].position.x = xPosition;
            walls[i+j].position.z = zPosition - (8 * j);
            walls[i+j].position.y = yPosition + (4 * i);
            walls[i+j].rotation.y = Math.PI /2;
        }
    }
    return wallsGroup;
}

// Castle X axis castle wall generator
function GenerateCastleXWall(xPosition, yPosition, zPosition, numberOfRows, numberOfLevels) {
    var wallsGroup = new THREE.Group();

    var walls = new Array();
    for (var i=0; i< numberOfLevels; i++) {
        for (var j=0; j< numberOfRows ; j++) {
            walls[i+j] = CreateWall();
            wallsGroup.add(walls[j+i]);
            walls[i+j].position.x = xPosition + (8 * j);
            walls[i+j].position.z = zPosition;
            walls[i+j].position.y = yPosition + (4*i);
        }
    }
    return wallsGroup;
}


// Castle Y axis wall generator
function GenerateYWall(xPosition, yPosition, zPosition, numberOfRows, numberOfLevels, rotation) {
    var wallsGroup = new THREE.Group();
    var walls = new Array();
    for (var i=0; i< numberOfLevels; i++) {
        for (var j=0; j< numberOfRows ; j++) {
            walls[i+j] = CreateBlankWall();
            wallsGroup.add(walls[j+i]);
            walls[i+j].position.x = xPosition;
            walls[i+j].position.z = zPosition - (8 * j);
            walls[i+j].position.y = yPosition + (4 * i);
            walls[i+j].rotation.y = Math.PI /2 * rotation;
        }
    }
    return wallsGroup;
}

// Castle X axis wall generator
function GenerateXWall(xPosition, yPosition, zPosition, numberOfRows, numberOfLevels, rotation) {
    var wallsGroup = new THREE.Group();
    var walls = new Array();
    for (var i=0; i< numberOfLevels; i++) {
        for (var j=0; j< numberOfRows ; j++) {
            walls[i+j] = CreateBlankWall();
            wallsGroup.add(walls[j+i]);
            walls[i+j].position.x = xPosition + (8 * j);
            walls[i+j].position.z = zPosition;
            walls[i+j].position.y = yPosition + (4 * i);
            walls[i+j].rotation.y = Math.PI * rotation;            
        }
    }
    return wallsGroup;
}


export { CreateEntireCastle };