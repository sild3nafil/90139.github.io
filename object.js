var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(45, 86%, 83%)'), 1.0);
keyLight.position.set(-200, 0, 200);

var keyLight2 = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 100%)'), 0.1);
keyLight.position.set(0, -5, 0);


var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(37, 100%, 63%)'), 0.75);
fillLight.position.set(200, 0, 200);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(200, 0, -200).normalize();
 

scene.add(keyLight);
scene.add(keyLight2);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('model/');
mtlLoader.setPath('model/');
mtlLoader.load('90139_2.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('model/');
    objLoader.load('90139.obj', function (object) {

        scene.add(object);
        object.position.y -= 0;

    });

});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();