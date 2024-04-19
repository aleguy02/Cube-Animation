import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

let targetX = 0
let targetY = 0

// Rotate Cube
document.getElementById('body').onmousedown = (event) => {
    event.preventDefault()
    let positionX = cube.position.x
    let positionY = cube.position.y

    document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    document.onmousemove = (event) => {
        cube.position.x = positionX
        cube.position.y = positionY

        let deltaX = event.movementX
        let deltaY = event.movementY
        rotateCube(deltaX, deltaY)
    }
}

// Move Cube
document.getElementById('body').onmousemove = (event) => {
    targetX = ((event.clientX ) - (window.innerWidth / 2)) / 100
    targetY = -((event.clientY ) - (window.innerHeight / 2)) / 100
}
function updateCubePosition() {
    cube.position.x += (targetX - cube.position.x) * 0.1;
    cube.position.y += (targetY - cube.position.y) * 0.1;
}

function spawnCube() {
    requestAnimationFrame( spawnCube );
    updateCubePosition()
    renderer.render( scene, camera );
}

function rotateCube(deltaX, deltaY) {
    cube.rotation.y += (deltaX * 0.005);
    cube.rotation.x += (deltaY * 0.005);
}


spawnCube()
