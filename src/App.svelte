<script>
  import { onMount } from "svelte";

  import * as THREE from "three";
  import Viewer from "./viewer.js";
  class App {
    constructor() {
      Viewer.init({
        renderer: {
          parent: window.document.body,
          alpha: true,
          antialias: true,
          clearColor: "grey",
          pixelRatio: 1,
        },
      });
      this.createObject();
    }


    createObject() {
      Viewer.scene.add(new THREE.GridHelper(10, 10))


      let object = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: "yellow" })
      );
      Viewer.scene.add(object);
      object.position.set(3,0,-4)

      let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 8, 8),
        new THREE.MeshStandardMaterial({color:'green'})
      )

      Viewer.scene.add(sphere)
      sphere.position.set(7, 0, -1)
      
      sphere.add(object)


      let angle = 0

      let direction = new THREE.Vector3().subVectors(sphere.position, object.position)
      direction.setLength(.03)
      Viewer.addUpdate("transition", () =>{
        // that.object.position.add(direction)
        // object.translateZ(1)
        // object.rotation.y +=.1
        
        
        // angle += .01
        // object.position.x = 3 * Math.sin(angle)
        // object.position.z = 3 * Math.cos(angle)


        sphere.rotation.y += .01
      })
    }


    // 4 LESSON
    // createObject() {
    //   this.object = new THREE.Mesh(
    //     new THREE.BoxGeometry(0.1, 0.1, 1),
    //     new THREE.MeshStandardMaterial({ color: "yellow" })
    //   );
    //   Viewer.scene.add(this.object);
    //   // this.object.position.z = -5;
    //   let that = this;

    //   let cone = new THREE.Mesh(
    //     new THREE.ConeGeometry(0.1, 0.2, 10),
    //     new THREE.MeshStandardMaterial({ color: "red" })
    //   );

    //   cone.position.z = -0.5;
    //   cone.rotation.x = -Math.PI / 2;

    //   cone.name = "cone1";

    //   this.object.scale.set(1, 3, 4);
    //   this.object.add(cone);
    //   let obj2 = this.object.clone();
    //   obj2.position.x += 3;
    //   Viewer.scene.add(obj2);
    //   // this.object.visible = false
    //   // Viewer.addUpdate("rotate_object", () => {
    //   //   that.object.rotation.y += 0.01;
    //   // });
    //   console.log(this.object.getObjectByName("cone1"));

    //   let sphere = new THREE.Mesh(
    //     new THREE.SphereGeometry(1, 8, 8),
    //     new THREE.MeshStandardMaterial({ color: "black" })
    //   );

    //   sphere.position.set(5, 0, -6);

    //   Viewer.scene.add(sphere);

    //   Viewer.addUpdate("look_at_sphere", () => {
    //     sphere.position.x -= 0.05;
    //     that.object.lookAt(sphere.position.clone().multiplyScalar(-1));
    //     obj2.lookAt(sphere.position);
    //   });
    // }
  }

  onMount(() => {
    new App();
  });
</script>
