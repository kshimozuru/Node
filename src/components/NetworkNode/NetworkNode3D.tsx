import React, { forwardRef } from 'react';
import { Text, Html } from '@react-three/drei';
import { NodeCard3D } from './NodeCard3D';
import type { MainNodeProps } from './types';

export const NetworkNode3D = forwardRef<THREE.Mesh, MainNodeProps>(
  ({ position, title, description, confidence, imageUrl, specifications }, ref) => {
    return (
      <group position={position}>
        <NodeCard3D ref={ref} />
        
        <group position={[0, 0, 0.1]}>
          <Text
            position={[0, 0.2, 0]}
            fontSize={0.15}
            color="#1f2937"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
          >
            {title}
          </Text>
          <Text
            position={[0, -0.1, 0]}
            fontSize={0.08}
            color="#4b5563"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
          >
            {description}
          </Text>
          
          <Html
            position={[0.8, 0.3, 0]}
            center
            distanceFactor={8}
          >
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {confidence}% Confidence
            </div>
          </Html>
        </group>
      </group>
    );
  }
);