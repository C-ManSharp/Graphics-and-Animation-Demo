// Create tower model
function CreateTower() {
    // Get all of the textures
    const STONE_BRICK_WALL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickTower");
    const STONE_BRICK_WALL_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickTowerNormal");
    const STONE_BRICK_WALL_TOP_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickTowerTop");
    const STONE_BRICK_WALL_TOP_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickTowerTopNormal");
    
    // Create bottom part of the tower
    const cylinderGeometry = new THREE.CylinderGeometry( 2.5, 2.5, 8, 32 );
    var material = new THREE.MeshPhongMaterial( {
        map: STONE_BRICK_WALL_TEXTURE,
        shininess: 100,
        normalMap: STONE_BRICK_WALL_NORMAL_TEXTURE
    });
    STONE_BRICK_WALL_TEXTURE.wrapS = STONE_BRICK_WALL_TEXTURE.wrapT = THREE.RepeatWrapping;
    STONE_BRICK_WALL_TEXTURE.repeat.set(3, 1.5);
    
    const tower = new THREE.Mesh(cylinderGeometry, material);
    // Force normal map to wrap
    tower.material.normalMap.wrapS = tower.material.normalMap.wrapT = THREE.RepeatWrapping; 
    
    // Create top part of the tower
    const cylinderGeometry2 = new THREE.TorusGeometry( 2.5, 0.4, 5, 32 );
    var material2 = new THREE.MeshPhongMaterial( {
        map: STONE_BRICK_WALL_TOP_TEXTURE,
        shininess: 100,
        normalMap: STONE_BRICK_WALL_TOP_NORMAL_TEXTURE
    });
    STONE_BRICK_WALL_TOP_TEXTURE.wrapS = STONE_BRICK_WALL_TOP_TEXTURE.wrapT = THREE.RepeatWrapping;
    STONE_BRICK_WALL_TOP_TEXTURE.repeat.set(5, 1);
    const topTower = new THREE.Mesh(cylinderGeometry2, material2);
    topTower.material.normalMap.wrapS = topTower.material.normalMap.wrapT = THREE.RepeatWrapping;
    topTower.rotation.x = Math.PI / 2;
    topTower.position.y = 3.8;
    tower.add(topTower);
    
    // Create window
    const windowGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
    const windowMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 });
    const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
    windowMesh.position.set(0, 2, 2.4);
    tower.add(windowMesh);
    
    tower.position.y = 4;
    tower.castShadow = true;
    tower.receiveShadow = true;

    return tower;
}

export { CreateTower };