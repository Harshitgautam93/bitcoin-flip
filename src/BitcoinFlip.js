import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BitcoinFlip = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Setting canvas size
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Append canvas to the mountRef
    const canvas = renderer.domElement;
    if (mountRef.current) {
      mountRef.current.appendChild(canvas);
    }

    // Background color
    scene.background = new THREE.Color(0x000000);

    // Ambient light for consistent illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Point lights
    const pointLights = [
      new THREE.PointLight(0xffffff, 1, 10, 10),
      new THREE.PointLight(0xffffff, 1, -10, -10),
      new THREE.PointLight(0xffffff, 1, 10, -10),
      new THREE.PointLight(0xffffff, 1, -10, 10),
    ];
    pointLights.forEach(light => scene.add(light));

    // Texture loader for coin
    const textureLoader = new THREE.TextureLoader();
    const coinTexture = textureLoader.load('/bitcoin.png', () => {
      console.log('Texture loaded successfully!');
    }, undefined, (err) => {
      console.error('Texture loading failed', err);
    });

    // Enhanced material for the Bitcoin coin
    const material = new THREE.MeshStandardMaterial({
      map: coinTexture,
      metalness: 0.1,
      roughness: 0.1,
    });

    // Bitcoin coin geometry
    const geometry = new THREE.CylinderGeometry(3, 3, 0.4, 100);
    const bitcoinMesh = new THREE.Mesh(geometry, material);
    bitcoinMesh.position.set(-10, 0, 0);
    scene.add(bitcoinMesh);

    // Planets creation and addition
    const createPlanet = (radius, textureUrl, position) => {
      const planetTexture = textureLoader.load(textureUrl);
      const planetMaterial = new THREE.MeshStandardMaterial({
        map: planetTexture,
        metalness: 0.2,
        roughness: 0.8,
      });
      const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
      planetMesh.position.set(...position);
      return planetMesh;
    };

    scene.add(createPlanet(2, '/planet1.jpg', [20, 10, -30]));
    scene.add(createPlanet(1.5, '/planet2.jpg', [-15, -5, 25]));
    scene.add(createPlanet(1, '/planet3.jpg', [0, -20, -50]));

    // Camera position
    camera.position.set(0, 0, 10);

    // Create star field
    const createStarField = (starCount, size, opacity) => {
      const starGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 3000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3000;
      }
      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: size,
        sizeAttenuation: true,
        opacity: opacity,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Points(starGeometry, starMaterial);
    };

    scene.add(createStarField(2000, 5, 0.5));
    scene.add(createStarField(1500, 3, 0.7));
    scene.add(createStarField(1000, 1, 0.9));

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      bitcoinMesh.rotation.x += 0.02;
      bitcoinMesh.rotation.y += 0.02;
      scene.children.forEach(child => {
        if (child instanceof THREE.Points) {
          child.rotation.x += 0.0005;
          child.rotation.y += 0.0005;
        }
      });
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
      // Ensure elements exist before manipulation
      if (mountRef.current && canvas) {
        mountRef.current.removeChild(canvas);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} className="threejs-canvas" />;
};

export default BitcoinFlip;
