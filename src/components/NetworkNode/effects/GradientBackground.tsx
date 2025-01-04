import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function GradientBackground() {
  const { scene } = useThree();
  
  React.useEffect(() => {
    const colors = [
      new THREE.Color('#2a0845'),
      new THREE.Color('#6441A5'),
      new THREE.Color('#2a0845')
    ];
    
    const geometry = new THREE.SphereGeometry(30, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: colors[0] },
        color2: { value: colors[1] },
        color3: { value: colors[2] }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        
        void main() {
          vec3 color = mix(color1, color2, vUv.y);
          color = mix(color, color3, pow(vUv.y, 2.0));
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.BackSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, [scene]);

  return null;
}