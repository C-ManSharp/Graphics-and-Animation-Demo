// Create grass for the castle ground
function CreateWater() {
    const WATER_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("water");
    const WATER_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("waterNormal");

    const geometry = new THREE.PlaneGeometry(150, 5);
    var material = new THREE.MeshPhongMaterial({
        map: WATER_TEXTURE,
        shininess: 1000,
        normalMap: WATER_NORMAL_TEXTURE
    });
    
    WATER_TEXTURE.wrapS = WATER_TEXTURE.wrapT = THREE.RepeatWrapping;
    WATER_NORMAL_TEXTURE.wrapS = WATER_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    WATER_TEXTURE.repeat.set(7, 0.25);
    const grass = new THREE.Mesh(geometry, material);
    //grass.rotation.y = Math.PI/2;
    grass.rotation.x = Math.PI/-2;

    grass.receiveShadow = true;

    return grass;
}

export { CreateWater };