import { Vector2, Node } from './types';

export class NetworkGrid {
  readonly nodes: Node[];
  readonly connections: [number, number][];
  private rotationAngle: number = 0;
  private readonly rotationSpeed: number = 0.0001; // 回転速度を遅くして安定感を出す

  constructor(width: number, height: number, nodeCount: number = 400) { // ノード数を400に増やす
    this.nodes = this.generateNodes(width, height, nodeCount);
    this.connections = this.generateConnections();
  }

  update(time: number) {
    this.rotationAngle = time * this.rotationSpeed;
    
    this.nodes.forEach(node => {
      const x = node.originalPosition.x - window.innerWidth / 2;
      const y = node.originalPosition.y - window.innerHeight / 2;
      
      node.position.x = x * Math.cos(this.rotationAngle) - y * Math.sin(this.rotationAngle) + window.innerWidth / 2;
      node.position.y = x * Math.sin(this.rotationAngle) + y * Math.cos(this.rotationAngle) + window.innerHeight / 2;
    });
  }

  private generateNodes(width: number, height: number, count: number): Node[] {
    const nodes: Node[] = [];
    const radiusMax = Math.min(width, height) * 0.45; // 分布範囲を少し広げる

    // 3層の円状に配置
    const layers = [0.4, 0.7, 1.0]; // 各層の半径の比率
    
    for (let i = 0; i < count; i++) {
      const layerIndex = Math.floor(i / (count / layers.length));
      const angle = (i * (Math.PI * 2)) / (count / layers.length);
      const radius = radiusMax * layers[layerIndex] * (0.9 + Math.random() * 0.2); // ±10%のランダム性
      
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;

      nodes.push({
        position: { x, y },
        originalPosition: { x, y },
        size: 0.8 + Math.random() * 1.2, // サイズ範囲を調整
        connections: []
      });
    }

    return nodes;
  }

  private generateConnections(): [number, number][] {
    const connections: [number, number][] = [];
    const nodeConnections = new Map<number, Set<number>>();
    this.nodes.forEach((_, i) => nodeConnections.set(i, new Set()));

    // 近接ノード接続
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const distances: Array<{ index: number; distance: number }> = [];

      for (let j = 0; j < this.nodes.length; j++) {
        if (i === j) continue;
        const otherNode = this.nodes[j];
        const distance = this.getDistance(node, otherNode);
        distances.push({ index: j, distance });
      }

      distances.sort((a, b) => a.distance - b.distance);

      // 近接ノードとの接続数を増やす
      const connectCount = 3 + Math.floor(Math.random() * 3); // 3-5個の接続
      for (let k = 0; k < Math.min(connectCount, distances.length); k++) {
        const targetIndex = distances[k].index;
        if (!nodeConnections.get(i)?.has(targetIndex)) {
          connections.push([i, targetIndex]);
          nodeConnections.get(i)?.add(targetIndex);
          nodeConnections.get(targetIndex)?.add(i);
          this.nodes[i].connections.push(targetIndex);
        }
      }
    }

    // ハブノードの作成（10%をハブに）
    const hubCount = Math.floor(this.nodes.length * 0.1);
    const potentialHubs = [...nodeConnections.entries()]
      .sort((a, b) => b[1].size - a[1].size)
      .slice(0, hubCount)
      .map(([index]) => index);

    // ハブ同士の接続を強化
    for (let i = 0; i < potentialHubs.length; i++) {
      for (let j = 0; j < potentialHubs.length; j++) {
        if (i === j) continue;
        const hub1 = potentialHubs[i];
        const hub2 = potentialHubs[j];
        if (!nodeConnections.get(hub1)?.has(hub2)) {
          connections.push([hub1, hub2]);
          nodeConnections.get(hub1)?.add(hub2);
          nodeConnections.get(hub2)?.add(hub1);
          this.nodes[hub1].connections.push(hub2);
        }
      }
    }

    return connections;
  }

  private getDistance(node1: Node, node2: Node): number {
    const dx = node1.position.x - node2.position.x;
    const dy = node1.position.y - node2.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}