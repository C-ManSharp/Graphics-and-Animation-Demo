// Create a single torch
function CreateTorch() {
    // Get all of the textures
    const WOOD_TORCH_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodTorch");
    const WOOD_TORCH_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodTorchNormal");
    const TORCH_METAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalRustyTorch");
    const TORCH_METAL_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalRustyTorchNormal");
    const PLATE_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalTorch");
    const PLATE_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalTorchNormal");
    WOOD_TORCH_TEXTURE.rotation = Math.PI/2;
    WOOD_TORCH_NORMAL_TEXTURE.rotation = Math.PI/2;    

    const torchGroup = new THREE.Group();

    // Create bottom part of the torch
    const cylinderGeometry = new THREE.CylinderGeometry( 0.04, 0.04, 0.4, 8 );
    var material = new THREE.MeshPhongMaterial( {
        map: WOOD_TORCH_TEXTURE,
        shininess: 50,
        normalMap: WOOD_TORCH_NORMAL_TEXTURE
    });
    WOOD_TORCH_TEXTURE.wrapS = WOOD_TORCH_TEXTURE.wrapT = THREE.RepeatWrapping;

    const torch = new THREE.Mesh(cylinderGeometry, material);
    // Force normal map to wrap
    torch.material.normalMap.wrapS = torch.material.normalMap.wrapT = THREE.RepeatWrapping; 
    
    // Create top part of the torch
    const points = [];
    for (let i = 0; i < 10; ++i) {
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
    }
    const segments = 32;  
    const phiStart = Math.PI * 0.00;  
    const phiLength = Math.PI * 2.00;  
    const geometry = new THREE.LatheBufferGeometry(
    points, segments, phiStart, phiLength);
    var material2 = new THREE.MeshPhongMaterial( {
        map: TORCH_METAL_TEXTURE,
        shininess: 200,
        normalMap: TORCH_METAL_NORMAL_TEXTURE
    });
    TORCH_METAL_TEXTURE.wrapS = TORCH_METAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    TORCH_METAL_TEXTURE.repeat.set(3, 0.5);
    const lathe = new THREE.Mesh(geometry, material2);
    lathe.material.side = THREE.DoubleSide;
    lathe.material.normalMap.wrapS = lathe.material.normalMap.wrapT = THREE.RepeatWrapping;
    lathe.scale.set(0.015, 0.015, 0.015);
    torch.add(lathe);
    lathe.position.y = 0.25;

    torch.rotation.x = Math.PI * 0.25;

    // Create metal part of the torch
    const planeGeometry = new THREE.PlaneGeometry( 0.28, 0.06, );
    var material = new THREE.MeshPhongMaterial( {
        map: PLATE_TEXTURE,
        shininess: 200,
        normalMap: PLATE_NORMAL_TEXTURE
    });
    PLATE_TEXTURE.wrapS = PLATE_TEXTURE.wrapT = THREE.RepeatWrapping;
    PLATE_TEXTURE.repeat.set(0.3, 0.1);

    const metalPart1 = new THREE.Mesh(planeGeometry, material);
    const metalPart2 = new THREE.Mesh(planeGeometry, material);
    metalPart1.material.side = THREE.DoubleSide;
    metalPart2.material.side = THREE.DoubleSide;
    // Force normal map to wrap
    metalPart1.material.normalMap.wrapS = metalPart1.material.normalMap.wrapT = THREE.RepeatWrapping;
    metalPart2.material.normalMap.wrapS = metalPart2.material.normalMap.wrapT = THREE.RepeatWrapping;
    metalPart1.position.set(-0.05, 0 , -0.1);
    metalPart2.position.set(0.05, 0 , -0.1);
    metalPart1.rotation.set(Math.PI * -0.2 , Math.PI * -0.4 , 0);
    metalPart2.rotation.set(Math.PI * -0.2 , Math.PI * 0.4 , 0);
    torch.add(metalPart1);
    torch.add(metalPart2);
    torchGroup.add(torch);

    // Add Fire here
    // torch.add(yourFire);

    return torchGroup;
}

export { CreateTorch };