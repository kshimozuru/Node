import React, { useRef, useEffect } from 'react';
import { NetworkGrid } from './NetworkGrid';
import { DataPacketManager } from './DataPacket';
import { render } from './renderer';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let grid: NetworkGrid;
    const packetManager = new DataPacketManager();
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      grid = new NetworkGrid(canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let lastPacketTime = 0;
    const spawnPackets = (time: number) => {
      if (time - lastPacketTime > 100) {
        for (let i = 0; i < 5; i++) {
          const startNodeIndex = Math.floor(Math.random() * grid.nodes.length);
          const targetNodeIndex = grid.nodes[startNodeIndex].connections[
            Math.floor(Math.random() * grid.nodes[startNodeIndex].connections.length)
          ];
          
          if (targetNodeIndex !== undefined) {
            packetManager.addPacket(grid.nodes[startNodeIndex], targetNodeIndex);
          }
        }
        lastPacketTime = time;
      }
    };

    const animate = (time: number) => {
      grid.update(time); // ネットワークの回転を更新
      spawnPackets(time);
      packetManager.update(grid.nodes);

      render({
        ctx,
        width: canvas.width,
        height: canvas.height,
        time
      }, grid, packetManager.getPackets());

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-black"
    />
  );
}