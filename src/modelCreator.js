import { CreateTower, CreateWall, CreateBlankWall, CreateGate, CreateDrawbridge, CreateLever, CreateTorch, CreateCannon, CreateCannonball, CreateDummy, CreateTreeBranch, CreateTree } from './models.js';

var SCENE = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ); // Perspective projection parameters
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer( { clearAlpha: 1, alpha:true } );
renderer.setSize(window.innerWidth, window.innerHeight); // Size of the 2D projection
document.body.appendChild(renderer.domElement); // Connecting to the canvas

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = false;
controls.dampingFactor = 0.01;
controls.screenSpacePanning = false;
controls.enableKeys = true;
console.log("loading keys");
controls.keys = {
	LEFT: 37, //left arrow
	UP: 38, // up arrow
	RIGHT: 39, // right arrow
	BOTTOM: 40 // down arrow
}

//////////////////////////////////////////////////////////////////////////////////

//Create the texture manager
console.log("Creating texture manager");
const TEXTURE_MANAGER = new TextureManager();
console.log("Texture manager created");

//Add everyone's textures to the texturesToBeLoadedMap.
AddTextures.addConnorsTextures(TEXTURE_MANAGER);
AddTextures.addPatryksTextures(TEXTURE_MANAGER);
AddTextures.addLiamsTextures(TEXTURE_MANAGER);
AddTextures.addDanielsTextures(TEXTURE_MANAGER);

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

//Double check to make sure that the textures have been loaded.
if(allTexturesHaveBeenLoaded)
{
    //Once all the textures have been loaded proceed as normal.
    CreateSkybox();
    
    // Create a wall at the specific position in world
    const mesh = CreateCannon();
    SCENE.add(mesh);   
}
else
{
    console.error("There was a problem with loading the textures");
}

// SKYBOX
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

// Add the ambient light
var lightAmbient = new THREE.AmbientLight( 0x222222 ); 
SCENE.add(lightAmbient);


// Add the spot light
var lightThis = new THREE.SpotLight(0xffffff);
lightThis.position.x = 0;
lightThis.position.y = 150;
lightThis.position.z = 20;
lightThis.intensity = 1.0;
lightThis.penumbra = 0.50;
lightThis.angle = Math.PI/6;
SCENE.add(lightThis);
lightThis.target.position.x = 0;
lightThis.target.position.y = -50;
lightThis.target.position.z = -100;
SCENE.add(lightThis.target);

// Model lighting
const lightIntensity = 0.2;
var modelLight = new THREE.PointLight(0xFFFFFF, 1, 100);
modelLight.position.set( 20, 0, 0 );
modelLight.intensity = lightIntensity;
SCENE.add( modelLight );
var modelLight2 = new THREE.PointLight(0xFFFFFF, 1, 100);
modelLight2.position.set( -20, 0, 0 );
modelLight2.intensity = lightIntensity;
SCENE.add( modelLight2 );
var modelLight3 = new THREE.PointLight(0xFFFFFF, 1, 100);
modelLight3.position.set( 0, 0, 20 );
modelLight3.intensity = lightIntensity;
SCENE.add( modelLight3 );
var modelLight4 = new THREE.PointLight(0xFFFFFF, 1, 100);
modelLight4.position.set( 0, 0, -20 );
modelLight4.intensity = lightIntensity;
SCENE.add( modelLight4 );
var modelLight5 = new THREE.PointLight(0xFFFFFF, 1, 100);
modelLight5.position.set( 0, -20, 0 );
modelLight5.intensity = lightIntensity;
SCENE.add( modelLight5 );
var modelLight6 = new THREE.PointLight(0xFFFFFF, 1, 100);
modelLight6.position.set( 0, 20, 0 );
modelLight6.intensity = lightIntensity;
SCENE.add( modelLight6 );

var iFrame = 0;

function animate(iFrame) 
{
    requestAnimationFrame(animate);

    iFrame++;    

    controls.update();

    renderer.render(SCENE, camera);

}
animate();