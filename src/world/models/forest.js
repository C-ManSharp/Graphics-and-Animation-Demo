// Spawn multiple rows of trees
// numberOfTreeGroups == number of rows
// minNumberOfTrees == min number of trees in a row
// maxNumberOfTrees == max number of trees in a row
function CreateForest(numberOfTreeGroups, minNumberOfTrees, maxNumberOfTrees) {
    var forest = new THREE.Group();
    var treeRows = new Array();
    for (var i = 0; i < numberOfTreeGroups; i++) {
        var numberOfTreesInRow = getRandom(minNumberOfTrees-1, maxNumberOfTrees-1);
        treeRows[i] = SpawnGroupOfTrees(numberOfTreesInRow);
        forest.add(treeRows[i]);
        if (i == 0) {
            treeRows[i].position.set(getRandom(0, 3), treeRows[i].position.y, getRandom(0, 3) );
        } else {
            treeRows[i].position.set(getRandom(0, 3), treeRows[i].position.y, treeRows[i-1].position.z + getRandom(3, 5) );
        }
        treeRows[i].rotation.y = Math.PI/4;
    }
    return forest;
}

// Spawn trees multiple trees in a row
function SpawnGroupOfTrees(numberOfTrees) {
    const groupOfTrees = new THREE.Group();
    const startX = 0;
    const startZ = 0;
    var trees = new Array();
    for (var i = 0; i<numberOfTrees; i++) {
        trees[i] = CreateTree();
        groupOfTrees.add(trees[i]);
        if (i == 0) {
            trees[i].position.set(startX, trees[i].position.y, startZ);
        } else {
            trees[i].position.set(trees[i-1].position.x + getRandom(3, 5), trees[i].position.y, trees[i-1].position.x + getRandom(3, 5));
        }
    }
    return groupOfTrees;
}

function CreateTree() {
    // Get all of the textures
    const TREE_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("tree");
    const TREE_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("treeNormal");
    //TREE_TEXTURE.rotation = Math.PI/2;
    TREE_TEXTURE.wrapS = TREE_TEXTURE.wrapT = THREE.RepeatWrapping;
    TREE_NORMAL_TEXTURE.wrapS = TREE_NORMAL_TEXTURE.wrapT = THREE.RepeatWrapping;
    TREE_TEXTURE.repeat.set(0.6, 4);

    const geometry = new THREE.ConeGeometry(1, 20, 8, 5);

    var treeHeight = getRandom(9, 12);
    geometry.vertices[0].y = treeHeight;
    // randomly generate tree trunk
    var treeWidth = 0.4;
    for (var i=0; i<geometry.vertices.length - 1; i++) {
        var randomX = (Math.random() < 0.5 ? -1 : 1) * Math.random()/7;  
        var randomZ = (Math.random() < 0.5 ? -1 : 1) * Math.random()/7; 

        // tree width factors
        if (i > 9) { treeWidth = 0.5 }
        if (i > 16) { treeWidth = 0.5 }
        if (i > 24) { treeWidth = 0.5 }
        if (i > 32) { treeWidth = 0.7 }

        geometry.vertices[i] = new THREE.Vector3( 
            (geometry.vertices[i].x + randomX) * treeWidth,
            geometry.vertices[i].y,
            (geometry.vertices[i].z + randomZ) * treeWidth
        );
    }    

    var material = new THREE.MeshPhongMaterial( {
        map: TREE_TEXTURE,
        shininess: 50,
        normalMap: TREE_NORMAL_TEXTURE
    });

    const tree = new THREE.Mesh(geometry, material);    

    // adjust number of branches to the tree hesight
    var branchesLevels = getRandom(13,16);
    if (treeHeight > 10) {
        branchesLevels = getRandom(15,17);
    }

    var branchesHeight = treeHeight -1.5;
    var branchesScale = 0.2;
    var branches = new Array();
    var even
    for (var i = 0; i<branchesLevels; i++) {
        branches[i] = CreateTreeBranches();
        tree.add(branches[i]);
        branches[i].position.y = branchesHeight; 
        branches[i].scale.set(branchesScale, branchesScale, branchesScale);
        branchesHeight = branchesHeight - getRandom(0.4,0.7);
        branchesScale = branchesScale + 0.05;
        if (i%2 == 0) {
            branches[i].rotation.y = Math.PI/getRandom(2,8);
        }
    }
    tree.scale.set(0.5,0.5,0.5);
    tree.position.y = 5;

    tree.castShadow = true;
    
    return tree;    
}

// Create a bunch of 4 branches
function CreateTreeBranches() {
    const bunchOfBranches = new THREE.Mesh();

    const branch = CreateTreeBranch();
    bunchOfBranches.add(branch);
    branch.position.z = 1.8;
    branch.rotation.x = Math.PI/-3;
    branch.rotation.z = Math.PI/2;
    
    const branch2 = CreateTreeBranch();
    bunchOfBranches.add(branch2);
    branch2.position.x = -1.8;
    branch2.rotation.x = Math.PI/-2;
    branch2.rotation.y = Math.PI/-5.5;
    
    const branch3 = CreateTreeBranch();
    bunchOfBranches.add(branch3);
    branch3.position.z = -1.8;
    branch3.rotation.x = Math.PI/-1.5;
    branch3.rotation.z = Math.PI/2 + Math.PI;
    
    const branch4 = CreateTreeBranch();
    bunchOfBranches.add(branch4);
    branch4.position.x = 1.8;
    branch4.rotation.x = Math.PI/2 + Math.PI;
    branch4.rotation.z = Math.PI;
    branch4.rotation.y = Math.PI/6;

    return bunchOfBranches;
}

function CreateTreeBranch() {
    // Get all of the textures
    const BRANCH_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("branch");
    const BRANCH_NORMAL_TEXTURE = TEXTURE_MANAGER.getLoadedTexture("branchNormal");
    
    // Create branch curve
    const geometry = new THREE.PlaneGeometry( 4, 4 , 2, 2 );
    // top vertices
    geometry.vertices[0] = new THREE.Vector3( -2, 1, -0.5 );
    geometry.vertices[1] = new THREE.Vector3( 0, 1, -0.5 );
    geometry.vertices[2] = new THREE.Vector3( 2, 1, -0.5 );
    
    // mid vertices
    geometry.vertices[3] = new THREE.Vector3( -3, 0, 1 );
    geometry.vertices[4] = new THREE.Vector3( -0.5, 0, 0.7 );
    geometry.vertices[5] = new THREE.Vector3( 2.5, 0, 0.8 );
        
    // bottom vertices
    geometry.vertices[6] = new THREE.Vector3( -2, -1, -0.5 );
    geometry.vertices[7] = new THREE.Vector3( 0, -1, -0.5 );
    geometry.vertices[8] = new THREE.Vector3( 2, -1, -0.5 );

    var material = new THREE.MeshPhongMaterial( {
        map: BRANCH_TEXTURE,
        shininess: 100,
        normalMap: BRANCH_NORMAL_TEXTURE
    });
    material.side = THREE.DoubleSide;
    material.transparent = true;
    
    const branch = new THREE.Mesh(geometry, material);

    branch.castShadow = true;

    return branch;
}

// support random function
function getRandom(min, max) {
    return (Math.random() * (max - min + 1) ) + min;
}

export { CreateForest };