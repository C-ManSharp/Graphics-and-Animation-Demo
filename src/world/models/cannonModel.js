// Create cannon
function CreateCannon() {
    // Get all of the textures
    const METAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalCannon");
    const METAL_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalCannonNormal");
    const METAL_WHEEL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalWheel");
    const METAL_WHEEL_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("metalWheelNormal");
    const WHEEL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("wheel");
    const WHEEL_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("wheelNormal");
    
    // Create bottom part of the torch
    const cylinderGeometry = new THREE.CylinderGeometry( 0.4, 0.4, 2, 16 );
    var material = new THREE.MeshPhongMaterial( {
        map: METAL_TEXTURE,
        shininess: 200,
        normalMap: METAL_NORMAL_TEXTURE
    });
    const cannon = new THREE.Mesh(cylinderGeometry, material);   
     
    // Create head for cannon
    const sphereGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    var material = new THREE.MeshPhongMaterial( {
        map: METAL_TEXTURE,
        shininess: 200,
        normalMap: METAL_NORMAL_TEXTURE
    });
    const head = new THREE.Mesh(sphereGeometry, material);
    head.position.y = 1;
    cannon.add(head);

    const wheelGeometry = new THREE.CylinderGeometry( 0.6, 0.6, 0.1, 32 );
    var material = [
        new THREE.MeshPhongMaterial({
            map: METAL_WHEEL_TEXTURE,
            shininess: 100,
            normalMap: METAL_WHEEL_NORMAL_TEXTURE
        }),
        new THREE.MeshPhongMaterial({
            map: WHEEL_TEXTURE,
            shininess: 50,
            normalMap: WHEEL_NORMAL_TEXTURE,
            transparent: true,
        }),                        
        new THREE.MeshPhongMaterial({
            map: WHEEL_TEXTURE,
            shininess: 50,
            normalMap: WHEEL_NORMAL_TEXTURE,
            transparent: true
        }),       
        ];
    WHEEL_TEXTURE.wrapS = WHEEL_TEXTURE.wrapT = THREE.RepeatWrapping;
    WHEEL_NORMAL_TEXTURE.wrapS = WHEEL_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    WHEEL_TEXTURE.repeat.set(0.9, 0.9);
    METAL_WHEEL_TEXTURE.repeat.set(1, 0.05);
    const wheel = new THREE.Mesh(wheelGeometry, material);   
    const wheel2 = new THREE.Mesh(wheelGeometry, material);   
    wheel.rotation.x = Math.PI/2;
    wheel.position.y = 0.5;
    wheel.position.x = -0.2;
    wheel.position.z = 0.45;
    wheel2.rotation.x = Math.PI/2;
    wheel2.position.y = 0.5;
    wheel2.position.x = -0.2;
    wheel2.position.z = -0.45;
    cannon.add(wheel);
    cannon.add(wheel2);

    // Create hole
    const holeGeometry = new THREE.CylinderGeometry( 0.3, 0.3, 0.1, 16 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00000000 });
    const hole = new THREE.Mesh(holeGeometry, material);  
    hole.position.y = -0.96;
    cannon.add(hole);

    // Create hole
    const fuseGeometry = new THREE.CylinderGeometry( 0.02, 0.02, 0.2, 6 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00000000 });
    const fuse = new THREE.Mesh(fuseGeometry, material);  
    fuse.rotation.z = Math.PI /-6;
    fuse.position.y = 1.2;
    fuse.position.x = 0.4;

    cannon.add(fuse);
    cannon.rotation.z = 2*Math.PI/3;
    cannon.castShadow = true;

    return cannon;
}

export { CreateCannon };