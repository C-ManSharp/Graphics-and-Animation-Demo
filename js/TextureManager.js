"use strict";
/*
    This class allows multiple people to load textures. Provides quick, easy access to
    the loaded textures.
*/
class TextureManager
{
    //Create the texture loadeer
    textureLoader = new THREE.TextureLoader();
    //Create a map that will store a list of all textures to be loaded.
    texturesToBeLoadedMap = new Map();
    //Create a map that will hold a list of all sucessfuly loaded textures.
    loadedTexturesMap = new Map();

    constructor()
    {
    }

    /*
        This function adds a texture to the list of textures to be loaded.
        Returns true on success and false on failure.
    */
    addTextureToLoadList(nameOfTexture, fileURL)
    {
        if(typeof nameOfTexture != "string")
        {
            console.error("Texture loader error: nameOfTexture argument must be of type string");
            return false;
        }
        if(typeof fileURL != "string")
        {
            console.error("Texture loader error: fileURL argument must be of type string");
            return false;
        }
        this.texturesToBeLoadedMap.set(nameOfTexture, fileURL);
        
        return true;
    }

    /*
        Loads all the textures that are stored in the textureToBeLoadedMap variable.
        This function should be called at the start of the program.
    */
    loadTextures()
    {
        for(let [key, value] of this.texturesToBeLoadedMap)
        {
            this.loadedTexturesMap.set(key, this.loadATexture(value));
        }
    }

    /*
        Method that loads a texture from a file url.
        Returns undefined if the texture was not found.
        Returns a texture on completion of loading the texture.
    */
    loadATexture(fileURL)
    {
        if(typeof fileURL != "string")
        {
            console.error("LoadATexture argument must be of type string");
            return undefined;
        }
        return this.textureLoader.load(
            fileURL,
            undefined,
            undefined,
            function(xhr)
            {
                console.error("Error loading " + fileURL + " texture");
            }
        );
    }

    /*
        Returns a texture that has been loaded.
        Returns undefined if the texture does not exist.
    */
    getLoadedTexture(nameOfTexture)
    {
        if(typeof nameOfTexture != "string")
        {
            console.error("Texture loader error: getLoadedTexture argument must be of type string");
            return undefined;
        }

        return this.loadedTexturesMap.get(nameOfTexture);
    }
    
    /*
        Returns the number of textures that are to be loaded
    */
    getSizeOfTextureLoadMap()
    {
        return this.texturesToBeLoadedMap.size;
    }

    /*
        Returns the number of textures that have been loaded
    */
    getSizeOfLoadedTexturesMap()
    {
        return this.loadedTexturesMap.size;
    }

    /*
        Deletes a texture from the loadedTexturesMap variable. This should be used to save memory.
        Returns true if the texture was deleted.
        Returns false if the texture was not found.
    */
    deleteTextureFromList(key)
    {
        if(typeof key != "string")
        {
            console.log("Error, parameter must be a string");
            return false;
        }
        return this.loadedTexturesMap.delete(key);
    }
}
