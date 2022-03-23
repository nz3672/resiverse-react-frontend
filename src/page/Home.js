import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PointsMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { gsap, Power3 } from "gsap";
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from "react-transition-group";
import star from "./../img/three-asset/star1.png";
import globe from "./../gltf-models/globe.gltf";
import SignIn from "../components/SignInUp/SignIn";
import SignUp from "../components/SignInUp/SignUp";
import Search from "../components/search/Search";
import SideBar from "../components/sidebars/SideBar";
import GlobeWidget from "../components/globe/GlobeWidget";
import { useMousePosition } from "../utils/MouseEvent";
import {
  useElapsedTimeByRenderer,
  randomInteger,
  rgb,
  R,
  G,
  B,
  sNoise,
  fragmentShader,
  vertexShader,
} from "../utils/ThreeUtils";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, clickPopup } from "../components/features/popUpSlice";
import { Vector3 } from "three";

const Home = () => {
  const backgroundGalaxy = useRef(null);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const [fulldetails, setFullDetails] = useState(true);
  const [getRenderer, setRenderer] = useState(null);
  const [getScene, setScene] = useState(null);
  const [getCamera, setCamera] = useState(null);
  const mousePosition = useMousePosition();
  const [getParticleMesh, setParticleMesh] = useState(null);
  const [getGradientBgMesh, setGradientBgMesh] = useState(null);
  const [getGlobeMesh, setGlobeMesh] = useState(null);
  const [getHousepos, setHousepos] = useState({ x: 0, y: 0 });
  const { status } = useSelector((state) => state.popupSignInOut);
  const { sidebarstatus, widgetstatus } = useSelector(
    (state) => state.sidebarHome
  );

  const rotationArray = [
    { x: 2.403, y: -0.84, z: -3.142, housename: "Plane067" },
    { x: -0.324, y: 1.569, z: 0, housename: "Plane067" },
  ];

  let t = 0;
  let j = 0;
  let x = randomInteger(0, 32);
  let y = randomInteger(0, 32);
  let vCheck = false;

  useEffect(() => {
    // loader texture
    const loader = new THREE.TextureLoader();
    const circleParticle = loader.load(
      star,
      async (e) => {
        // console.log(e);
        await particleScene(circleParticle);
      },
      (e) => {
        // console.log(e);
      },
      (err) => {
        // console.log(err);
      }
    );

    return;
  }, []);

  useEffect(() => {
    // loader model
    if (getScene && !getGlobeMesh) {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(globe, (gltf) => {
        const root = gltf.scene;
        root.position.set(4, 0, -15);
        root.scale.multiplyScalar(2);
        setGlobeMesh(root);
        getScene.add(root);
      });
    }
    if (getGradientBgMesh && getRenderer && getGlobeMesh) {
      requestRef.current = requestAnimationFrame(animate);

      window.addEventListener("resize", handleResize);
      return () => cancelAnimationFrame(requestRef.current);
    }
    return;
  }, [getGradientBgMesh, getGlobeMesh]);

  useEffect(() => {
    handleGlobe();
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [sidebarstatus, widgetstatus]);

  const gradientBgMesh = () => {
    var randomisePosition = new THREE.Vector2(1, 2);

    let geometry = new THREE.PlaneGeometry(window.innerWidth / 2, 400);
    let material = new THREE.ShaderMaterial({
      uniforms: {
        u_bg: { type: "v3", value: rgb(15, 16, 61) },
        u_bgMain: { type: "v3", value: rgb(15, 16, 61) },
        u_color1: { type: "v3", value: rgb(15, 16, 61) },
        u_color2: { type: "v3", value: rgb(75, 25, 115) },
        u_time: { type: "f", value: 30 },
        u_randomisePosition: { type: "v2", value: randomisePosition },
      },
      fragmentShader: sNoise + fragmentShader,
      vertexShader: sNoise + vertexShader,
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-200, 270, -280);
    mesh.scale.multiplyScalar(5);
    mesh.rotationX = -1.0;
    mesh.rotationY = 0.0;
    mesh.rotationZ = 0.1;

    return mesh;
  };

  const particleScene = (circleParticle) => {
    // declare basic scene, camera, renderer threejs
    const camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    setScene(scene);
    setCamera(camera);

    // add renderer to the ref for dom element
    backgroundGalaxy.current.appendChild(renderer.domElement);

    // START galaxy particle
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 500;

    const posArray = new Float32Array(particlesCnt * 3);
    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    //add particles to the scene follow particle position that we just declared
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particleMaterial = new PointsMaterial({
      size: 0.01,
      map: circleParticle,
      transparent: true,
    });
    const particleMesh = new THREE.Points(particlesGeometry, particleMaterial);
    const gradientBg = gradientBgMesh();
    particleMesh.position.set(0, 0, -3);

    //TBD
    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(environment).texture;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color("#023d9c", "#bc42f5"));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.6;
    renderer.outputEncoding = THREE.sRGBEncoding;
    scene.add(particleMesh);
    scene.add(gradientBg);
    renderer.render(scene, camera);
    setParticleMesh(particleMesh);
    setRenderer(renderer);
    setGradientBgMesh(gradientBg);
  };

  const animate = () => {
    if (getGradientBgMesh && getRenderer) {
      requestRef.current = requestAnimationFrame(animate);
      getRenderer.render(getScene, getCamera);
      let gradientBg = getGradientBgMesh;
      gradientBg.material.uniforms.u_randomisePosition.value =
        new THREE.Vector2(j, j);

      gradientBg.material.uniforms.u_color1.value = new THREE.Vector3(
        R(x, y, t / 2),
        G(x, y, t / 2),
        B(x, y, t / 2)
      );

      gradientBg.material.uniforms.u_time.value = t;
      setGradientBgMesh(gradientBg);
      if (t % 0.1 == 0) {
        if (vCheck == false) {
          x -= 1;
          if (x <= 0) {
            vCheck = true;
          }
        } else {
          x += 1;
          if (x >= 32) {
            vCheck = false;
          }
        }
      }

      if (getGlobeMesh && !widgetstatus) {
        let globeMesh = getGlobeMesh;
        globeMesh.rotation.y -= 0.001;
        globeMesh.rotation.x += 0.001;
        setGlobeMesh(globeMesh);
      }

      // Increase t by a certain value every frame
      j = j + 0.01;
      t = t + 0.01;
    }
  };

  const handleResize = () => {
    if (getCamera && getRenderer) {
      getCamera.aspect = window.innerWidth / window.innerHeight;
      getCamera.updateProjectionMatrix();

      getRenderer.setSize(window.innerWidth, window.innerHeight);
    }
  };

  const handleGlobe = () => {
    if (getGlobeMesh) {
      if (sidebarstatus) {
        gsap.to(getGlobeMesh.position, {
          duration: 1.22,
          x: -6,
          y: -3,
          z: -19,
          ease: Power3.easeInOut,
        });
      } else {
        gsap.to(getGlobeMesh.position, {
          duration: 1.22,
          delay: 0.2,
          x: 4,
          y: 0,
          z: -15,
          ease: Power3.easeInOut,
        });
      }

      if (widgetstatus) {
        let positionRotate = Math.round(Math.random(0, 1));
        gsap.to(getGlobeMesh.rotation, {
          duration: 1.22,
          x: rotationArray[positionRotate].x,
          y: rotationArray[positionRotate].y,
          z: rotationArray[positionRotate].z,
          ease: Power3.easeInOut,
        });
        setHousepos(
          toScreenPosition(
            getGlobeMesh.getObjectByName(
              rotationArray[positionRotate].housename
            ),
            getCamera
          )
        );
      }
    }
  };

  const toScreenPosition = (obj, camera) => {
    let vector = new THREE.Vector3();

    let widthHalf = 0.5 * getRenderer.getContext().canvas.width;
    let heightHalf = 0.5 * getRenderer.getContext().canvas.height;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = vector.x * widthHalf + widthHalf;
    vector.y = -(vector.y * heightHalf) + heightHalf;

    return {
      x: vector.x,
      y: vector.y,
    };
  };

  const mousemove = () => {
    // if (getParticleMesh && getRenderer) {
    //   getParticleMesh.rotation.y =
    //     mousePosition.x * elapsedTimeByRenderer * 0.0000021;
    //   getParticleMesh.rotation.x =
    //     mousePosition.y * elapsedTimeByRenderer * 0.0000021;
    //   getRenderer.render(getScene, getCamera);
    // // }
  };

  return (
    <>
      <div
        ref={backgroundGalaxy}
        className="relative overflow-hidden bg-black h-screen w-screen text-white">
        <CSSTransition
          in={!sidebarstatus}
          timeout={{ enter: 4000, exit: 1000 }}
          classNames="fade"
          unmountOnExit
          appear>
          <div>
            <CSSTransition
              in={widgetstatus}
              timeout={{ enter: 4000, exit: 1000 }}
              classNames="fade"
              unmountOnExit
              appear>
              <GlobeWidget housepos={getHousepos} />
            </CSSTransition>
            <Search />
            {status == "SignIn" ? (
              <SignIn />
            ) : status == "SignUp" ? (
              <SignUp />
            ) : null}
          </div>
        </CSSTransition>

        <SideBar />
      </div>
    </>
  );
};

export default Home;
