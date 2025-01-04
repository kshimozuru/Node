import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { NetworkNode3D } from './NetworkNode3D';
import { SourceNode3D } from './SourceNode3D';
import { ConnectionLine3D } from './ConnectionLine3D';
import { ParticleField } from './ParticleField';
import { WaveEffect } from './effects/WaveEffect';
import { GradientBackground } from './effects/GradientBackground';
import { calculateNodePositions } from './utils/nodePositions';
import type { NetworkDisplayProps } from './types';

export function Network3D({ title, description, confidence, imageUrl, sources, specifications }: NetworkDisplayProps) {
  const mainNodeRef = useRef();
  const sourcePositions = calculateNodePositions(sources.length);

  return (
    <div className="w-full h-[800px] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a0845] via-transparent to-transparent pointer-events-none z-10" />
      
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 2, 15]} fov={60} />
          <GradientBackground />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ff69b4" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00bfff" />
          
          <WaveEffect />
          <ParticleField />
          
          <NetworkNode3D
            ref={mainNodeRef}
            position={[0, 0, 0]}
            title={title}
            description={description}
            confidence={confidence}
            imageUrl={imageUrl}
            specifications={specifications}
          />

          {sources.map((source, index) => (
            <React.Fragment key={source.platform}>
              <SourceNode3D
                position={sourcePositions[index]}
                source={source}
              />
              <ConnectionLine3D
                start={[0, 0, 0]}
                end={sourcePositions[index]}
                pulseColor={
                  source.platform === 'amazon' ? '#ff69b4' : 
                  source.platform === 'youtube' ? '#00bfff' : '#9400d3'
                }
                pulseSpeed={1 + index * 0.2}
              />
            </React.Fragment>
          ))}

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={8}
            maxDistance={20}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}