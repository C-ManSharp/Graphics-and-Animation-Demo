"use strict";
export class FireSmoke
{
    //Store the texture
    texture = null;
    //Store the particles
    particles = [];
    iFrame = 0;
    //Parameter is the texture to be used
    constructor(texture)
    {
        //Check the type of the parameter for debugging.
        if(typeof texture != "object")
        {
            console.error("Error, FireSmoke argument 1 must be of type texture");
        }
        else
        {
            this.texture = texture;
            /*
            Set the horzontal texture wrapping. THREE.MirroredRepeatWrapping will wrap forever.
            wrapS is the U coordinate
            */
            this.texture.wrapS = THREE.MirroredRepeatWrapping;
            /*
            Set the vertical texture wrapping. THREE.MirroredRepeatWrapping will wrap forever.
            wrapT is the V coordinate
            */
            this.texture.wrapT = THREE.MirroredRepeatWrapping;
            /*
            Repeat the texture around the surface once.
            */
            this.texture.repeat.set(1, 1);
        }
        this.createSmoke()
    }
    createSmoke()
    {
        const OPACITY = 0.5;
        //Create 40 particles
        for(let i = 0; i < 40; i++)
        {
            //Random number between 0.1 and 0.15 will be the opacity.
            const RADIUS = Math.random() * (0.15 - 0.1) + 0.1;
            const SMOKE_GEOMETRY = new THREE.SphereGeometry(RADIUS, 16, 16);
            const SMOKE_MATERIAL = new THREE.MeshLambertMaterial({
                color: 0x444444,
                transparent: true,
                opacity: OPACITY,
                /*
                Prevent Z-Axis artifacts. With depthwrite set to true flickering and artefacts would occur 
                due to layering. I am saying that I don't want the fire material to affect the depth buffer.
                */
                depthWrite: false,
                map: this.texture,
                blending: THREE.AdditiveBlending
            });
            const SMOKE_MESH = new THREE.Mesh(SMOKE_GEOMETRY, SMOKE_MATERIAL);
            //Random number between 0.01 and 0.03 will be the x position.
            let xPos = Math.random() * (0.03 - 0.01) + 0.01;
            //This code will add a minus sign (-) to half of the particles so that they spread out in different directions
            SMOKE_MESH.position.x = (Math.round(Math.random()) == 1) ? xPos : -xPos;
            //Random number between 0.1 and 0.5 will be the y position.
            SMOKE_MESH.position.y = Math.random() * (0.5 - 0.1) + 0.1;
            SMOKE_MESH.position.z = 0;
            this.particles.push(SMOKE_MESH);
        }
    }
    //Returns the array that contains the particles.
    getParticles()
    {
        return this.particles;
    }
    //Change the opacity of the particles.
    updateSmokeParticlesOpacity()
    {
        for(let i = 0; i < this.particles.length; i++)
        {
            this.particles[i].material.opacity -= 0.00008;
        }
    }

    animateFireSmokeParticles()
    {
        this.iFrame++;
        let weight = 0.01;
        let acceleration = 0.5;
        let velocity = weight * acceleration;
        //Move every particle
        for(let i = 0; i < this.particles.length; i++)
        {
            this.particles[i].position.y += velocity;
            //Similar to moving an object in 3D space, the difference is that we are moving the texture around the object.
            this.particles[i].material.map.offset.y -= (velocity / 20);
            this.updateSmokeParticlesOpacity();
            //Reset the position of the particles
            if(this.particles[i].position.y >= 0.7)
            {
                this.particles[i].position.y = Math.random() * (0.5 - 0.1) + 0.1;
                this.particles[i].material.opacity = 0.5;
            }
        }
    }
}