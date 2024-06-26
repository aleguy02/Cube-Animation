import * as THREE from "three";

const scene = new THREE.Scene();
const backgroundColor = new THREE.Color(0xF5F5F5);
scene.background = backgroundColor;

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

let targetX = 0;
let targetY = 0;
let mouseDown = false;

// Rotate Cube
document.getElementById("body").onmousedown = (event) => {
    event.preventDefault();
    mouseDown = true;

    let positionX = cube.position.x;
    let positionY = cube.position.y;

    document.onmouseup = () => {
        mouseDown = false;
        document.onmouseup = null;
        document.onmousemove = null;
    };

    document.onmousemove = (event) => {
        cube.position.x = positionX;
        cube.position.y = positionY;

        let deltaX = event.movementX;
        let deltaY = event.movementY;
        rotateCube(deltaX, deltaY);
    };
};

// Move Cube
document.getElementById("body").onmousemove = (event) => {
    targetX = (event.clientX - window.innerWidth / 2) / 100;
    targetY = -(event.clientY - window.innerHeight / 2) / 100;
};
function updateCubePosition() {
    // Cube's position will only update if the mouse button is up
    if (!mouseDown) {
        cube.position.x += (targetX - cube.position.x) * 0.1;
        cube.position.y += (targetY - cube.position.y) * 0.1;
    }
}

function spawnCube() {
    requestAnimationFrame(spawnCube);
    updateCubePosition();
    renderer.render(scene, camera);
}

function rotateCube(deltaX, deltaY) {
    cube.rotation.y += deltaX * 0.005;
    cube.rotation.x += deltaY * 0.005;
}

spawnCube();
