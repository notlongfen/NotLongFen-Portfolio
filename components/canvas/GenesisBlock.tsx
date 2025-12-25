"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;

void main() {
  vUv = uv;
  vPosition = position;
  
  vec3 pos = position;
  // Subtle breathing animation
  pos.y += sin(uTime * 0.5 + pos.x * 2.0) * 0.1;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;
uniform vec3 uColor;

// Pseudo-random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  // Grid pattern
  float grid = step(0.98, fract(vUv.x * 20.0)) + step(0.98, fract(vUv.y * 20.0));
  
  // Digital noise
  float noise = random(vUv * floor(uTime * 10.0));
  
  // Scanline
  float scanline = sin(vUv.y * 100.0 + uTime * 5.0) * 0.1;
  
  vec3 color = uColor;
  
  // Mix effects
  color += vec3(grid) * 0.5;
  color += vec3(noise) * 0.05;
  color += vec3(scanline);
  
  // Vignette
  float dist = distance(vUv, vec2(0.5));
  color *= 1.0 - dist * 1.5;

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function GenesisBlock() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#00f0ff") },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;

      // Update uniforms
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
      />
    </mesh>
  );
}
