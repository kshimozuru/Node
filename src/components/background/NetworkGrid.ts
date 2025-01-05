import { Vector3, Node } from './types';
import { Matrix3D } from './utils/matrix3d';

export class NetworkGrid {
  readonly nodes: Node[];
  readonly connections: [number, number][];
  private rotationX: number = 0;
  private rotationY: number = 0;
  private rotationZ: number = 0;
  private readonly rotationSpeedX: number = 0.00005; // より遅い回転
  private readonly rotationSpeedY: number = 0.00007;
  private readonly rotationSpeedZ: number = 0.00003;
  private selectedNodeScale: number = 1;

  constructor(width: number, height: number, nodeCount: number = 400) {
    this.nodes = this.generateNodes(width, height, nodeCount);
    this.connections = this.generateConnections();
  }

  update(time: number, selectedNodeIndex?: number) {
    // 各軸の回転角度を更新
    this.rotationX = time * this.rotationSpeedX;
    this.rotationY = time * this.rotationSpeedY;
    this.rotationZ = time * this.rotationSpeedZ;

    // 回転行列を計算
    const matrixX = Matrix3D.rotateX(this.rotationX);
    const matrixY = Matrix3D.rotateY(this.rotationY);
    const matrixZ = Matrix3D.rotateZ(this.rotationZ);
    
    // 行列を合成
    const matrix = Matrix3D.multiply(
      Matrix3D.multiply(matrixX, matrixY),
      matrixZ
    );

    this.nodes.forEach((node, index) => {
      const x = node.originalPosition.x - window.innerWidth / 2;
      const y = node.originalPosition.y - window.innerHeight / 2;
      const z = node.originalPosition.z;

      // 3D回転を適用
      const rotated = Matrix3D.transform(matrix, { x, y, z });
      
      node.position = {
        x: rotated.x + window.innerWidth / 2,
        y: rotated.y + window.innerHeight / 2,
        z: rotated.z
      };

      // 選択されたノードのスケールアニメーション
      if (selectedNodeIndex === index) {
        this.selectedNodeScale = Math.min(this.selectedNodeScale + 0.05, 3);
        node.scale = this.selectedNodeScale;
      } else {
        node.scale = 1;
      }
    });
  }

  private generateNodes(width: number, height: number, count: number): Node[] {
    const nodes: Node[] = [];
    const radiusMax = Math.min(width, height) * 0.45;
    const layers = [0.4, 0.7, 1.0];
    
    for (let i = 0; i < count; i++) {
      const layerIndex = Math.floor(i / (count / layers.length));
      const angle = (i * (Math.PI * 2)) / (count / layers.length);
      const radius = radiusMax * layers[layerIndex] * (0.9 + Math.random() * 0.2);
      
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 100; // Z軸方向にもばらつきを持たせる

      const position = { x, y, z };
      nodes.push({
        position: { ...position },
        originalPosition: position,
        size: 0.8 + Math.random() * 1.2,
        scale: 1,
        connections: []
      });
    }

    return nodes;
  }

  // ... 他のメソッドは変更なし
}