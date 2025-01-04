import React, { useRef } from 'react';
import { Text, Html, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { SourceNodeProps } from './types';

export function SourceNode3D({ position, source }: SourceNodeProps) {
  const nodeRef = useRef<THREE.Group>(null);
  const { platform, content, rating } = source;

  const platformColors = {
    amazon: '#ff9900',
    youtube: '#ff0000',
    x: '#1DA1F2'
  };

  useFrame((state) => {
    if (!nodeRef.current) return;
    // ゆらゆら浮遊するアニメーション
    nodeRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
    nodeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={nodeRef} position={position}>
      {/* プラットフォームアイコン */}
      <Sphere args={[0.4, 32, 32]}>
        <meshPhongMaterial
          color={platformColors[platform]}
          emissive={platformColors[platform]}
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* グロー効果 */}
      <Sphere args={[0.5, 32, 32]}>
        <meshBasicMaterial
          color={platformColors[platform]}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* プラットフォーム名 */}
      <Text
        position={[0, 0.7, 0]}
        fontSize={0.3}
        color={platformColors[platform]}
        anchorX="center"
        anchorY="middle"
      >
        {platform.toUpperCase()}
      </Text>

      {/* レーティングと内容 */}
      <Html
        position={[0, -0.7, 0]}
        center
        distanceFactor={8}
        occlude
      >
        <div className="bg-gray-900 bg-opacity-80 p-2 rounded-lg text-center w-32">
          {rating && (
            <div className="text-yellow-400 text-sm mb-1">
              ★ {rating.toFixed(1)}
            </div>
          )}
          <div className="text-white text-xs line-clamp-2">
            {content}
          </div>
        </div>
      </Html>
    </group>
  );
}