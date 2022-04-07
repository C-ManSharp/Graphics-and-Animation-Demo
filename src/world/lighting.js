// Sunlight
function AddLights() {
    var lights = new THREE.Group();

    // Creating a main light which is going to cast shadows
    const mainLight = new THREE.PointLight(0xffaaaa, 1);
    mainLight.position.set(100, 40, 100);
    
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 512;
    mainLight.shadow.mapSize.height = 512;
    mainLight.shadow.radius = 1.0;


    // Create support light to cast a light on the darker sides of models
    const sideLight = new THREE.SpotLight(0xffffff, 0.1, 0, 0.7);
    sideLight.position.set(-140, 90, 30);
    
    const lightTarget = new THREE.Mesh();
    lights.add(lightTarget);
    sideLight.target = lightTarget;
    sideLight.target.position.set(-90, 0, -30);
    
    lights.add(sideLight);    
    
    // Create support backlight
    const backlight = new THREE.SpotLight(0xffffff, 0.1, 0, 0.7);
    backlight.position.set(0, 90, -140);
    
    const lightTarget3 = new THREE.Mesh();
    lights.add(lightTarget3);
    backlight.target = lightTarget3;
    backlight.target.position.set(-60, 0, 0);
    
    lights.add(backlight);
    
    const targetForMainLight = new THREE.Mesh();
    lights.add(targetForMainLight);
    
    lights.add(mainLight);

    return lights;
}

export { AddLights };