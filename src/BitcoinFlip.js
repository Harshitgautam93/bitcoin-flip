import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BitcoinFlip = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Background color
    scene.background = new THREE.Color(0x000000);

    // Ambient light for consistent illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Lower intensity
    scene.add(ambientLight);

    // Point lights for even illumination from various angles
    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 1);
    pointLight3.position.set(10, -10, -10);
    scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0xffffff, 1);
    pointLight4.position.set(-10, 10, -10);
    scene.add(pointLight4);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    const coinTexture = textureLoader.load('/bitcoin.png', () => {
      console.log('Texture loaded successfully!');
    }, undefined, (err) => {
      console.error('Texture loading failed', err);
    });

    // Enhanced material to reduce light effects
    const material = new THREE.MeshStandardMaterial({
      map: coinTexture,
      metalness: 0.1,    // Less metalness to reduce reflectiveness
      roughness: 0.1,    // Slightly rougher for more consistent appearance
    });

    // Coin geometry
    const geometry = new THREE.CylinderGeometry(3, 3, 0.4, 100);
    const bitcoinMesh = new THREE.Mesh(geometry, material);
    bitcoinMesh.position.set(-10, 0, 0); // Move coin further to the left
    scene.add(bitcoinMesh);

    // Camera position
    camera.position.set(0, 0, 10);

    // Starfield with larger particles
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

    // Animation (coin flipping + moving stars)
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the coin
      bitcoinMesh.rotation.x += 0.02;
      bitcoinMesh.rotation.y += 0.02;

      // Slight rotation for stars
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default BitcoinFlip;
