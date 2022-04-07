"use strict";
/*
    Namespace that allows people to add textures to the list of textures to be loaded at the start 
    of the program
*/
let AddTextures = {
    addConnorsTextures: function(TEXTURE_MANAGER)
    {
        if(!TEXTURE_MANAGER.addTextureToLoadList("VolumetricSmokeTexture", "Assets/SmokeNoiseTexture.png"))
            console.error("Error adding rainDropTexture to texture load list");

        if(!TEXTURE_MANAGER.addTextureToLoadList("SmokeTexture", "Assets/smokeTexture.jpg"))
            console.error("Error, loading smoke texture.");
    
        if(!TEXTURE_MANAGER.addTextureToLoadList("FireBallTexture", "Assets/FireBallTexture.jpg"))
            console.error("Error, loading fire ball texture.");
    
        if(!TEXTURE_MANAGER.addTextureToLoadList("FireBallDisplacementMap", "Assets/FireBallDisplacementMap.png"))
            console.error("Error, loading fire ball texture.");
    },

    addPatryksTextures: function(TEXTURE_MANAGER)
    {

        // Towers textures
         // Load Stone Brick texture for the tower
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneBrickTower", "textures/StoneBrickWall.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load Stone Brick normal map texture for the tower
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneBrickTowerNormal", "textures/StoneBrickWall_normal.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load Stone Brick texture for the tower
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneBrickTowerTop", "textures/StoneBrickWall.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load Stone Brick normal map texture for the tower
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneBrickTowerTopNormal", "textures/StoneBrickWall_normal.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Walls textures
        // Load Stone Brick texture for the walls
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneBrickWall", "textures/StoneBrickWall.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load Stone Brick normal map texture for the walls
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneBrickWallNormal", "textures/StoneBrickWall_normal.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load Stone Brick texture for the walls
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneBrickWallTop", "textures/StoneBrickWall.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load Stone Brick normal map texture for the walls
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneBrickWallTopNormal", "textures/StoneBrickWall_normal.jpg"))
            console.error("Error adding Texture to the texture load list");


        // Blanks textures
        // Load Stone Brick texture for the Blank
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneBrickBlank", "textures/StoneBrickWall.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load Stone Brick normal map texture for the Blank
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneBrickBlankNormal", "textures/StoneBrickWall_normal.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Castle Walls textures
        // Load Stone Brick texture for the walls
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneCastleWall", "textures/StoneBrickWall.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load Stone Brick normal map texture for the walls
        if(!TEXTURE_MANAGER.addTextureToLoadList("stoneCastleWallNormal", "textures/StoneBrickWall_normal.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Castles roof pavement textures
        // Load Stone Brick texture for the roof pavement
        if(!TEXTURE_MANAGER.addTextureToLoadList("roofPavement", "textures/StoneBrickWall.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load Stone Brick normal map texture for the roof pavement
        if(!TEXTURE_MANAGER.addTextureToLoadList("roofPavementNormal", "textures/StoneBrickWall_normal.jpg"))
            console.error("Error adding Texture to the texture load list");



        // Torch textures
        // Load Wood texture for the Torch
        if(!TEXTURE_MANAGER.addTextureToLoadList("woodTorch", "textures/wood.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load Wood normal map texture for the Torch
        if(!TEXTURE_MANAGER.addTextureToLoadList("woodTorchNormal", "textures/wood_normal.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load rusty metal texture for the Torch
        if(!TEXTURE_MANAGER.addTextureToLoadList("metalRustyTorch", "textures/metalRusty.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load rusty metal normal map texture for the Torch
        if(!TEXTURE_MANAGER.addTextureToLoadList("metalRustyTorchNormal", "textures/metalRusty_normal.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load metal texture for the Torch
        if(!TEXTURE_MANAGER.addTextureToLoadList("metalTorch", "textures/plate.jpg"))
            console.error("Error adding Texture to the texture load list");

        // Load metal normal map texture for the torch
        if(!TEXTURE_MANAGER.addTextureToLoadList("metalTorchNormal", "textures/plate_normal.jpg"))
            console.error("Error adding Texture to the texture load list");


            
            
            
            // Gate
            // Load metal texture for the gate
            if(!TEXTURE_MANAGER.addTextureToLoadList("metalGate", "textures/metalGate.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Load metal normal map texture for the gate
            if(!TEXTURE_MANAGER.addTextureToLoadList("metalGateNormal", "textures/metalGate_normal.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            
            // Load metal texture for the gate's sides
            if(!TEXTURE_MANAGER.addTextureToLoadList("metalGateSide", "textures/plate.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Load metal normal map texture for the gate' sides
            if(!TEXTURE_MANAGER.addTextureToLoadList("metalGateSideNormal", "textures/plate_normal.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Load metal texture for the gate's top/bottom
            if(!TEXTURE_MANAGER.addTextureToLoadList("metalGateTop", "textures/plate.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Load metal normal map texture for the gate's top/bottom
            if(!TEXTURE_MANAGER.addTextureToLoadList("metalGateTopNormal", "textures/plate_normal.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            
            // Drawbridge texture
            // Load metal texture for the gate
            if(!TEXTURE_MANAGER.addTextureToLoadList("woodPlanks", "textures/woodPlanks.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Load metal normal map texture for the gate
            if(!TEXTURE_MANAGER.addTextureToLoadList("woodPlanksNormal", "textures/woodPlanks_normal.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            
            // Load metal texture for the gate's sides
            if(!TEXTURE_MANAGER.addTextureToLoadList("woodPlanksSide", "textures/woodPlanks.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Load metal normal map texture for the gate' sides
            if(!TEXTURE_MANAGER.addTextureToLoadList("woodPlanksSideNormal", "textures/woodPlanks_normal.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Load metal texture for the gate's top/bottom
            if(!TEXTURE_MANAGER.addTextureToLoadList("woodPlanksTop", "textures/woodPlanks.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Load metal normal map texture for the gate's top/bottom
            if(!TEXTURE_MANAGER.addTextureToLoadList("woodPlanksTopNormal", "textures/woodPlanks_normal.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            
            // Load grass texture for the gate's top/bottom
            if(!TEXTURE_MANAGER.addTextureToLoadList("grass", "textures/wild_grass.jpg"))
            console.error("Error adding Texture to the texture load list");
            if(!TEXTURE_MANAGER.addTextureToLoadList("grassNormal", "textures/wild_grass_normal.jpg"))
            console.error("Error adding Texture to the texture load list");

            // Load water texture
            if(!TEXTURE_MANAGER.addTextureToLoadList("water", "textures/water.jpg"))
            console.error("Error adding Texture to the texture load list");
            if(!TEXTURE_MANAGER.addTextureToLoadList("waterNormal", "textures/water_normal.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Load branch texture
            if(!TEXTURE_MANAGER.addTextureToLoadList("branch", "textures/branch.png"))
            console.error("Error adding Texture to the texture load list");
            if(!TEXTURE_MANAGER.addTextureToLoadList("branchNormal", "textures/branch.png"))
            console.error("Error adding Texture to the texture load list");
            
            // Load tree texture
            if(!TEXTURE_MANAGER.addTextureToLoadList("tree", "textures/tree.jpg"))
            console.error("Error adding Texture to the texture load list");
            if(!TEXTURE_MANAGER.addTextureToLoadList("treeNormal", "textures/tree_normal.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Load target shield texture
            if(!TEXTURE_MANAGER.addTextureToLoadList("targetShield", "textures/target.png"))
            console.error("Error adding Texture to the texture load list");
            
            // Load cannon textures
            if(!TEXTURE_MANAGER.addTextureToLoadList("wheel", "textures/wheel.png"))
            console.error("Error adding Texture to the texture load list");
            if(!TEXTURE_MANAGER.addTextureToLoadList("wheelNormal", "textures/wheel_normal.png"))
            console.error("Error adding Texture to the texture load list");

            if(!TEXTURE_MANAGER.addTextureToLoadList("metalWheel", "textures/plate.jpg"))
            console.error("Error adding Texture to the texture load list");
            if(!TEXTURE_MANAGER.addTextureToLoadList("metalWheelNormal", "textures/plate_normal.jpg"))
            console.error("Error adding Texture to the texture load list");

            if(!TEXTURE_MANAGER.addTextureToLoadList("metalCannon", "textures/plate.jpg"))
            console.error("Error adding Texture to the texture load list");
            if(!TEXTURE_MANAGER.addTextureToLoadList("metalCannonNormal", "textures/plate_normal.jpg"))
            console.error("Error adding Texture to the texture load list");
            
            // Cannonball
            // Load metal texture for the cannonbal
            if(!TEXTURE_MANAGER.addTextureToLoadList("metalCannonball", "textures/plate.jpg"))
                console.error("Error adding Texture to the texture load list");
    
            // Load metal normal map texture for the cannonball
            if(!TEXTURE_MANAGER.addTextureToLoadList("metalCannonballNormal", "textures/plate_normal.jpg"))
                console.error("Error adding Texture to the texture load list");
            
        },
        
        addLiamsTextures: function(TEXTURE_MANAGER)
        {
            
        }        
}
