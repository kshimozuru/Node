import React from 'react';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface NodeGlowProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
}

export function NodeGlow({ position, scale = 1.1, color = '#3b82f6' }: NodeGlowProps) {
  return (
    <group position={position}>
      <Sphere args={[1 * scale, 32, 32]} scale={[2, 1, 0.2]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      <Sphere args={[0.8 * scale, 32, 32]} scale={[1.8, 0.9, 0.15]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}