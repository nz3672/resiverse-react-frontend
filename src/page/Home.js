import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PointsMaterial } from "three";
import star from "./../img/three-asset/star1.png";
import Search from "../components/search/Search";
import { useMousePosition } from "../utils/MouseEvent";
import { useElapsedTimeByRenderer } from "../utils/ThreeUtils";

const Home = () => {
  const backgroundGalaxy = useRef(null);
  const [renderer, setRenderer] = useState(null);
  const [getScene, setScene] = useState(null);
  const [getCamera, setCamera] = useState(null);
  const mousePosition = useMousePosition();
  const [getParticleMesh, setParticleMesh] = useState(null);
  const clock = new THREE.Clock();
  const elapsedTimeByRenderer = useElapsedTimeByRenderer(clock);

  useEffect(() => {
    // loader texture
    const loader = new THREE.TextureLoader();
    const circleParticle = loader.load(
      star,
      (e) => {
        // console.log(e);
        particleScene(circleParticle);
      },
      (e) => {
        // console.log(e);
      },
      (err) => {
        // console.log(err);
      }
    );

    return () => {};
  }, []);

  const particleScene = (circleParticle) => {
    // declare basic scene, camera, renderer threejs
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
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
      size: 0.005,
      map: circleParticle,
      transparent: true,
    });
    const particleMesh = new THREE.Points(particlesGeometry, particleMaterial);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color("#023d9c", "#bc42f5"));
    scene.add(particleMesh);
    renderer.render(scene, camera);
    setParticleMesh(particleMesh);
    setRenderer(renderer);
  };

  const backgroundColor = () => {};

  const mousemove = () => {
    if (getParticleMesh && renderer) {
      getParticleMesh.rotation.y =
        mousePosition.y * elapsedTimeByRenderer * 0.00005;
      renderer.render(getScene, getCamera);
    }
  };

  return (
    <>
      {/* <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3">
        Navbar
      </nav> */}
      <div
        ref={backgroundGalaxy}
        className="bg-black h-screen w-screen text-white"
      >
        {/* {mousemove()} */}
        <Search />
      </div>
    </>
  );
};

export default Home;
