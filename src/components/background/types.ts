export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Node {
  position: Vector3;
  originalPosition: Vector3;
  size: number;
  scale: number;
  connections: number[];
}

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
  selectedNodeIndex?: number;
}

export interface DataPacket {
  position: Vector3;
  targetNodeIndex: number;
  progress: number;
  color: string;
  size: number;
}