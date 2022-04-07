import { Fire } from './Fire.js';
import { Rain } from './Rain.js';
import { Firework } from './Firework.js';
import { DrawBridgeAnimation } from './DrawBridgeAnimation.js';
import { CreateDrawbridge } from './world/models/drawBridge.js';
import { CreateLever } from './world/models/lever.js';
import { CreateTorch } from './world/models/torch.js';
import { CreateCannonball } from './world/models/cannonBall.js';
import { CreateWorld } from './world/world.js';
import { AddLights } from './world/lighting.js';
import { FireSmoke } from './FireSmoke.js';
import { BloodParticles } from './BloodParticles.js';
import { CreateDummy } from './world/models/dummy.js';
// Declare SCENE
var SCENE = new THREE.Scene();

// Declaring camera
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 ); // Perspective projection parameters
camera.position.x = -50;
camera.position.y = 30;
camera.position.z = 50;
camera.lookAt(-40,0, 0);

// Declaring renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Size of the 2D projection
document.body.appendChild(renderer.domElement); // Connecting to the canvas

console.log ("Create the raycaster");
const RAYCASTER = new THREE.Raycaster();
console.log ("Done");

let mouse = new THREE.Vector2(-10000,-10000);

// Orbit controller
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = false;
controls.dampingFactor = 0.01;
controls.screenSpacePanning = false;
controls.enableKeys = true;
controls.keys = {
	LEFT: 37, //left arrow
	UP: 38, // up arrow
	RIGHT: 39, // right arrow
	BOTTOM: 40 // down arrow
}

// Drawbridge needs to be declared before animation
const drawbridge = CreateDrawbridge();
SCENE.add(drawbridge);
drawbridge.position.z = 10;

//Connor's particles declarations
const DRAWBRIDGE_ANIMATION = new DrawBridgeAnimation(drawbridge);
//Create the variable to store the dummy that can be clicked on.
let interactiveDummy = null;
//Keep track of how many times it has been hit.
let dummyHitCount = 0;
//Store the fires that are on the torches
let fires = [];
//Store the smoke particles that emit from the fire on the torches.
let fireSmokeParticles = [];
for(let i = 0; i < 6; i++)
{
    fires.push(new Fire(
        TEXTURE_MANAGER.getLoadedTexture("FireBallTexture"), 
        TEXTURE_MANAGER.getLoadedTexture("FireBallDisplacementMap")
        ));
    fireSmokeParticles.push(new FireSmoke(
        TEXTURE_MANAGER.getLoadedTexture("VolumetricSmokeTexture")
    ));
    //Add the smoke objects to the fire objects.
    for(let k = 0; k < 40; k++)
    {
        fires[i].getFireParticle().add(fireSmokeParticles[i].getParticles()[k]);
    }
}
//Create the rain passing in the scene.
const RAIN = new Rain(SCENE);
//Create the fireworks passing in the scene and texture.
const FIREWORK = new Firework(SCENE, TEXTURE_MANAGER.getLoadedTexture("SmokeTexture"));
//Store the blood particles
let bloodParticlesArray = [];

//Double check to make sure that the textures have been loaded.
if(allTexturesHaveBeenLoaded)
{
    CreateAllWorldElements();
}
else
{
    console.error("There was a problem with loading the textures");
}

/////////////////////////////////////////////////////////////////////////////////
/// Liam's code//////////////////////////////////////////////////////////////////

//Creates physics in the world 
console.log("Set physics");
var world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // earth = -9.82 m/s
world.broadphase = new CANNON.NaiveBroadphase();
world.broadphase.useBoundingBoxes = true;
var solver = new CANNON.GSSolver();
world.allowSleep = true; // let resting bricks sleep
solver.iterations = 7;
solver.tolerance = 0.1;
world.solver = solver;
world.quatNormalizeSkip = 0;
world.quatNormalizeFast = false;
world.defaultContactMaterial.contactEquationStiffness = 5e6;
world.defaultContactMaterial.contactEquationRelaxation = 3;

console.log("Done");

//Gets a refrence to the cannon object from cannon.js
var cannon = SCENE.getObjectByName( "Cannon" );

//Array of cannon body physics
var cannonBodies = [];

//Cannon Body variables
var mass = 5, radius = 0.25, f=10000;
var dt = 1/60, damping = 0.5;

//Function to create the Cannon body physics
function CreateSphereBody()
{
    console.log("Create body");
    var sphereShape = new CANNON.Sphere(radius);    // Step 1
    var sphereBody = new CANNON.Body({mass: mass}); // Step 2
    sphereBody.addShape(sphereShape);               // Step 3
    sphereBody.linearDamping = sphereBody.angularDamping = damping;
	sphereBody.position.set(35.5,1,-45);
    cannonBodies.push (sphereBody);
    world.add(sphereBody);
	return sphereBody;
}

//To store the cannonBall meshes
var cannonBalls = [];

//Bool to stop constant shooting
var reloaded = true;


//Makes reloaded true to allow the weapon to shoot again
function Reload()
{
	reloaded = true;
}

//Makes reloaded true to allow the weapon to shoot again
function DestroyCannonball()
{
	SCENE.remove(cannonBalls[0]); //Removes the cannonball mesh from the scene.
	SCENE.remove(cannonBodies[0]); //Removes the cannonbody mesh from the scene.
	cannonBalls.splice(0, 1); //Removes a cannonBall at index 0 and resizes the array.
	cannonBodies.splice(0, 1); //Removes a cannonBody at index 0 and resizes the array.
}

//////////////////////////////////////////////////////////////////////////////////



// Create lights to make an imitation of fire
var fire_1 = new THREE.PointLight(0xd18400);
fire_1.position.set(20, 1, -50);
SCENE.add(fire_1);
    
var fire_2 = new THREE.PointLight(0xd18400);
fire_2.position.set(-20, 1, -5);
SCENE.add(fire_2);

// Set shadows in the SCENE
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

var iFrame = 0;
var currentIntensity = 0;
var nextIntesity = 1;
var isSmaller = false;

//When either of these flags are set to true the corresponding animation will be played in the animate function.
let callDrawbridgeOpenAnimation = false;
let callDrawbridgeCloseAnimation = false;

//Add event listeners
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("click", onClick, false);

function onKeyDown(e)
{
    if(e.code === "KeyR")
    {
        //Set the is raining flag.
        RAIN.setIsRaining(!RAIN.getIsRaining());
        //Change the UI
        if(RAIN.getIsRaining() === true)
            document.getElementById("rainStatusData").innerHTML = "Is raining";
        else
            document.getElementById("rainStatusData").innerHTML = "Is not raining";
    }
    else if(e.code === "KeyF")
    {
        triggerDrawbridgeAnimation();
    }

    if (e.code == "KeyX")
	{
		if ( reloaded == true) //Only allows the gun to load after it has "reloaded"
		{
			reloaded = false; 
			var sphereBody = CreateSphereBody(); //Calls the function to create a sphereBody
            var cannonBall = CreateCannonball();//Creates a mesh for the cannonball from the cannonball asset
			cannonBall.castShadow = true; // Adds a shadow to the mesh
			cannonBalls.push(cannonBall); //Adds the mesh to an array
			SCENE.add(cannonBall); //Adds the cannonBall to the Scene
			var impulse = new CANNON.Vec3(-50, f*dt, f*dt); //variable used for the impulse physics
			var cannonBallPos = sphereBody.position; //Sets the physics position to the mesh position
			sphereBody.applyImpulse(impulse, cannonBallPos); //Adds impulse to the cannon to launch the cannonball 
			setTimeout(Reload, 3000); //Creates a 3 second wait to "reload" the cannon
			setTimeout(DestroyCannonball, 30000) //Creates a 30 second wait then deletes the oldest cannonball
		}
		else 
		{
			console.log("Reloading");
		}
	}
}
//This function triggers the drawbridge animation based on various flags.
function triggerDrawbridgeAnimation()
{
    //Make sure that the drawbridge isn't in the middle of opening or closing.
    if(DRAWBRIDGE_ANIMATION.getDrawbridgeIsClosing() == false || DRAWBRIDGE_ANIMATION.getDrawbridgeIsOpening() == false)
    {
        //If the drawbrige is closed
        if(DRAWBRIDGE_ANIMATION.getDrawBridgeIsClosed())
        {
            //Set flags so that the animate function knows what drawbridge animation function to call.
            callDrawbridgeOpenAnimation = true;
            callDrawbridgeCloseAnimation = false;
        }
        //If drawbridge is not closed / is open.
        else if(!DRAWBRIDGE_ANIMATION.getDrawBridgeIsClosed())
        {
            //Set flags so that the animate function knows what drawbridge animation function to call.
            callDrawbridgeOpenAnimation = false;
            callDrawbridgeCloseAnimation = true;
        }
    }
    else
    {
        //If nothing is happening then set both flags to false.
        callDrawbridgeOpenAnimation = false;
        callDrawbridgeCloseAnimation = false;
    }
}

function onClick(event)
{
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    RAYCASTER.setFromCamera(mouse, camera);
    let intersects = RAYCASTER.intersectObjects(SCENE.children);
    //Check if anything was clicked. If nothing was clicked then we don't need to iterate through intersects.
    if(intersects.length > 0)
    {
        for(let i = 0; i < intersects.length; i++)
        {
            //If the lever box is clicked
            if(intersects[i].object.name === "leverBox")
            {
                //Animate the drawbridge
                triggerDrawbridgeAnimation();
            }
            //If the interactive dummy is clicked.
            else if(intersects[i].object.name === "interactiveDummy")
            {
                //Add a new object to the array.
                bloodParticlesArray.push( new BloodParticles(
                    interactiveDummy
                    ));
                //Increment the dummy hit count
                dummyHitCount += 1;
                //Update the UI
                document.getElementById("dummyHitCountData").innerHTML = dummyHitCount;
                document.getElementById("dummyHitNotification").innerHTML = "Dummy hit!";
            }
        }
    }
}

var clock = new THREE.Clock(); //Creates a clock for time
var delta = 0;
var timeStep = 1.0 / 60.0;   // seconds

function animate() 
{
    requestAnimationFrame(animate);

    iFrame++;    

    controls.update();
    //For every fire
    for(let i = 0; i < fires.length; i++)
    {
        //Aniamte the fire particles on the torches.
        fires[i].animateFireParticle();
        //Animate the smoke.
        fireSmokeParticles[i].animateFireSmokeParticles();
    }

    FIREWORK.animateFireWorks();
    //If it is raining
    if(RAIN.getIsRaining())
    //Move the droplets
        RAIN.moveRainDroplets();
    //Check if the open drawbridge animation function needs to be called.
    if(callDrawbridgeOpenAnimation)
    {
        //Open the drawbridge
        if(DRAWBRIDGE_ANIMATION.getDrawBridgeIsClosed())
            DRAWBRIDGE_ANIMATION.openDrawbridgeAnimation();
    }
    //Check if the close drawbridge animation function needs to be called.
    else if(callDrawbridgeCloseAnimation)
    {
        //Close the drawbridge
        if(!DRAWBRIDGE_ANIMATION.getDrawBridgeIsClosed())
            DRAWBRIDGE_ANIMATION.closeDrawbridgeAnimation();
    }
    //For every blood particle object
    for(let i = 0; i < bloodParticlesArray.length; i++)
    {
        //Animate the blood particles
        if(!bloodParticlesArray[i].animationFinished)
            bloodParticlesArray[i].animateBlood();
        else
        //Remove the object from the array if the animation is complete.
            bloodParticlesArray.splice(i, 1);
    }
    	///////////////////////////////////////////////
	/////////////////Liam's code//////////////////
	delta = clock.getDelta();
   
    world.step(timeStep);

    if (cannonBalls.length > 0)
    {
        for (var i = 0; i < cannonBalls.length; i++) //Sets the position of each mesh to the position the physics body
        {		   
			cannonBalls[i].position.x = cannonBodies[i].position.x; 
			cannonBalls[i].position.z = cannonBodies[i].position.z; 
            cannonBalls[i].position.y = cannonBodies[i].position.y; 
        }
    }
	
	//////////////////////////////////////////////
    
    // Fire light imitation
    fire_1.intensity = FireLightImmitation()*2;
    fire_2.intensity = FireLightImmitation()*2;

    renderer.render(SCENE, camera);
}
animate();

///////////////////////////////////////////////////////////////////////////////////////
// EXTRA ENVIRONMENT FUNCTIONS

// At least add all of the elements including those which cannot be added seperately 
function CreateAllWorldElements() {
    CreateSkybox();
    CreateFog();
    SCENE.add(CreateWorld());
    AddTorches();
    // Add lights to the scene
    SCENE.add(AddLights());

    const lever = CreateLever();
    SCENE.add(lever);
    lever.position.z = 5;
    lever.position.x = 2;

    interactiveDummy = CreateDummy();
    interactiveDummy.name = "interactiveDummy";
    SCENE.add(interactiveDummy);
    interactiveDummy.position.y = 0.75;
    interactiveDummy.position.z = -20;

}

// Spawn torches in multiple places on the scene
function AddTorches() {
    const torch = CreateTorch();
    SCENE.add(torch);
    torch.position.set(2.5, 2, 0.7);
    torch.add(fires[0].getFireParticle());    
    
    const torch_2 = CreateTorch();
    SCENE.add(torch_2);
    torch_2.position.set(-2.5, 2, 0.7);
    torch_2.add(fires[1].getFireParticle());    
    
    const torch_3 = CreateTorch();
    SCENE.add(torch_3);
    torch_3.position.set(-10.8, 2, -50);
    torch_3.rotation.y = Math.PI/2;
    torch_3.add(fires[2].getFireParticle());    

    const torch_4 = CreateTorch();
    SCENE.add(torch_4);
    torch_4.position.set(-10.8, 2, -60);
    torch_4.rotation.y = Math.PI/2;
    torch_4.add(fires[3].getFireParticle());    

    const torch_5 = CreateTorch();
    SCENE.add(torch_5);
    torch_5.position.set(2.5, 2, -0.7);
    torch_5.rotation.y = Math.PI;
    torch_5.add(fires[4].getFireParticle());    

    const torch_6 = CreateTorch();
    SCENE.add(torch_6);
    torch_6.position.set(-2.5, 2, -0.7);
    torch_6.rotation.y = Math.PI;
    torch_6.add(fires[5].getFireParticle());    
}

// Add skybox to the SCENE
function CreateSkybox() {
    SCENE.background = new THREE.CubeTextureLoader()
        .setPath( 'textures/cubeMaps/' )
        .load( [
            'posx.jpg', // front
            'negx.jpg', // back
            'posy.jpg', // up
            'negy.jpg', // down
            'posz.jpg', // right
            'negz.jpg' // left
        ] );
}

// Apply fog effect to the world
function CreateFog() {
    const fogColor = new THREE.Color(0x000000);
    SCENE.fog = new THREE.Fog(fogColor, 0, 130);
}

// Simulate fire light over time
function FireLightImmitation() {    
    if (isSmaller) {
        currentIntensity = currentIntensity - 0.015;
        if (currentIntensity <= nextIntesity) {
            nextIntesity = getRandom(-1,1);
            CheckIfSmaller();
        }
    } else {
        currentIntensity = currentIntensity + 0.015;
    }
    
    if (currentIntensity >= nextIntesity || !isSmaller) {
        nextIntesity = getRandom(-1,1);
        CheckIfSmaller();
    }
    return currentIntensity;
}

// Fire imitation support function
function CheckIfSmaller() {
    if (currentIntensity<nextIntesity) {
        isSmaller = false;
    } else {
        isSmaller = true;
    }
}

export function getScene()
{
    return SCENE;
}

// support random function
function getRandom(min, max) {
    return (Math.random() * (max - min + 1) ) + min;
}