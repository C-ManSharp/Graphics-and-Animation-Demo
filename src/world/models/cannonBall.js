// Create Cannonball
function CreateCannonball() {
    const PLATE_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalCannonball");
    const PLATE_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalCannonballNormal");

    const sphere = new THREE.SphereGeometry(0.3, 16, 16);
    var material = new THREE.MeshPhongMaterial( {
        map: PLATE_TEXTURE,
        shininess: 200,
        normalMap: PLATE_NORMAL_TEXTURE
    });
    PLATE_TEXTURE.wrapS = PLATE_TEXTURE.wrapT = THREE.RepeatWrapping;
    PLATE_TEXTURE.repeat.set(1, 1);

    const cannonball = new THREE.Mesh(sphere, material);
    // Force normal map to wrap
    cannonball.material.normalMap.wrapS = cannonball.material.normalMap.wrapT = THREE.RepeatWrapping;

    cannonball.castShadow = true;

    return cannonball;
}

export { CreateCannonball };