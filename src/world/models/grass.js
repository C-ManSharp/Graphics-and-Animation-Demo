// Create grass for the castle ground
function CreateGrass() {
    const GRASS_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("grass");
    const GRASS_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("grassNormal");

    const geometry = new THREE.PlaneGeometry(150, 120);
    var material = new THREE.MeshPhongMaterial({
        map: GRASS_TEXTURE,
        shininess: 25,
        normalMap: GRASS_NORMAL_TEXTURE
    });
    
    GRASS_TEXTURE.wrapS = GRASS_TEXTURE.wrapT = THREE.RepeatWrapping;
    GRASS_NORMAL_TEXTURE.wrapS = GRASS_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    GRASS_TEXTURE.repeat.set(15, 12);
    const grass = new THREE.Mesh(geometry, material);
    grass.rotation.x = Math.PI / -2;

    grass.receiveShadow = true;

    return grass;
}

// Old grass function, was too expensive, but was giving much more different effect of the grass, by rotating all of the tiles randomly.
/*
function CreateGrass(numberOfColumns, numberOfRows) {
    const GRASS_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("grass");
    const GRASS_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("grassNormal");

    const geometry = new THREE.PlaneGeometry(1, 1);
    var material = new THREE.MeshPhongMaterial({
        map: GRASS_TEXTURE,
        shininess: 25,
        normalMap: GRASS_NORMAL_TEXTURE
    });
    
    GRASS_TEXTURE.wrapS = GRASS_TEXTURE.wrapT = THREE.RepeatWrapping;
    GRASS_TEXTURE.repeat.set(0.6, 1);
    const grass = new THREE.Mesh();

    // Generate random grass rotation
    var grassTiles = new Array();
    // Generate random rotation value
    for (var i=0; i< numberOfColumns; i++) {
        for (var j=0; j< numberOfRows ; j++) {
                var randomRotation = parseInt(Math.floor(Math.random() * 4) + 1);
                switch (randomRotation) {
                    case 1: break;
                    case 2: randomRotation = 0.5; break;
                    case 3: randomRotation = 0.75; break;
                    case 4: randomRotation =0.25; break;
                }
            
            grassTiles[j+i] = new THREE.Mesh(geometry, material);
            grass.add(grassTiles[j+i]);
            grassTiles[i+j].position.x = 1 * i;
            grassTiles[i+j].position.z = 1 * j;
            grassTiles[i+j].rotation.x = Math.PI/-2
            grassTiles[i+j].rotation.z = (2*Math.PI) * randomRotation;            
        }
    }
    return grass;
}
*/

export { CreateGrass };