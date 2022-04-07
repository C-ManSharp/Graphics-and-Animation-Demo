"use strict";
export class Fire
{
    //Store the fire texture.
    fireTexture = null;
    //Store the displacement map
    displacementMap = null;
    //Store the fire particle in an array.
    fireParticle = [];
    iFrame = 0;
    /*
    Parameters are the texture and the displacement map to be used.
    */
    constructor(texture, displacementMap)
    {
        //Check the type of the object for debugging
        if(typeof texture != "object")
        {
            console.error("Fire argument 1 must be a texture.");
        }
        else
        {
            //Set the fire texture variable
            this.fireTexture = texture;
            /*
            Set the horzontal texture wrapping. THREE.MirroredRepeatWrapping will wrap forever.
            wrapS is the U coordinate
            */
            this.fireTexture.wrapS = THREE.MirroredRepeatWrapping;
            /*
            Set the vertical texture wrapping. THREE.MirroredRepeatWrapping will wrap forever.
            wrapT is the V coordinate
            */
            this.fireTexture.wrapT = THREE.MirroredRepeatWrapping;
            /*
            Repeat the texture around the surface twice as it helps remove seams.
            A seam is a line that can occure when a texture is wrapped around an object.
            For example, when you wrap presents for someone the rapping paper produces a seam or gap because it is being
            wrapped around an object. You close this gap with tape.
            */
            this.fireTexture.repeat.set(2, 2);
        }

        if(typeof displacementMap != "object")
        {
            console.error("Fire argument 2 must be displacement map.");
        }
        else
        {
            /*
            A displacement map changes the geometry position of the mesh. This uses a black and white image.
            White points in a displicment map are the heighst point in the geometry and black points are the lowest.
            */
            this.displacementMap = displacementMap;
            /*
            Set the horzontal texture wrapping. THREE.MirroredRepeatWrapping will rap forever.
            wrapS is the U coordinate
            */
            this.displacementMap.wrapS = THREE.MirroredRepeatWrapping;
            /*
            Set the vertical texture wrapping. THREE.MirroredRepeatWrapping will rap forever.
            wrapT is the V coordinate
            */
            this.displacementMap.wrapT = THREE.MirroredRepeatWrapping;
            //Repeat the texture around the surface once.
            this.displacementMap.repeat.set(1, 1);
        }
        this.createFireParticle();
    }
    //Creates the fire particle and adds it to the array.
    createFireParticle()
    {
        const FIRE_MATERIAL = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 1,
            map: this.fireTexture,
            /*
            THREE.AdditiveBlending blends the image over the top of the scene while preserving some 
            the the scene colour. Without additive blending the pixle colour of the texture 
            would overwrite the scene colour. It would look like a block image instead of
            blending into the scene naturally.
            */
            blending: THREE.AdditiveBlending,
            /*
            Prevent Z-Axis artifacts. With depthwrite set to true flickering and artefacts would occur 
            due to layering. I am saying that I don't want the fire material to affect the depth buffer.
            */
            depthWrite: false,
            displacementMap: this.displacementMap,
            //Reduce the effect of the displacment map.
            displacementScale: 0.2,
            emissive: 0xF5680A,
            emissiveIntensity: 0.5,
            side: THREE.DoubleSide
        });

        const FIRE_GEOM = new THREE.SphereBufferGeometry(0.01, 32, 32, 0, 6.3, 0, 1);
        const FIRE_MESH = new THREE.Mesh(FIRE_GEOM, FIRE_MATERIAL);
        FIRE_MESH.position.x = 0;
        FIRE_MESH.position.y = 0.17;
        FIRE_MESH.position.z = 0.18;
        FIRE_MESH.rotation.x = Math.PI/4;

        this.fireParticle.push(FIRE_MESH);
    }

    animateFireParticle()
    {
        let weight = 0.01;
        let acceleration = 1.2;
        let velocity = weight * acceleration;
        let time = velocity * this.iFrame;
        //Reset the animation when it's finished
        if(time > 1)
        {
            time = 0;
            this.iFrame = 0;
        }
        //Similar to moving an object in 3D space, the difference is that we are moving the texture around the object.
        this.fireParticle[0].material.map.offset.y -= (velocity / 5);
        this.iFrame++;
    }
    //Returns the fire particle.
    getFireParticle()
    {
        return this.fireParticle[0];
    }
}