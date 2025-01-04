import { RenderContext, Node, DataPacket } from './types';

function drawNode(
  ctx: CanvasRenderingContext2D,
  node: Node,
  time: number
) {
  const z = Math.sin((node.position.x + node.position.y + time / 1000) / 150) * 30;
  const scale = (1200 + z) / 1000;
  
  ctx.beginPath();
  ctx.arc(
    node.position.x,
    node.position.y + z,
    node.size * scale,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = `rgba(59, 130, 246, ${0.3 * scale})`; // 不透明度を上げる
  ctx.fill();
}

function drawConnection(
  ctx: CanvasRenderingContext2D,
  start: Node,
  end: Node,
  activity: number = 0,
  time: number
) {
  const startZ = Math.sin((start.position.x + start.position.y + time / 1000) / 150) * 30;
  const endZ = Math.sin((end.position.x + end.position.y + time / 1000) / 150) * 30;
  
  const startScale = (1200 + startZ) / 1000;
  const endScale = (1200 + endZ) / 1000;
  
  const gradient = ctx.createLinearGradient(
    start.position.x,
    start.position.y + startZ,
    end.position.x,
    end.position.y + endZ
  );
  
  const opacity = Math.min(startScale, endScale);
  const baseOpacity = 0.2; // 基本の不透明度を上げる
  gradient.addColorStop(0, `rgba(59, 130, 246, ${(baseOpacity + activity * 0.2) * opacity})`);
  gradient.addColorStop(1, `rgba(59, 130, 246, ${(baseOpacity + activity * 0.2) * opacity})`);

  ctx.beginPath();
  ctx.moveTo(start.position.x, start.position.y + startZ);
  ctx.lineTo(end.position.x, end.position.y + endZ);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 1.5 * ((startScale + endScale) / 2); // 線の太さを増やす
  ctx.stroke();
}

function drawPacket(
  ctx: CanvasRenderingContext2D,
  packet: DataPacket
) {
  ctx.beginPath();
  ctx.arc(packet.position.x, packet.position.y, packet.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * (1 - packet.progress)})`;
  ctx.fill();
}

export function render(
  { ctx, width, height, time }: RenderContext,
  grid: { nodes: Node[], connections: [number, number][] },
  packets: DataPacket[]
) {
  ctx.clearRect(0, 0, width, height);

  // Draw connections
  grid.connections.forEach(([startIndex, endIndex]) => {
    const startNode = grid.nodes[startIndex];
    const endNode = grid.nodes[endIndex];
    drawConnection(ctx, startNode, endNode, 0, time);
  });

  // Draw nodes
  grid.nodes.forEach(node => {
    drawNode(ctx, node, time);
  });

  // Draw packets
  packets.forEach(packet => {
    drawPacket(ctx, packet);
  });
}