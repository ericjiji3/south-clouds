import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { ObjectLoader } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// Loading
const textureLoader = new THREE.TextureLoader()

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const loader = new OBJLoader();


// Materials

const material = new THREE.MeshToonMaterial()
material.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

loader.load('../dist/assets/building1.obj', function(building1){
    building1.traverse( function( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material = material;
        }
    } );
    scene.add(building1)
    building1.position.x = 50
    const building1Folder = gui.addFolder('Building 1')
    building1Folder.add(building1.position, 'y')
    building1Folder.add(building1.position, 'x')
    building1Folder.add(building1.position, 'z')
});


// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLightFolder = gui.addFolder('Point Light')
pointLightFolder.add(pointLight.position, 'y')
pointLightFolder.add(pointLight.position, 'x')
pointLightFolder.add(pointLight.position, 'z')
pointLightFolder.add(pointLight, 'intensity')
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
scene.add(pointLightHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'y')
cameraFolder.add(camera.position, 'x')
cameraFolder.add(camera.position, 'z')
const cameraHelper = new THREE.CameraHelper(camera)
scene.add(cameraHelper)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()