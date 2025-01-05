import { RenderContext, Node, DataPacket } from './types';

function drawNode(
  ctx: CanvasRenderingContext2D,
  node: Node,
  time: number,
  isSelected: boolean
) {
  const z = Math.sin((node.position.x + node.position.y + time / 1000) / 150) * 30;
  const scale = ((1200 + z) / 1000) * node.scale;
  
  ctx.beginPath();
  ctx.arc(
    node.position.x,
    node.position.y + z,
    node.size * scale,
    0,
    Math.PI * 2
  );
  
  if (isSelected) {
    // 選択されたノードは明るく大きく表示
    ctx.fillStyle = `rgba(99, 102, 241, ${0.6 * scale})`;
    
    // グロー効果
    const gradient = ctx.createRadialGradient(
      node.position.x,
      node.position.y + z,
      0,
      node.position.x,
      node.position.y + z,
      node.size * scale * 2
    );
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
    
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(
      node.position.x,
      node.position.y + z,
      node.size * scale * 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();
  } else {
    ctx.fillStyle = `rgba(59, 130, 246, ${0.3 * scale})`;
  }
  
  ctx.fill();
}

// ... 他の関数は変更なし

export function render(
  { ctx, width, height, time, selectedNodeIndex }: RenderContext,
  grid: { nodes: Node[], connections: [number, number][] },
  packets: DataPacket[]
) {
  ctx.clearRect(0, 0, width, height);

  // Draw connections
  grid.connections.forEach(([startIndex, endIndex]) => {
    const startNode = grid.nodes[startIndex];
    const endNode = grid.nodes[endIndex];
    const isSelectedConnection = selectedNodeIndex === startIndex || selectedNodeIndex === endIndex;
    drawConnection(ctx, startNode, endNode, isSelectedConnection ? 0.5 : 0, time);
  });

  // Draw nodes
  grid.nodes.forEach((node, index) => {
    drawNode(ctx, node, time, index === selectedNodeIndex);
  });

  // Draw packets
  packets.forEach(packet => {
    drawPacket(ctx, packet);
  });
}