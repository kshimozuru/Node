export interface Vector2 {
  x: number;
  y: number;
}

export interface Node {
  position: Vector2;
  originalPosition: Vector2; // 追加: 元の位置を保存
  size: number;
  connections: number[];
}

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
}

export interface DataPacket {
  position: Vector2;
  targetNodeIndex: number;
  progress: number;
  color: string;
  size: number;
}