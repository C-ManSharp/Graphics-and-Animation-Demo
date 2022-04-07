// Create wall model
function CreateBlankWall() {
    // Get all of the textures
    const STONE_BRICK_WALL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickWall");
    const STONE_BRICK_WALL_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickWallNormal");
    const STONE_BRICK_WALL_TOP_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickWallTop");
    const STONE_BRICK_WALL_TOP_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickWallTopNormal");
    const STONE_BRICK_BLANK_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickBlank");
    const STONE_BRICK_BLANK_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("stoneBrickBlankNormal");
    
    // Create bottom part of the tower
    const wallGeometry = new THREE.BoxGeometry( 8, 4, 1 );

    /*
    var material = new THREE.MeshPhongMaterial( {
        map: STONE_BRICK_WALL_TEXTURE,
        shininess: 100,
        normalMap: STONE_BRICK_WALL_NORMAL_TEXTURE
    });
    */

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
    STONE_BRICK_WALL_TEXTURE.repeat.set(1, 0.5);
    
    const wall = new THREE.Mesh(wallGeometry, materials);
    
    // Create top part of the tower
    const geometry = new THREE.BoxGeometry( 8, 1, 1.5 );

    const materials_2 = [
        new THREE.MeshPhongMaterial({ // LEFT SIDE
        }),
        new THREE.MeshPhongMaterial({ // RIGHT SIDE
        }),                           
        new THREE.MeshPhongMaterial({ // TOP
            map: STONE_BRICK_WALL_TOP_TEXTURE,
            shininess: 100,
            normalMap: STONE_BRICK_WALL_TOP_NORMAL_TEXTURE
        }),
        new THREE.MeshPhongMaterial({ // BOTTOM
        }),      
        new THREE.MeshPhongMaterial({ // FRONT
            map: STONE_BRICK_WALL_TOP_TEXTURE,
            shininess: 100,
            normalMap: STONE_BRICK_WALL_TOP_NORMAL_TEXTURE
        }),
        new THREE.MeshPhongMaterial({ // BACK
            map: STONE_BRICK_WALL_TOP_TEXTURE,
            shininess: 100,
            normalMap: STONE_BRICK_WALL_TOP_NORMAL_TEXTURE
        }),       
      ];

    STONE_BRICK_WALL_TOP_TEXTURE.wrapS = STONE_BRICK_WALL_TOP_TEXTURE.wrapT = THREE.RepeatWrapping;
    STONE_BRICK_WALL_TOP_NORMAL_TEXTURE.wrapS = STONE_BRICK_WALL_TOP_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    STONE_BRICK_WALL_TOP_TEXTURE.repeat.set(2, 0.2);
    const wallPavement = new THREE.Mesh(geometry, materials_2);


    wall.add(wallPavement);
    wallPavement.position.y = 2.5;
    wallPavement.position.z = -0.15;

    // Create blanks    
    const blankGeometry = new THREE.BoxGeometry( 1, 1, 0.5 );
    var material = new THREE.MeshPhongMaterial( {
        map: STONE_BRICK_BLANK_TEXTURE,
        shininess: 100,
        normalMap: STONE_BRICK_BLANK_NORMAL_TEXTURE
    });
    STONE_BRICK_BLANK_TEXTURE.wrapS = STONE_BRICK_BLANK_TEXTURE.wrapT = THREE.RepeatWrapping;
    STONE_BRICK_BLANK_TEXTURE.repeat.set(0.5, 0.2);

    var spacing = 2;
    const numberOfBlanks = 4;
    for (var i=0; i <numberOfBlanks; i++) {
        var blank = new THREE.Mesh(blankGeometry, material);
        blank.position.set(2.5-i*spacing, 1, 0.5);
        wallPavement.add(blank);      
    }
    blank.material.normalMap.wrapS = blank.material.normalMap.wrapT = THREE.RepeatWrapping;

    wall.position.y = 2;
    wall.castShadow = true;
    wall.receiveShadow = true;

    return wall;
}

export { CreateBlankWall };