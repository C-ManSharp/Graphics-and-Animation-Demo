import { Fire } from './Fire.js';
import { Rain } from './Rain.js';
import { Firework } from './Firework.js';
import { DrawBridgeAnimation } from './DrawBridgeAnimation.js';
import { CreateDrawbridge } from './world/models/drawBridge.js';
import { CreateLever } from './world/models/lever.js';
import { CreateTorch } from './world/models/torch.js';
import { CreateWorld } from './world/world.js';
import { AddLights } from './world/lighting.js';

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

// Connor's particles declarations
const DRAWBRIDGE_ANIMATION = new DrawBridgeAnimation(drawbridge);

const FIRE = new Fire(
    TEXTURE_MANAGER.getLoadedTexture("FireBallTexture"), 
    TEXTURE_MANAGER.getLoadedTexture("FireBallDisplacementMap")
    );

const RAIN = new Rain(SCENE);
const FIREWORK = new Firework(SCENE, TEXTURE_MANAGER.getLoadedTexture("SmokeTexture"));

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
/// Liam's code
console.log("Initialize a Kinectron instance");
var kinectron = new Kinectron();
console.log("Done");

console.log("Define a function to load local file");
function readTextFile(file, callback) 
{
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() 
    {
        if (rawFile.readyState === 4) 
        {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
console.log("Done");

console.log("Load motion JSON file");

// JSON variables
var numJsonFrames = [];
var motions = [];
var currentInd = 0;

// Read the JSON file motion.json
readTextFile("flying.json", function(text)
{
    var flyingMotion = JSON.parse(text);
    var numJson = Object.keys(flyingMotion).length;
    numJsonFrames.push(numJson);
    motions.push(flyingMotion);
}
);

readTextFile("clappingHands1.json", function(text)
{
   var clappingHands1Motion = JSON.parse(text);
   var numJson = Object.keys(clappingHands1Motion).length;
   numJsonFrames.push(numJson);
   motions.push(clappingHands1Motion);
}
);

readTextFile("ArmRaising.json", function(text)
{
   var ArmRaisingMotion = JSON.parse(text);
   var numJson = Object.keys(ArmRaisingMotion).length;
   numJsonFrames.push(numJson);
   motions.push(ArmRaisingMotion);
}
);

readTextFile("armsUp.json", function(text)
{
    var armsUpMotion = JSON.parse(text);
    var numJson = Object.keys(armsUpMotion).length;
    numJsonFrames.push(numJson);
    motions.push(armsUpMotion);
}
);

readTextFile("RaisingRightHandLoweringLeftHand.json", function(text)
{
    var RaisingRightHandLoweringLeftHandMotion = JSON.parse(text);
    var numJson = Object.keys(RaisingRightHandLoweringLeftHandMotion).length;
    numJsonFrames.push(numJson);
    motions.push(RaisingRightHandLoweringLeftHandMotion);
}
);

readTextFile("Jumping.json", function(text)
{
    var Jumping = JSON.parse(text);
    var numJson = Object.keys(Jumping).length;
    numJsonFrames.push(numJson);
    motions.push(Jumping);
}
);

console.log ("Create the raycaster");
const raycaster = new THREE.Raycaster();
console.log ("Done");

console.log("Create balls to touch");
var geo1 = new THREE.SphereGeometry(0.075, 18, 18);
var mat1 = new THREE.MeshPhongMaterial({color: 0xff0000})
var meshCirc1 = new THREE.Mesh(geo1, mat1);
meshCirc1.position.set(0.7, 0.4, 2.3);
meshCirc1.name = 'Right Circle';
SCENE.add(meshCirc1);

var geo2 = new THREE.SphereGeometry(0.075, 18, 18);
var mat2 = new THREE.MeshPhongMaterial({color: 0xff0000})
var meshCirc2 = new THREE.Mesh(geo2, mat2);
meshCirc2.position.set(-0.5, 0.4, 2.3);
meshCirc2.name = 'Left Circle';
SCENE.add(meshCirc2);

var geo3 = new THREE.SphereGeometry(0.075, 18, 18);
var mat3 = new THREE.MeshPhongMaterial({color: 0xff0000})
var meshCirc3 = new THREE.Mesh(geo3, mat3);
meshCirc3.position.set(0.1, 0.75, 2.3);
meshCirc3.name = 'Head Circle';
SCENE.add(meshCirc3);

console.log("Done");

console.log("Create a ball for each body joint");
var meshJoints = [];
for (var i = 0 ; i < 25 ; i++)
{
    var geo = new THREE.SphereGeometry(0.02, 18, 18);
    var mat = new THREE.MeshPhongMaterial({color: 0xCCCCCC});
    var mesh = new THREE.Mesh(geo, mat);
    meshJoints.push(mesh);
	SCENE.add(mesh);
}
console.log("Done");

console.log("Create lines to connect the joints");

var mLine1 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine1 = new THREE.BufferGeometry().setFromPoints([meshJoints[12].position, meshJoints[13].position, meshJoints[14].position, meshJoints[15].position]);
var meshLine1 = new THREE.Line(gLine1, mLine1);
SCENE.add(meshLine1);

var mLine2 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine2 = new THREE.BufferGeometry().setFromPoints([meshJoints[16].position, meshJoints[17].position, meshJoints[18].position, meshJoints[19].position]);
var meshLine2 = new THREE.Line(gLine2, mLine2);
SCENE.add(meshLine2);

var mLine3 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine3 = new THREE.BufferGeometry().setFromPoints([meshJoints[0].position, meshJoints[12].position]);
var meshLine3 = new THREE.Line(gLine3, mLine3);
SCENE.add(meshLine3);

var mLine4 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine4 = new THREE.BufferGeometry().setFromPoints([meshJoints[0].position, meshJoints[16].position]);
var meshLine4 = new THREE.Line(gLine4, mLine4);
SCENE.add(meshLine4);

var mLine5 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine5 = new THREE.BufferGeometry().setFromPoints([meshJoints[0].position, meshJoints[1].position, meshJoints[20].position, meshJoints[2].position, meshJoints[3].position]);
var meshLine5 = new THREE.Line(gLine5, mLine5);
SCENE.add(meshLine5);

var mLine6 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine6 = new THREE.BufferGeometry().setFromPoints([meshJoints[20].position, meshJoints[4].position]);
var meshLine6 = new THREE.Line(gLine6, mLine6);
SCENE.add(meshLine6);

var mLine7 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine7 = new THREE.BufferGeometry().setFromPoints([meshJoints[20].position, meshJoints[8].position]);
var meshLine7 = new THREE.Line(gLine7, mLine7);
SCENE.add(meshLine7);

var mLine8 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine8 = new THREE.BufferGeometry().setFromPoints([meshJoints[4].position, meshJoints[5].position, meshJoints[6].position, meshJoints[7].position]);
var meshLine8 = new THREE.Line(gLine8, mLine8);
SCENE.add(meshLine8);

var mLine9 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine9 = new THREE.BufferGeometry().setFromPoints([meshJoints[8].position, meshJoints[9].position, meshJoints[10].position, meshJoints[11].position]);
var meshLine9 = new THREE.Line(gLine9, mLine9);
SCENE.add(meshLine9);

var mLine10 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine10 = new THREE.BufferGeometry().setFromPoints([meshJoints[7].position, meshJoints[21].position]);
var meshLine10 = new THREE.Line(gLine10, mLine10);
SCENE.add(meshLine10);

var mLine11 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine11 = new THREE.BufferGeometry().setFromPoints([meshJoints[6].position, meshJoints[22].position]);
var meshLine11 = new THREE.Line(gLine11, mLine11);
SCENE.add(meshLine11);

var mLine12 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine12 = new THREE.BufferGeometry().setFromPoints([meshJoints[11].position, meshJoints[23].position]);
var meshLine12 = new THREE.Line(gLine12, mLine12);
SCENE.add(meshLine12);

var mLine13 = new THREE.LineBasicMaterial({color: 0x00cc00});
var gLine13 = new THREE.BufferGeometry().setFromPoints([meshJoints[10].position, meshJoints[24].position]);
var meshLine13 = new THREE.Line(gLine13, mLine13);
SCENE.add(meshLine13);

console.log("Done");

//Gets mouse
var mouse = new THREE.Vector2(-10000,-10000);

//Adds event listener for keydown
window.addEventListener('keydown', logKey);

//Functions to react to button presses
function logKey (e)
{
	if (e.code == "KeyR")
	{
		console.log ("Rain");
    }
	
	if (e.code == "KeyU")
	{
		console.log ("Head");
    }
	
	if (e.code == "KeyH")
	{
		console.log ("Left Arm");
    }
	
	if (e.code == "KeyK")
	{
		console.log ("RightArm");
    }
	
	if (e.code == "KeyJ")
	{
		console.log ("Torso");
    }
	
	if (e.code == "KeyN")
	{
		console.log ("Left Leg");
    }
	
	if (e.code == "KeyM")
	{
		console.log ("Right Leg");
    }
    
    if (e.code == "KeyP")
    {
        if (motions.length - 1 > currentInd)
        {
            currentInd = currentInd + 1;
            console.log(currentInd);
        }

        else 
        {
            currentInd = 0;
        }
    }
}

function click( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    //Check if anything was clicked. If nothing was clicked then we don't need to iterate through intersects.
    if(intersects.length > 0)
    {
        for(let i = 0; i < intersects.length; i++)
        {
            console.log(intersects[i].object.name);
        }
    }
}
window.addEventListener( 'click', click, false );

console.log("Create some facilities to detect motion");
var initialHeightLF = null;
var initialHeightRF = null;

var lastHandLeft = null;
var lastHandRight = null;
var clockFrameTime = new THREE.Clock(true);
console.log("Done")

console.log("Create a function to update meshes using motion");
function getBodies(skeletonFrame)
{
	for (var i = 0 ; i < 25 ; i++)
	{
		meshJoints[i].position.x = skeletonFrame.joints[i].cameraX;
		meshJoints[i].position.y = skeletonFrame.joints[i].cameraY;
		meshJoints[i].position.z = skeletonFrame.joints[i].cameraZ;
	}		

	// Update the lines
    meshLine1.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[12].position, meshJoints[13].position, meshJoints[14].position, meshJoints[15].position]);
    meshLine2.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[16].position, meshJoints[17].position, meshJoints[18].position, meshJoints[19].position]);
    meshLine3.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[0].position, meshJoints[12].position]);
    meshLine4.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[0].position, meshJoints[16].position]);
    meshLine5.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[0].position, meshJoints[1].position, meshJoints[20].position, meshJoints[2].position, meshJoints[3].position]);
    meshLine6.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[20].position, meshJoints[4].position]);
    meshLine7.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[20].position, meshJoints[8].position]);
    meshLine8.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[4].position, meshJoints[5].position, meshJoints[6].position, meshJoints[7].position]);
    meshLine9.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[8].position, meshJoints[9].position, meshJoints[10].position, meshJoints[11].position]);
    meshLine10.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[7].position, meshJoints[21].position]);
    meshLine11.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[6].position, meshJoints[22].position]);
    meshLine12.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[11].position, meshJoints[23].position]);
    meshLine13.geometry = new THREE.BufferGeometry().setFromPoints([meshJoints[10].position, meshJoints[24].position]);

}
console.log("Done");

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

function animate(iFrame) 
{
    requestAnimationFrame(animate);

    iFrame++;    

    controls.update();

    FIRE.animateFireParticle();
    FIREWORK.animateFireWorks();
    if(RAIN.getIsRaining())
        RAIN.moveRainDroplets();
    DRAWBRIDGE_ANIMATION.openDrawbridgeAnimation();
    DRAWBRIDGE_ANIMATION.closeDrawbridgeAnimation();

    renderer.render(SCENE, camera);

    // Fire light imitation
    fire_1.intensity = FireLightImmitation()*2;
    fire_2.intensity = FireLightImmitation()*2;
	
/////////////////////////////////////////////////////////////////////////////////
/// Liam's code
//Gets the distance between the head and the head sphere
	var distFromHeadToBall = Math.sqrt(
		Math.pow(meshCirc3.position.x-meshJoints[kinectron.HEAD].position.x, 2) +
		Math.pow(meshCirc3.position.y-meshJoints[kinectron.HEAD].position.y, 2) +
		Math.pow(meshCirc3.position.z-meshJoints[kinectron.HEAD].position.z, 2) 		
	);
	
	//Gets the distance between the righthand sphere and the right hand
	var distFromLeftHandToBall = Math.sqrt(
		Math.pow(meshCirc2.position.x-meshJoints[kinectron.HANDLEFT].position.x, 2) +
		Math.pow(meshCirc2.position.y-meshJoints[kinectron.HANDLEFT].position.y, 2) +
		Math.pow(meshCirc2.position.z-meshJoints[kinectron.HANDLEFT].position.z, 2) 		
	);
	
	//Gets the distance between the righthand sphere and the right hand
	var distFromRightHandToBall = Math.sqrt(
		Math.pow(meshCirc1.position.x-meshJoints[kinectron.HANDRIGHT].position.x, 2) +
		Math.pow(meshCirc1.position.y-meshJoints[kinectron.HANDRIGHT].position.y, 2) +
		Math.pow(meshCirc1.position.z-meshJoints[kinectron.HANDRIGHT].position.z, 2) 		
	);
	
	//Detects collision with the ball with left sphere
	if (distFromRightHandToBall < (meshCirc1.geometry.parameters.radius + meshJoints[kinectron.HANDRIGHT].geometry.parameters.radius))
    {
        meshCirc1.material.color.setHex(0x00FF00);
    }
    else
    {
        meshCirc1.material.color.setHex(0x003300);
    }
	
	//Detects collision with the ball with left sphere
    if (distFromLeftHandToBall < (meshCirc2.geometry.parameters.radius + meshJoints[kinectron.HANDLEFT].geometry.parameters.radius))
    {
        meshCirc2.material.color.setHex(0x00FF00);
    }
    else
    {
        meshCirc2.material.color.setHex(0x003300);
    }
	
	//Detects collision with the ball above the characters head
	if (distFromHeadToBall < (meshCirc3.geometry.parameters.radius + meshJoints[kinectron.HEAD].geometry.parameters.radius))
	{
		
        meshCirc3.material.color.setHex(0x00FF00);
    }
    else
    {
        meshCirc3.material.color.setHex(0x003300);
    }
	
	// Detect if the character is raising its arms
    if (meshJoints[kinectron.HANDLEFT].position.y > meshJoints[kinectron.SHOULDERLEFT].position.y) 
    {
        meshJoints[kinectron.HANDLEFT].material.color.setHex(0xFF0000)
    }
	else
	{
		meshJoints[kinectron.HANDLEFT].material.color.setHex(0xe3ff00)
	}
	
	if (meshJoints[kinectron.HANDRIGHT].position.y > meshJoints[kinectron.SHOULDERRIGHT].position.y)
	{
		meshJoints[kinectron.HANDRIGHT].material.color.setHex(0xFF0000)
	}
    else
    {
		meshJoints[kinectron.HANDRIGHT].material.color.setHex(0xe3ff00)
    }
	
	// Detect if the character is jumping
    if ((meshJoints[kinectron.FOOTLEFT].position.y > initialHeightLF) && (meshJoints[kinectron.FOOTRIGHT].position.y > initialHeightRF))
    {
        console.log("Jump");
    }

    if (numJsonFrames.length > 0)
    {
		var numJson = numJsonFrames[currentInd];
    	var iFrameToRender = iFrame % numJson;
		var current = motions[currentInd];
        getBodies(current[iFrameToRender]);
    }
/////////////////////////////////////////////////////////////////////////////////
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
}

// Spawn torches in multiple places on the scene
function AddTorches() {
    const torch = CreateTorch();
    SCENE.add(torch);
    torch.position.set(2.5, 2, 0.7);
    torch.add(FIRE.getFireParticle());    
    
    const torch_2 = CreateTorch();
    SCENE.add(torch_2);
    torch_2.position.set(-2.5, 2, 0.7);
    torch_2.add(FIRE.getFireParticle());    
    
    const torch_3 = CreateTorch();
    SCENE.add(torch_3);
    torch_3.position.set(-10.8, 2, -50);
    torch_3.rotation.y = Math.PI/2;
    torch_3.add(FIRE.getFireParticle());    

    const torch_4 = CreateTorch();
    SCENE.add(torch_4);
    torch_4.position.set(-10.8, 2, -60);
    torch_4.rotation.y = Math.PI/2;
    torch_4.add(FIRE.getFireParticle());    

    const torch_5 = CreateTorch();
    SCENE.add(torch_5);
    torch_5.position.set(2.5, 2, -0.7);
    torch_5.rotation.y = Math.PI;
    torch_5.add(FIRE.getFireParticle());    

    const torch_6 = CreateTorch();
    SCENE.add(torch_6);
    torch_6.position.set(-2.5, 2, -0.7);
    torch_6.rotation.y = Math.PI;
    torch_6.add(FIRE.getFireParticle());    
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