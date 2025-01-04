import React, { forwardRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { NodeGlow } from './NodeGlow';

export const NodeCard3D = forwardRef<THREE.Mesh, { scale?: [number, number, number] }>(
  ({ scale = [1, 1, 1] }, ref) => {
    return (
      <group>
        <NodeGlow position={[0, 0, -0.05]} scale={1.2} />
        <RoundedBox
          ref={ref}
          args={[2, 1, 0.1]}
          radius={0.05}
          smoothness={4}
          scale={scale}
        >
          <meshPhongMaterial
            color="#1e293b"
            transparent
            opacity={0.9}
            shininess={100}
          />
        </RoundedBox>
      </group>
    );
  }
);