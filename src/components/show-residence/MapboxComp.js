import React, { useRef, useEffect } from "react";
import mapboxGl from "mapbox-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const MapboxComp = (props) => {
  const { widgetinfo } = props;
  const mapContainer = useRef(null);
  const map = useRef(null);

  mapboxGl.accessToken =
    "pk.eyJ1IjoibnozNjcyIiwiYSI6ImNreTlscGdiOTA1bjIycG1nbW95amdlMzYifQ.wPQ_fd-VPbpTazLhzbL4tA";

  useEffect(() => {
    if (map.current && widgetinfo) {
      loadModel(widgetinfo);
      map.current.jumpTo({
        center: [widgetinfo.geometry.lng, widgetinfo.geometry.lat],
      });

      return () => {
        map.current.removeLayer("3d-model");
      }; // initialize map only once
    }
    if (widgetinfo) {
      map.current = new mapboxGl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/nz3672/cky9lr7o02ol816n2edvtnccj",
        center: [widgetinfo.geometry.lng, widgetinfo.geometry.lat],
        zoom: 16,
        pitch: 60,
        antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
      });
      map.current.on("style.load", () => {
        loadModel(widgetinfo);
      });

      return () => {
        map.current.removeLayer("3d-model");
      };
    }
  }, [widgetinfo]);

  const loadModel = (info) => {
    const modelOrigin = [info.geometry.lng, info.geometry.lat];
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];

    const modelAsMercatorCoordinate = mapboxGl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    // transformation parameters to position, rotate and scale the 3D model onto the map
    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since the 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    const customLayer = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // create two three.js lights to illuminate the model
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        const loader = new GLTFLoader();
        loader.load("/gltf-models/new_york_apartment/scene.gltf", (gltf) => {
          this.scene.add(gltf.scene);
        });
        this.map = map;

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });

        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };

    map.current.addLayer(customLayer, "waterway-label");
  };

  return (
    <>
      <div ref={mapContainer} className="map-container w-full h-96" />
    </>
  );
};

export default MapboxComp;
