import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';



let scene, camera, renderer, controls;
let material1;
let allTextObjects = [];
setupScene();

function setupScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls = new OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 25;
  addEventListeners();
  addLights();
  addMaterials();
  animate();

}

function addEventListeners() {
  document.getElementById("submitButton").addEventListener("click", () =>{changeText()} );
  window.addEventListener( 'resize', () => {resizeCanvas()});
}


function loadText(text) {
  const loader = new FontLoader();
  loader.load('../assets/fonts/font.json', function (font) {
    const textMesh = new TextGeometry(text, {
      font: font,
      size: 10,
      height: 2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0.2,
      bevelOffset: 0,
      bevelSegments: 5
    });
    createText(textMesh);
  });
}

function changeText(){
  let textValue = document.getElementById('textInput').value;
  allTextObjects.forEach((textObject) => { 
    textObject.removeFromParent();
  });
  loadText(textValue);
}

function addLights() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);
  const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(ambientLight);
}

function addMaterials() {
  material1 = new THREE.MeshPhysicalMaterial({
    reflectivity: 2,
    transmission: 0.5,
    roughness: 0.2,
    metalness: 0,
    clearcoat: 0.3,
    clearcoatRoughness: 0.25,
    color: 0xff7070,
    ior: 1.2,
    thickness: 10.0,
    side: THREE.DoubleSide
  })

}
function createText(mesh) {
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  let textObject = new THREE.Mesh(mesh, material1);
  textObject.scale.set(1, 1, 1);
  allTextObjects.push(textObject);
  scene.add(textObject);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

}


function resizeCanvas() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}