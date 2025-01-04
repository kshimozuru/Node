import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function WaveEffect() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 40, 128, 128);
    const pos = geo.attributes.position;
    const vertices = [];
    for (let i = 0; i < pos.count; i++) {
      vertices.push({
        x: pos.getX(i),
        y: pos.getY(i),
        z: pos.getZ(i),
        ox: pos.getX(i),
        oy: pos.getY(i),
        oz: pos.getZ(i)
      });
    }
    geo.userData.vertices = vertices;
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pos = geometry.attributes.position;
    const vertices = geometry.userData.vertices;

    for (let i = 0; i < pos.count; i++) {
      const vertex = vertices[i];
      const dist = new THREE.Vector2(vertex.ox, vertex.oy).length();
      const angle = time * 2 + dist * 0.5;
      const amp = Math.sin(angle) * 0.3;
      
      pos.setZ(i, vertex.oz + amp);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <meshStandardMaterial
        color="#2a0845"
        wireframe
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}