import React, { useRef, useEffect } from 'react';
import { NetworkGrid } from './NetworkGrid';
import { DataPacketManager } from './DataPacket';
import { render } from './renderer';

interface AnimatedBackgroundProps {
  isZoomed?: boolean;
  selectedNodeIndex?: number;
}

export function AnimatedBackground({ 
  isZoomed = false, 
  selectedNodeIndex 
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const selectedNodeRef = useRef<number | undefined>(selectedNodeIndex);

  useEffect(() => {
    targetScaleRef.current = isZoomed ? 1.5 : 1; // 拡大率を1.5に増加
    selectedNodeRef.current = selectedNodeIndex;
  }, [isZoomed, selectedNodeIndex]);

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
      // スムーズなスケール変更
      const scaleDiff = targetScaleRef.current - scaleRef.current;
      if (Math.abs(scaleDiff) > 0.001) {
        scaleRef.current += scaleDiff * 0.05;
      }

      grid.update(time, selectedNodeRef.current);
      spawnPackets(time);
      packetManager.update(grid.nodes);

      ctx.save();
      // キャンバスの中心を基準に拡大
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(scaleRef.current, scaleRef.current);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      render({
        ctx,
        width: canvas.width,
        height: canvas.height,
        time,
        selectedNodeIndex: selectedNodeRef.current
      }, grid, packetManager.getPackets());

      ctx.restore();

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