function CreateRoofPavement(width, height) {
    const ROOF_PAVEMENT_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("roofPavement");
    const ROOF_PAVEMENT_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("roofPavementNormal");

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshPhongMaterial({
        map: ROOF_PAVEMENT_TEXTURE,
        shininess: 100,
        normalMap: ROOF_PAVEMENT_NORMAL_TEXTURE
    });

    ROOF_PAVEMENT_TEXTURE.wrapS = ROOF_PAVEMENT_TEXTURE.wrapT = THREE.RepeatWrapping;
    ROOF_PAVEMENT_TEXTURE.repeat.set(3, 4);
    const roof = new THREE.Mesh(geometry, material);
    roof.material.normalMap.wrapS = roof.material.normalMap.wrapT = THREE.RepeatWrapping; 
    // roof.material.side = THREE.DoubleSide;
    roof.rotation.x = Math.PI/-2;

    roof.receiveShadow = true;

    return roof;
}

export { CreateRoofPavement };