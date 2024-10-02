'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const AnimatedModel = ({ scale = 1, offsetX = 1 }) => {
  const groupRef = useRef();
  const gltf = useLoader(GLTFLoader, '/plus.glb');

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const scaleFactor = scale / Math.max(size.x, size.y, size.z);
    gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Offset the model on the X-axis
    gltf.scene.position.x = offsetX;
  }, [gltf, scale, offsetX]);

  // Rotate the group around its origin (pivot point) on the X-axis
  useFrame(() => {
    groupRef.current.rotation.y += 0.01; // Adjust this value for rotation speed
    if (groupRef.current.rotation.y >= 2 * Math.PI) {
      groupRef.current.rotation.y -= 2 * Math.PI; // Reset after a full rotation
    }
  });

  // Apply a glossy material to the model
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshPhysicalMaterial({
        color: 'red',
        roughness: 0.1,
        metalness: 1,
        reflectivity: 1,
        clearcoat: 1,
      });
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const Scene = () => {
  return (
    <div style={{ height: '300px' }} >
    <Canvas orthographic camera={{ zoom: 200, position: [0, 0, 5] }}>
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1} position={[10, 10, 5]} />
      <Environment preset="city" />
      <AnimatedModel scale={1.5} offsetX={-0.5} /> {/* Adjust offsetX for the pivot point */}
      <OrbitControls enableZoom={false} />
    </Canvas>
    </div>
  );
};

export default Scene;
