import * as THREE from "three";
/* import Stats: any from "three/examples/jsm/libs/stats.module"; */
const Stats: any = require("three/examples/jsm/libs/stats.module");

export default class graphicsHandler {
    scene: any;
    camera: any;
    renderer: any;
    stats: any;
    objects: any;
    shadows: boolean;

    constructor(canvas: any, toggleShadows: boolean) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50,window.innerWidth / window.innerHeight,1,1000);
        this.camera.position.z = 96;
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
        this.objects = {};
        this.shadows = toggleShadows;
    }

    newAmbientLight(color: any, strength: number) {
        const ambientLight = new THREE.AmbientLight(color, strength);
        ambientLight.castShadow = true;
        this.scene.add(ambientLight);
    }

    newSpotLight(color: any, strength: number, chords: Array<number>) {
        const spotlight = new THREE.SpotLight(color, strength);
        spotlight.castShadow = true;
        spotlight.position.set(chords[0], chords[1], chords[2]);
        this.scene.add(spotlight);
    }

    newRect(dimentions: Array<number>, position: Array<number>, color: any, id: string) {
        const boxGeometry = new THREE.BoxGeometry(dimentions[0], dimentions[1], dimentions[2]);
        const boxMaterial = new THREE.MeshPhongMaterial({color: color});
        this.objects[id] = new THREE.Mesh(boxGeometry, boxMaterial);
        this.objects[id].position.set(position[0], position[1], position[2]);
        this.scene.add(this.objects[id]);
    }

    newSphere(radius: number, position: Array<number>, color: any, id: string) {
        const sphereGeometry = new THREE.SphereGeometry(radius, 32, 16);
        const sphereMaterial = new THREE.MeshPhongMaterial({color: color});
        this.objects[id] = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.objects[id].position.set(position[0], position[1], position[2]);
        this.scene.add(this.objects[id]);
    }

    renderFrame() {
        this.stats.update();
        this.renderer.render(this.scene, this.camera);
    }
}
