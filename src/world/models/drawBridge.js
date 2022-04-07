// Create Drawbridge
function CreateDrawbridge() {
    const BRIDGE_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodPlanks");
    const BRIDGE_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodPlanksNormal");
    const BRIDGE_SIDE_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodPlanksSide");
    const BRIDGE_SIDE_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodPlanksSideNormal");
    const BRIDGE_TOP_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodPlanksTop");
    const BRIDGE_TOP_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("woodPlanksTopNormal");
    BRIDGE_TEXTURE.rotation = Math.PI /2;
    BRIDGE_SIDE_TEXTURE.rotation = Math.PI /2;
    BRIDGE_TOP_TEXTURE.rotation = Math.PI /2;
    BRIDGE_NORMAL_TEXTURE.rotation = Math.PI /2;
    BRIDGE_SIDE_NORMAL_TEXTURE.rotation = Math.PI /2;
    BRIDGE_TOP_NORMAL_TEXTURE.rotation = Math.PI /2;

    const geometry = new THREE.BoxGeometry(3, 4, 0.3);

    const materials = [
        new THREE.MeshPhongMaterial({ // LEFT SIDE
            map: BRIDGE_SIDE_TEXTURE,
            shininess: 100,
            normalMap: BRIDGE_SIDE_NORMAL_TEXTURE
        }),
        new THREE.MeshPhongMaterial({ // RIGHT SIDE
            map: BRIDGE_SIDE_TEXTURE,
            shininess: 100,
            normalMap: BRIDGE_SIDE_NORMAL_TEXTURE
        }),                           
        new THREE.MeshPhongMaterial({ // TOP
            map: BRIDGE_TOP_TEXTURE,
            shininess: 100,
            normalMap: BRIDGE_TOP_NORMAL_TEXTURE
        }),
        new THREE.MeshPhongMaterial({ // BOTTOM
            map: BRIDGE_TOP_TEXTURE,
            shininess: 100,
            normalMap: BRIDGE_TOP_NORMAL_TEXTURE
        }),      
        new THREE.MeshPhongMaterial({ // FRONT
            map: BRIDGE_TEXTURE,
            shininess: 100,
            normalMap: BRIDGE_NORMAL_TEXTURE
        }),
        new THREE.MeshPhongMaterial({ // BACK
            map: BRIDGE_TEXTURE,
            shininess: 100,
            normalMap: BRIDGE_NORMAL_TEXTURE
        }),       
      ];

    const bridge = new THREE.Mesh(geometry, materials);

    BRIDGE_TEXTURE.wrapS = BRIDGE_TEXTURE.wrapT = THREE.RepeatWrapping;
    BRIDGE_NORMAL_TEXTURE.wrapS = BRIDGE_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    BRIDGE_TEXTURE.repeat.set(1, 1);

    BRIDGE_SIDE_TEXTURE.wrapS = BRIDGE_SIDE_TEXTURE.wrapT = THREE.RepeatWrapping;
    BRIDGE_SIDE_NORMAL_TEXTURE.wrapS = BRIDGE_SIDE_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    BRIDGE_SIDE_TEXTURE.repeat.set(1, 0.1);

    BRIDGE_TOP_TEXTURE.wrapS = BRIDGE_TOP_TEXTURE.wrapT = THREE.RepeatWrapping;
    BRIDGE_TOP_NORMAL_TEXTURE.wrapS = BRIDGE_TOP_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    BRIDGE_TOP_TEXTURE.repeat.set(0.1, 1);

    bridge.position.y = 2;
    var pivot = new THREE.Group();
    pivot.rotation.y = Math.PI;
    pivot.add(bridge);

    bridge.castShadow = true;

    return pivot;
}

export { CreateDrawbridge };