import * as THREE from 'three';

export function calculateNodePositions(count: number): [number, number, number][] {
  const positions: [number, number, number][] = [];
  const radius = 5; // 中心からの距離
  const heightVariation = 2; // 高さのバリエーション
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    // 各ノードに異なる高さを与える
    const z = (Math.random() - 0.5) * heightVariation;
    positions.push([x, y, z]);
  }
  
  return positions;
}