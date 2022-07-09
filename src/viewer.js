import { onMount } from "svelte";

import * as THREE from "three";


export default {
    init(data) {
        this.createResize()
        this.createRenderer(data.renderer);
        this.createCamera();
        this.createScene();
        this.createLight();
        this.update();
    },
    createRenderer(settings) {
        if (this.renderer) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
            this.renderer.dispose()
        }

        this.renderer = new THREE.WebGLRenderer(settings);

        settings.parent.appendChild(this.renderer.domElement);

        this.renderer.setClearColor(settings.clearColor || 'black')
        this.renderer.setPixelRatio(settings.pixelRatio || devicePixelRatio)
        let than = this
        this.addResize("resize_render", () =>{
            than.renderer.setSize(
                than.renderer.domElement.parentNode.offsetWidth,
                than.renderer.domElement.parentNode.offsetHeight
            )
        })
        this.resizePool["resize_render"]()
    },
    createCamera() {

        this.camera = new THREE.PerspectiveCamera(
            45,
            this.renderer.domElement.width / this.renderer.domElement.height,
            1,
            100
        )

        this.camera.position.set(5,10,10)
        this.camera.lookAt(0,0,0)

        let than = this

        this.addResize("resize_camera", () =>{
            than.camera.aspect = than.renderer.domElement.width /  than.renderer.domElement.height
            than.camera.updateProjectionMatrix()
        })
    },
    createScene() {

        this.scene = new THREE.Scene();
    },
    createLight() {
        this.light1 = new THREE.DirectionalLight(0xffffff, .5);

        this.scene.add(this.light1);

        this.light1.position.set(-1, 3, 10);

        this.light2 = new THREE.AmbientLight(0xffffff, .5);

        this.scene.add(this.light2);
    },
    addUpdate(name, func) {
        this.updatePool[name] = func;
    },
    removeUpdate(name) {
        delete this.updatePool[name];
    },
    updatePool: {},
    update() {

        this.renderer.render(this.scene, this.camera);

        var that = this;

        requestAnimationFrame(() => { that.update(); });

        for (var key in this.updatePool) this.updatePool[key]();
    },

    resizePool: {},

    resize() {
        for (let key in this.resizePool) this.resizePool[key]()
    },

    addResize(name, func){
        this.resizePool[name] = func
    },
    removeResize(name){
        delete this.resizePool[name]
    },

    createResize(){
        let than = this
        window.addEventListener('resize', () =>{than.resize()})
    }
}