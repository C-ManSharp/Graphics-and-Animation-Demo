// Create lever
function CreateLever() {
    // Get all of the textures
    const WOOD_TORCH_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodTorch");
    const WOOD_TORCH_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodTorchNormal");
    const STONE_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickBlank");
    const STONE_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickBlankNormal");
    WOOD_TORCH_TEXTURE.rotation = Math.PI/2;
    WOOD_TORCH_NORMAL_TEXTURE.rotation = Math.PI/2;
    
    // Create bottom part of the torch
    const cylinderGeometry = new THREE.CylinderGeometry( 0.05, 0.05, 1, 16 );
    var material = new THREE.MeshPhongMaterial( {
        map: WOOD_TORCH_TEXTURE,
        shininess: 50,
        normalMap: WOOD_TORCH_NORMAL_TEXTURE
    });
    WOOD_TORCH_TEXTURE.wrapS = WOOD_TORCH_TEXTURE.wrapT = THREE.RepeatWrapping;

    const lever = new THREE.Mesh(cylinderGeometry, material);
    // Force normal map to wrap
    lever.material.normalMap.wrapS = lever.material.normalMap.wrapT = THREE.RepeatWrapping; 
    lever.position.y = 0.5;
    var pivot = new THREE.Group();
    pivot.add(lever);

    var geometry = new THREE.BoxGeometry(0.5, 0.5, 1, 5, 1, 5);
    geometry.vertices[38].y = -0.2;
    geometry.vertices[38].z = 0.3;
    geometry.vertices[38].x = 0.15;

    geometry.vertices[37].y = -0.2;
    geometry.vertices[37].z = 0.3;
    geometry.vertices[37].x = -0.15;
    
    geometry.vertices[34].y = -0.2;
    geometry.vertices[34].z = -0.3;
    geometry.vertices[34].x = 0.15;

    geometry.vertices[33].y = -0.2;
    geometry.vertices[33].z = -0.3;
    geometry.vertices[33].x = -0.15;

    var material = new THREE.MeshPhongMaterial( {
        map: STONE_TEXTURE,
    });
    var leverBox = new THREE.Mesh(geometry, material);
    leverBox.name = "leverBox";
    leverBox.add(pivot);
    leverBox.position.y = 0.25;

    return leverBox;
}

export { CreateLever };