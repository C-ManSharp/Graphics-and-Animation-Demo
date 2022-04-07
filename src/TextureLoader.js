"use strict";
//Create the texture manager
console.log("Creating texture manager");
const TEXTURE_MANAGER = new TextureManager();
console.log("Texture manager created");

//Add everyone's textures to the texturesToBeLoadedMap.
AddTextures.addConnorsTextures(TEXTURE_MANAGER);
AddTextures.addPatryksTextures(TEXTURE_MANAGER);

//A flag that will be toggled once all of the textures have been loaded.
let allTexturesHaveBeenLoaded = false;

//Start loading the textures
TEXTURE_MANAGER.loadTextures();

//This while loop prevents the program from running until all textures have been loaded.
while(TEXTURE_MANAGER.getSizeOfTextureLoadMap() < TEXTURE_MANAGER.getSizeOfLoadedTexturesMap())
{
    //When all textures have been loaded set the allTexturesHaveBeenLoaded variable to true
    if(TEXTURE_MANAGER.getSizeOfTextureLoadMap() === TEXTURE_MANAGER.getSizeOfLoadedTexturesMap())
        allTexturesHaveBeenLoaded = true;
}

/*
If there are no textures to be loaded the allTexturesHaveBeenLoaded will never be set to true. This if statement guards
against that.
*/
if(TEXTURE_MANAGER.getSizeOfTextureLoadMap() === TEXTURE_MANAGER.getSizeOfLoadedTexturesMap())
        allTexturesHaveBeenLoaded = true;