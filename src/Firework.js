"use strict";
export class Firework
{
    //Store the position in 3D space where the fireworks will spawn
    spawnPoint = new THREE.Vector3(-15, 20, -12);
    //Store the scene so that the fireworks can be added to it.
    scene = null;
    //Number of fireworks to be spawned
    numberOfParticles = 12;
    //Texture for the smoke effect.
    smokeTexture = null;
    //Store all the firework particles
    fireworkParticles = [];
    //Store the animation paths for the fireworks
    particleAnimationPaths = [];
    iFrame = 0;
    //Store all the smoke particles
    smokeParticles = [];
    //Store the age of the smoke particles
    //smokeParticlesAge = [];
    //Parameters are the scene that the fireworks will be added to and the texture for the smoke effect.
    constructor(scene, smokeTexture)
    {
        //Check the type of the argument for debugging purposes
        if(typeof smokeTexture != "object")
        {
            console.error("FireWork argument 2 must be a texture.");
        }
        else
        {
            this.smokeTexture = smokeTexture;
            /*
            Set the horzontal texture wrapping. THREE.MirroredRepeatWrapping will wrap forever.
            wrapS is the U coordinate
            */
            this.smokeTexture.wrapS = THREE.MirroredRepeatWrapping;
             /*
            Set the vertical texture wrapping. THREE.MirroredRepeatWrapping will wrap forever.
            wrapT is the V coordinate
            */
            this.smokeTexture.wrapT = THREE.MirroredRepeatWrapping;
            //Repeat the texture around the surface once.
            this.smokeTexture.repeat.set(1, 1);
        }
        
        if(typeof scene != "object")
        {
            console.error("Firework argument must be of type THREE.Scene");
        }
        else
        {
            this.scene = scene;
        }
      
        this.createFireWorkParticles();
        this.createAnimationPaths();
    }
    //Creates the firework particles and adds them to the array.
    createFireWorkParticles()
    {
        const GEOMETRY = new THREE.SphereGeometry(0.1, 32, 32);
        const MATERIAL = new THREE.MeshPhongMaterial({
            color: 0xFF0000,
            opacity: 1,
            transparent: true,
            emissive: 0xFF0000,
            emissiveIntensity: 1,
        });
        const POINT_LIGHT = new THREE.PointLight(0x990000, 1, 100);
        for(let i = 0; i < this.numberOfParticles; i++)
        {
            const MESH = new THREE.Mesh(GEOMETRY, MATERIAL);
            MESH.add(POINT_LIGHT);
            MESH.position.set(this.spawnPoint.x, this.spawnPoint.y, this.spawnPoint.z);
            this.fireworkParticles.push(MESH);
            this.scene.add(this.fireworkParticles[i]);
        }
    }
    //Spawn the smoke. Parameters are the initial x, y, z positions
    spawnSmoke(xPos, yPos, zPos)
    {
        const OPACITY = 0.6;
        //Random radius between 0.05 and 1.
        const RADIUS = Math.random() * (0.1 + 0.05) + 0.05;
        const SMOKE_GEOMETRY = new THREE.SphereGeometry(RADIUS, 16, 16);
        const SMOKE_MATERIAL = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: OPACITY,
            /*
            Prevent Z-Axis artifacts. With depthwrite set to true flickering and artefacts would occur 
            due to layering. I am saying that I don't want the fire material to affect the depth buffer.
            */
            depthWrite: false,
            map: this.smokeTexture,
            /*
            THREE.AdditiveBlending blends the image over the top of the scene while preserving some 
            the the scene colour. Without additive blending the pixle colour of the texture 
            would overwrite the scene colour. It would look like a block image instead of
            blending into the scene naturally.
            */
            blending: THREE.AdditiveBlending
        });
        const SMOKE_MESH = new THREE.Mesh(SMOKE_GEOMETRY, SMOKE_MATERIAL);
        SMOKE_MESH.position.x = xPos;
        SMOKE_MESH.position.y = yPos;
        SMOKE_MESH.position.z = zPos;
        this.smokeParticles.push(SMOKE_MESH);
        //this.smokeParticlesAge.push(0);
        this.scene.add(this.smokeParticles[this.smokeParticles.length-1]);
    }

    updateSmokeParticlesOpacity()
    {
        for(let i = 0; i < this.smokeParticles.length; i++)
        {
            this.smokeParticles[i].material.opacity -= 0.0005;
        }
    }

    /*
    Moves the firework particles. This animation is divorced from the main animation loop. 
    It keeps track of its own timing
    */
    animateFireWorks()
    {
        this.iFrame++;
        let weight = 0.01;
        let acceleration = 1.2;
        let velocity = weight * acceleration;
        let time = velocity * this.iFrame;

        //At the start of the animation
        if(this.iFrame === 1)
        {
            //Reset the opacity of every firework particle to 1
            for(let i = 0; i < this.fireworkParticles.length; i++)
            {
                this.fireworkParticles[i].material.opacity = 1;
            }
        }
        //When the time is < 1 I want to use the animation paths to control the fireworks
        if(time < 1)
        {
            //Move each particle individually
            for(let i = 0; i < this.fireworkParticles.length; i++)
            {
                let point = this.particleAnimationPaths[i].getPoint(time);
                this.fireworkParticles[i].position.set(point.x, point.y, point.z);
                //Spawn smoke trail for each firework particle every other frame.
                if(this.iFrame % 2 === 0)
                {
                    this.spawnSmoke(point.x, point.y, point.z);
                    this.updateSmokeParticlesOpacity();
                }
            }
        }
        //When time is >= 1 and < 4 I want to control the firework using Newton's second law of motion.
        if(time >= 1 && time < 4)
        {
            //Move each particle individually
            for(let i = 0; i < this.fireworkParticles.length; i++)
            {
                this.fireworkParticles[i].position.y -= velocity;
                this.fireworkParticles[i].material.opacity -= velocity / 40;
                if(this.iFrame % 2 === 0)
                {
                    this.spawnSmoke
                    (
                        this.fireworkParticles[i].position.x, 
                        this.fireworkParticles[i].position.y, 
                        this.fireworkParticles[i].position.z
                    );
                    this.updateSmokeParticlesOpacity();
                }
            }
        }
        
        for(let i = 0; i < this.smokeParticles.length; i++)
        {
            //Use the opacity to control the time of death of the smoke particles
            if(this.smokeParticles[i].material.opacity <= 0)
            {
                this.scene.remove(this.smokeParticles[i]);
                this.smokeParticles[i].material.dispose();
                this.smokeParticles[i].geometry.dispose();
                this.smokeParticles.splice(i, 1);
            }
        }
         //Reset the animation when it's finished
         if(time >= 4)
         {
             this.iFrame = 0;
         }
        
    }

    createAnimationPaths()
    {
        //Use radians to spawn the particles in a circle shape.
        const RADIANS = [
            2 * Math.PI,
            Math.PI / 6,
            2 * Math.PI / 6,
            3 * Math.PI / 6,
            4* Math.PI / 6,
            5 * Math.PI / 6,
            Math.PI,
            7 * Math.PI / 6,
            8 * Math.PI / 6,
            9 * Math.PI / 6,
            10 * Math.PI / 6,
            11 * Math.PI / 6
        ];
        
        //Create an animation path for each of the firework particles
        for(let i = 0; i < this.fireworkParticles.length; i++)
        {
            let cubicBezierCurveStartPoint = new THREE.Vector3(0, 0, 0);
            let controlPoint1 = new THREE.Vector3(0, 0, 0);
            let controlPoint2 = new THREE.Vector3(0, 0, 0);
            let endVector = new THREE.Vector3(0, 0, 0);

            //Make the start point the same as the particle(s) spawn point
            cubicBezierCurveStartPoint.x = this.spawnPoint.x;
            cubicBezierCurveStartPoint.y = this.spawnPoint.y;
            cubicBezierCurveStartPoint.z = this.spawnPoint.z;
            
            //Use the cos and sin functions to get x and y coordinates from the radians
            controlPoint1.x = this.spawnPoint.x + Math.cos(RADIANS[i]) * 5;
            controlPoint1.y = this.spawnPoint.y + Math.sin(RADIANS[i]);
            controlPoint1.z = this.spawnPoint.z;
            
            //Control point 2 will be used to add height to the animation path
            controlPoint2.x = controlPoint1.x;
            controlPoint2.y = controlPoint1.y - 2;
            controlPoint2.z = controlPoint1.z;

            //No need to change the end vector so set it to the same as control point 2
            endVector.x = controlPoint2.x;
            endVector.y = controlPoint2.y;
            endVector.z = controlPoint2.z;
            
            //Use the cubic curve to create the animation path.
            const CURVE = new THREE.CubicBezierCurve3(
                cubicBezierCurveStartPoint,
                controlPoint1,
                controlPoint2,
                endVector
            );
            //Add the paths to an array so that they can manipulated later if necessary.
            this.particleAnimationPaths.push(CURVE);
        }
    }

    //For debugging. Creates visualisation of the animation path.
    addDebugAnimationLineCurves()
    {
        for(let i = 0; i < this.particleAnimationPaths.length; i++)
        {
            const POINTS = this.particleAnimationPaths[i].getPoints( 50 );
            const GEOMETRY = new THREE.Geometry().setFromPoints( POINTS );
            const MATERIAL = new THREE.LineBasicMaterial( { color : 0xff0000 } );

            // Create the final object to add to the scene
            const CURVE_OBJ = new THREE.Line( GEOMETRY, MATERIAL );
            this.scene.add(CURVE_OBJ);
        }
    }
}