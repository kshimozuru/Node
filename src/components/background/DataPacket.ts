import { Vector2, Node, DataPacket } from './types';

export class DataPacketManager {
  private packets: DataPacket[] = [];
  
  addPacket(startNode: Node, targetNodeIndex: number) {
    this.packets.push({
      position: { ...startNode.position },
      targetNodeIndex,
      progress: 0,
      color: 'rgb(255, 255, 255)',
      size: 1.2 + Math.random() * 0.6 // サイズを適度に調整
    });
  }

  update(nodes: Node[]) {
    this.packets = this.packets.filter(packet => {
      const targetNode = nodes[packet.targetNodeIndex];
      packet.progress += 0.02;

      if (packet.progress >= 1) return false;

      const dx = targetNode.position.x - packet.position.x;
      const dy = targetNode.position.y - packet.position.y;
      
      packet.position.x += dx * 0.02;
      packet.position.y += dy * 0.02;

      return true;
    });
  }

  getPackets(): DataPacket[] {
    return this.packets;
  }
}