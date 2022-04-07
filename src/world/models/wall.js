// Create wall model
function CreateWall() {
    // Get all of the textures
    const STONE_BRICK_WALL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickWall");
    const STONE_BRICK_WALL_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickWallNormal");
    
    // Create bottom part of the tower
    const cylinderGeometry = new THREE.BoxGeometry( 8, 4 , 1 );

    const materials = [
        new THREE.MeshPhongMaterial({ // LEFT SIDE

        }),
        new THREE.MeshPhongMaterial({ // RIGHT SIDE

        }),                           
        new THREE.MeshPhongMaterial({ // TOP
            transparent: true
        }),
        new THREE.MeshPhongMaterial({ // BOTTOM
            transparent: true
        }),      
        new THREE.MeshPhongMaterial({ // FRONT
            map: STONE_BRICK_WALL_TEXTURE,
            shininess: 300,
            normalMap: STONE_BRICK_WALL_NORMAL_TEXTURE
        }),
        new THREE.MeshPhongMaterial({ // BACK
            map: STONE_BRICK_WALL_TEXTURE,
            shininess: 300,
            normalMap: STONE_BRICK_WALL_NORMAL_TEXTURE
        }),       
      ];

    STONE_BRICK_WALL_TEXTURE.wrapS = STONE_BRICK_WALL_TEXTURE.wrapT = THREE.RepeatWrapping;
    STONE_BRICK_WALL_NORMAL_TEXTURE.wrapS = STONE_BRICK_WALL_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    STONE_BRICK_WALL_TEXTURE.repeat.set(2, 1);
    
    const wall = new THREE.Mesh(cylinderGeometry, materials);
    wall.position.y = 2;

    wall.castShadow = true;
    wall.receiveShadow = true;

    return wall;
}

export { CreateWall };