// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, cube;

function init() {
    // ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); 
    loader.load('assets/coin.gltf', function (gltf) {
        const coin = gltf.scene;
        coin.position.set(0, 0, 0); 
        scene.add(coin);
    });


    const light = new THREE.DirectionalLight(0xffffff, 8);
    light.position.set(1, 1, 5);
    scene.add(light);

    // ~~~~~~~~~~~~~~~~ Create cube ~~~~~~~~~~~~~~~~
    const geometry = new THREE.CapsuleGeometry(0.5, 0.5, 0.5);
    const texture = new THREE.TextureLoader().load('textures/grasslight-big.jpg');

    const material = new THREE.MeshStandardMaterial({ map: texture });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();

