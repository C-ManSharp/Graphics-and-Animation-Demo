"use strict";
export class BloodParticles
{
    //Object to spawn the particles on
    objectToAddBloodTo = null;
    //Array to store all the particles
    particles = [];
    //Arrays to store the x, y and z velocities
    xForceVelocity = [];
    yForceVelocity = [];
    zForceVelocity = [];
    iFrame = 0;
    //Flag to tell us if the animation is finished.
    animationFinished = false;
    /*
    Parameter is the object that the blood particles spawn onto
    */
    constructor(objectToAddBloodTo)
    {
        this.objectToAddBloodTo = objectToAddBloodTo;
        this.createParticles();
        this.addParticlesToScene();
        this.calcXForceVelocity();
        this.calcYForceVelocity();
        this.calcZForceVelocity();
    }
    /*
    Creates all the particles and adds them to the array.
    */
    createParticles()
    {
        const GEOMETRY = new THREE.SphereBufferGeometry(0.1, 16, 16);
        const MATERIAL = new THREE.MeshBasicMaterial({color: 0xAA0000});
        for(let i = 0; i < 60; i++)
        {
            const MESH = new THREE.Mesh(GEOMETRY, MATERIAL);
            MESH.position.x = 0;
            MESH.position.y = 0;
            MESH.position.z = 0;
            this.particles.push(MESH);
        }
    }

    calcXForceVelocity()
    {
        for(let i = 0; i < this.particles.length; i++)
        //Generate random number from between 0.5 and 0.3. Push the number onto an array.
            this.xForceVelocity.push(Math.random() * (0.5 + 0.3) - 0.3);
    }

    calcYForceVelocity()
    {
        for(let i = 0; i < this.particles.length; i++)
        //Generate random number from between 2 and 1. Push the number onto an array.
            this.yForceVelocity.push(Math.random() * (2 + 1) - 1);
    }

    calcZForceVelocity()
    {
        for(let i = 0; i < this.particles.length; i++)
        //Generate random number from between 0.5 and 0.3. Push the number onto an array.
            this.zForceVelocity.push(Math.random() * (0.5 + 0.3) - 0.3);
    }

    addParticlesToScene()
    {
        for(let i = 0; i < this.particles.length; i++)
        //Add the blood particles to the object passed in via the constructor.
            this.objectToAddBloodTo.add(this.particles[i]);
    }

    animateBlood()
    {
        this.iFrame++;
        //When the iFrame count is >= 120 then the animation is finished.
        if(this.iFrame >= 120)
        {
            //Change the UI
            document.getElementById("dummyHitNotification").innerHTML = "";
            this.iFrame = 0;
            //Cleanup, remove the particles from the scene, delete material and geometry.
            for(let i = 0; i < this.particles.length; i++)
            {
                this.objectToAddBloodTo.remove(this.particles[i]);
                this.particles[i].material.dispose();
                this.particles[i].geometry.dispose();
            }
            //Set the flag
            this.animationFinished = true;
        }
        //If the animation is not finished.
        else
        {
            //Move the particles
            for(let i = 0; i < this.particles.length; i++)
            {
                this.particles[i].position.y += (this.yForceVelocity[i]);
                //Every other particle apply a negative force to make the particles move in all directions appart from -y
                if(i % 2 === 0)
                {
                    this.particles[i].position.x += (this.xForceVelocity[i]);
                    this.particles[i].position.z += (this.zForceVelocity[i]);
                }
                else
                {
                    this.particles[i].position.x -= (this.xForceVelocity[i]);
                    this.particles[i].position.z -= (this.zForceVelocity[i]);
                }
            }
        }
    }
}