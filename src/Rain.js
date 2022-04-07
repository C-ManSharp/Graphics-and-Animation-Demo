"use strict";
export class Rain
{
    //Number of droplets to be spawned
    numberOfDroplets = 1000;
    //Array to hold all the droplets
    rainDroplets = [];
    //Array to hold the force to be applied to each rain droplet
    rainDropletsForce = [];
    //A flag that keeps track of whether the rain is toggled on or off.
    isRaining = true;
    scene = null;
    //Opacity of each rain droplet
    rainDropletsOpacity = [];

    constructor(scene)
    {
        //Check the type of the parameter
        if(typeof scene === "object")
        {
            this.scene = scene;
            if(this.isRaining)
                this.createDroplets();
        }
        else
        {
            console.error("setScene argument is the incorrect type.");
        }
    }

    /*
    This function allows the rain to be toggled on or off. The parameter determins this.
    */
    setIsRaining(isRaining)
    {
        /*
        Check the type of the parameter and make sure that the isRaining flag in the class isn't the same as the
        parameter.
        */
        if(typeof isRaining === "boolean" && this.isRaining != isRaining)
        {
            
            this.isRaining = isRaining;
            //If the rain has been switched on. 
            if(this.isRaining)
            {
                //Add the rain droplets to the scene.
                for(let i = 0; i < this.numberOfDroplets; i++ )
                {
                    this.scene.add(this.rainDroplets[i]);
                    //Add the motion blur 
                    for(let j = 0; j < this.rainDroplets[i].children.size; j++)
                    {
                        this.scene.add(this.rainDroplets[i].children[j]);
                    }
                }
            }
            //If the rain has been switched off
            else
            {
                //Remove all rain droplets and motion blur effects from the scene.
                for(let i = 0; i < this.numberOfDroplets; i++ )
                {
                    for(let j = 0; j < this.rainDroplets[i].children.size; j++)
                    {
                        this.scene.remove(this.rainDroplets[i].children[j]);
                    }
                    this.scene.remove(this.rainDroplets[i]);
                }
            }
        }
        else
        {
            console.error("The setIsRaining function didn't do anything. The argument must be of type bool." +
            " The argument must have a different value than the current property.");
        }
    }
    /*
        Returns true if it is raining.
        Returns false if it is not.
    */
    getIsRaining()
    {
        return this.isRaining;
    }
    /*
        Create each individual droplet.
    */
    createDroplets()
    {
        const CYLINDER_GEOMETRY = new THREE.CylinderBufferGeometry(0.005, 0.03, 0.2, 18);
        const CYLINDER_MATERIAL= new THREE.MeshPhongMaterial
        ({
            color: 0xffffff,
            transparent: true
        });
        //Create rain droplets
        for(let i = 0; i < this.numberOfDroplets; i++)
        {
            const OPACITY = Math.random() / 2;
            this.rainDropletsOpacity.push(OPACITY);
            CYLINDER_MATERIAL.opacity = OPACITY;
           
            const RAIN_DROPLET = new THREE.Mesh(CYLINDER_GEOMETRY, CYLINDER_MATERIAL);
            const RANDOM_X_POS = Math.random() * 400 - 200;
            //Generate a random number from between 30 and 40
            const RANDOM_Y_POS = Math.random() * (40 - 30) + 30;
            const RANDOM_Z_POS = Math.random() * 400 - 200;

            RAIN_DROPLET.position.x = RANDOM_X_POS;
            RAIN_DROPLET.position.y = RANDOM_Y_POS;
            RAIN_DROPLET.position.z = RANDOM_Z_POS;
            
            //Create motion blur effect
            for(let j = 1; j < 6; j++)
            {
                const MOTION_BLUR_OPACITY = OPACITY / j;
                const CYLINDER_MATERIAL = new THREE.MeshPhongMaterial
                ({
                    color: 0xffffff,
                    transparent: true,
                    opacity: MOTION_BLUR_OPACITY
                });
                const CYLINDER_MESH = new THREE.Mesh(CYLINDER_GEOMETRY, CYLINDER_MATERIAL);
                CYLINDER_MESH.position.y = j * 0.02;
                RAIN_DROPLET.add(CYLINDER_MESH);
            }
            
            this.rainDroplets.push(RAIN_DROPLET);
            this.scene.add(this.rainDroplets[i]);
        }
        //Calulate the force of each droplet at this stage to prevent slowdowns when the rain is falling.
        this.calculateDropletForce();
    }

    //  Use Isaac Neton's second law of motion to calculate the force of each rain drop.
    calculateDropletForce()
    {
        let rainDropletMass, rainDropletAcceleration, rainDropletForce = 0;
        for(let i = 0; i < this.numberOfDroplets; i++)
        {
            //Generate random numbers between 1 and 1.5
            rainDropletMass = Math.random() * (1.5 - 1) + 1;
            rainDropletAcceleration = Math.random() * (1.5 - 1) + 1;

            rainDropletForce = rainDropletMass * rainDropletAcceleration;
            this.rainDropletsForce.push(rainDropletForce);
        }
    }

    /*
        This function makes the rain fall
    */
    moveRainDroplets()
    {
        //Make sure that it isn't raining
        if(this.isRaining === false)
        {
            console.warn("isRaining is set to false. Set isRaining to true to produce rain.");
        }
        else
        {

            for(let i = 0; i < this.rainDroplets.length; i++)
            {
                this.rainDroplets[i].position.y -= this.rainDropletsForce[i];
                //Reset the droplet position when the droplet falls to the ground.
                if(this.rainDroplets[i].position.y <= -4)
                    //Generate number between 30 and 40
                    this.rainDroplets[i].position.y = Math.random() * (40-30) + 30;
            }
        }
    }
}