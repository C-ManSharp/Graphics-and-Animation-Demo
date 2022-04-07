// Create dummy
function CreateDummy() {
    // Get all of the textures
    const WOOD_TORCH_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodTorch");
    const WOOD_TORCH_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodTorchNormal");
    const TARGET_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("targetShield");
    WOOD_TORCH_TEXTURE.rotation = Math.PI/2;
    WOOD_TORCH_NORMAL_TEXTURE.rotation = Math.PI/2;
    
    // Create bottom part of the torch
    const cylinderGeometry = new THREE.CylinderGeometry( 0.2, 0.2, 1.6, 16 );
    var material = new THREE.MeshPhongMaterial( {
        map: WOOD_TORCH_TEXTURE,
        shininess: 50,
        normalMap: WOOD_TORCH_NORMAL_TEXTURE
    });
    WOOD_TORCH_TEXTURE.wrapS = WOOD_TORCH_TEXTURE.wrapT = THREE.RepeatWrapping;

    const dummy = new THREE.Mesh(cylinderGeometry, material);
    // Force normal map to wrap
    dummy.material.normalMap.wrapS = dummy.material.normalMap.wrapT = THREE.RepeatWrapping; 
    
    // Create dummy hands
    const handsGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 1.3, 16 );
    var material = new THREE.MeshPhongMaterial( {
        map: WOOD_TORCH_TEXTURE,
        shininess: 50,
        normalMap: WOOD_TORCH_NORMAL_TEXTURE
    });
    WOOD_TORCH_TEXTURE.wrapS = WOOD_TORCH_TEXTURE.wrapT = THREE.RepeatWrapping;

    const hands = new THREE.Mesh(handsGeometry, material);
    // Force normal map to wrap
    hands.material.normalMap.wrapS = hands.material.normalMap.wrapT = THREE.RepeatWrapping; 
    hands.rotation.z = Math.PI/2;
    hands.position.y = 0.4;
    dummy.add(hands);

     
    // Create head for dummy
    const sphereGeometry = new THREE.SphereGeometry(0.25, 5, 5);
    var material = new THREE.MeshPhongMaterial( {
        map: WOOD_TORCH_TEXTURE,
        shininess: 50,
        normalMap: WOOD_TORCH_NORMAL_TEXTURE
    });
    WOOD_TORCH_TEXTURE.wrapS = WOOD_TORCH_TEXTURE.wrapT = THREE.RepeatWrapping;

    const head = new THREE.Mesh(sphereGeometry, material);
    // Force normal map to wrap
    head.material.normalMap.wrapS = head.material.normalMap.wrapT = THREE.RepeatWrapping; 
    head.position.y = 1;
    dummy.add(head);

    // Create target shield
    const planeGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    var material = new THREE.MeshBasicMaterial( {
        map: TARGET_TEXTURE, 
        transparent: true, 
    });
    material.side = THREE.DoubleSide
    //TARGET_TEXTURE.wrapS = TARGET_TEXTURE.wrapT = THREE.RepeatWrapping;

    const targetShield = new THREE.Mesh(planeGeometry, material);
    targetShield.position.y = 0.4;
    targetShield.position.z = 0.2;
    dummy.add(targetShield);

    return dummy;
}

export { CreateDummy };