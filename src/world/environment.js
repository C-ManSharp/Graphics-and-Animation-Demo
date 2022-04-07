import { CreateForest } from './models/forest.js';
import { CreateWater } from './models/water.js';
import { CreateGrass } from './models/grass.js';

function CreateEnvironment() {
    var environment = new THREE.Group();
    // CreateFog();

    const grass = CreateGrass();
    environment.add(grass);
    grass.position.set(0, 0, -50);

    const grass_2 = CreateGrass();
    environment.add(grass_2);
    grass_2.position.set(0, 0, 74);

    const grass_3 = CreateGrass();
    environment.add(grass_3);
    grass_3.position.set(0, -60, 10);
    grass_3.rotation.x = 0;

    const grass_4 = CreateGrass();
    environment.add(grass_4);
    grass_4.position.set(0, -60, 14);
    grass_4.rotation.x = Math.PI;

    const water = CreateWater();
    environment.add(water);
    water.position.set(0, -1, 12.5);

    //  Left hand forest
    const forest_1 = CreateForest(12, 2, 3);
    environment.add(forest_1);
    forest_1.position.set(-65, 0, -55);

    // Right hand forest
    const forest_2 = CreateForest(18, 1, 3);
    environment.add(forest_2);
    forest_2.position.set(50, 0, -80);

    // Forest behind castle
    const forest_3 = CreateForest(2, 10, 14);
    environment.add(forest_3);
    forest_3.position.set(-10, 0, -95);

    return environment;
}

export { CreateEnvironment };