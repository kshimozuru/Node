import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  pulseColor?: string;
  pulseSpeed?: number;
}

export function ConnectionLine3D({ 
  start, 
  end, 
  pulseColor = '#60a5fa',
  pulseSpeed = 1
}: ConnectionLineProps) {
  const lineRef = useRef<THREE.Line>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const curve = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    
    // Add some curve height based on distance
    const distance = startVec.distanceTo(endVec);
    midPoint.z += distance * 0.2;

    return new THREE.CatmullRomCurve3([
      startVec,
      midPoint,
      endVec
    ]);
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame((state) => {
    if (!materialRef.current) return;
    const time = state.clock.elapsedTime * pulseSpeed;
    
    // パルスアニメーション
    materialRef.current.opacity = 0.3 + Math.sin(time) * 0.3;
    materialRef.current.dashOffset = time;
    
    // 色の変化
    const hue = (Math.sin(time * 0.1) + 1) * 0.1;
    materialRef.current.color.setHSL(hue, 0.8, 0.6);
  });

  return (
    <group>
      {/* メインライン */}
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial
          ref={materialRef}
          color={pulseColor}
          transparent
          opacity={0.7}
          linewidth={2}
          blending={THREE.AdditiveBlending}
          dashSize={0.5}
          gapSize={0.2}
        />
      </line>
      
      {/* グロー効果 */}
      <line geometry={geometry}>
        <lineBasicMaterial
          color={pulseColor}
          transparent
          opacity={0.2}
          linewidth={4}
          blending={THREE.AdditiveBlending}
        />
      </line>
    </group>
  );
}