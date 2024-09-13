

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpaceSection = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const section = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, section.clientWidth / section.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(section.clientWidth, section.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    section.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0x000000);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const pointLights = [
      new THREE.PointLight(0xffffff, 1, 0),
      new THREE.PointLight(0xffffff, 1, 0),
      new THREE.PointLight(0xffffff, 1, 0),
      new THREE.PointLight(0xffffff, 1, 0)
    ];

    pointLights[0].position.set(10, 10, 10);
    pointLights[1].position.set(-10, -10, 10);
    pointLights[2].position.set(10, -10, -10);
    pointLights[3].position.set(-10, 10, -10);

    pointLights.forEach(light => scene.add(light));

    const textureLoader = new THREE.TextureLoader();
    const coinTexture = textureLoader.load('/bitcoin.png', () => {
      console.log('Texture loaded successfully!');
    }, undefined, (err) => {
      console.error('Texture loading failed', err);
    });

    const material = new THREE.MeshStandardMaterial({
      map: coinTexture,
      metalness: 0.1,
      roughness: 0.6,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 0
    });

    const geometry = new THREE.CylinderGeometry(3, 3, 0.4, 100);
    const bitcoinMesh = new THREE.Mesh(geometry, material);
    bitcoinMesh.position.set(-10, 0, 0);
    scene.add(bitcoinMesh);

    camera.position.set(0, 0, 10);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffcc,
      size: 3,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    function handleResize() {
      renderer.setSize(section.clientWidth, section.clientHeight);
      camera.aspect = section.clientWidth / section.clientHeight;
      camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      requestAnimationFrame(animate);
      bitcoinMesh.rotation.x += 0.02;
      bitcoinMesh.rotation.y += 0.02;
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      section.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default SpaceSection;
