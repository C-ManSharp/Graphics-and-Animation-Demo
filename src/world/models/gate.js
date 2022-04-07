// Create Gate
function CreateGate() {
    const GATE_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalGate");
    const GATE_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalGateNormal");
    const GATE_SIDE_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalGateSide");
    const GATE_SIDE_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalGateSideNormal");
    const GATE_TOP_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalGateTop");
    const GATE_TOP_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalGateTopNormal");

    const gateGeometry = new THREE.BoxGeometry(1.5, 3, 0.2);

    const materials = [
        new THREE.MeshPhongMaterial({ // LEFT SIDE
            map: GATE_SIDE_TEXTURE,
            shininess: 300,
            normalMap: GATE_SIDE_NORMAL_TEXTURE
        }),
        new THREE.MeshPhongMaterial({ // RIGHT SIDE
            map: GATE_SIDE_TEXTURE,
            shininess: 300,
            normalMap: GATE_SIDE_NORMAL_TEXTURE
        }),                           
        new THREE.MeshPhongMaterial({ // TOP
            map: GATE_TOP_TEXTURE,
            shininess: 300,
            normalMap: GATE_TOP_NORMAL_TEXTURE
        }),
        new THREE.MeshPhongMaterial({ // BOTTOM
            map: GATE_TOP_TEXTURE,
            shininess: 300,
            normalMap: GATE_TOP_NORMAL_TEXTURE
        }),      
        new THREE.MeshPhongMaterial({ // FRONT
            map: GATE_TEXTURE,
            shininess: 300,
            normalMap: GATE_NORMAL_TEXTURE
        }),
        new THREE.MeshPhongMaterial({ // BACK
            map: GATE_TEXTURE,
            shininess: 300,
            normalMap: GATE_NORMAL_TEXTURE
        }),       
      ];

    const gate = new THREE.Mesh(gateGeometry, materials);

    GATE_TEXTURE.wrapS = GATE_TEXTURE.wrapT = THREE.RepeatWrapping;
    GATE_NORMAL_TEXTURE.wrapS = GATE_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    GATE_TEXTURE.repeat.set(1, 1.5);

    GATE_SIDE_TEXTURE.wrapS = GATE_SIDE_TEXTURE.wrapT = THREE.RepeatWrapping;
    GATE_NORMAL_TEXTURE.wrapS = GATE_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    GATE_SIDE_TEXTURE.repeat.set(0.07, 1);

    GATE_TOP_TEXTURE.wrapS = GATE_TOP_TEXTURE.wrapT = THREE.RepeatWrapping;
    GATE_NORMAL_TEXTURE.wrapS = GATE_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    GATE_TOP_TEXTURE.repeat.set(1, 0.1);

    gate.position.y = 1.5;

    gate.castShadow = true;
    gate.receiveShadow = true;

    return gate;
}

export { CreateGate };