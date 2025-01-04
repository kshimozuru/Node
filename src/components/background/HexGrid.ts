import { Vector2 } from './types';

export class HexGrid {
  readonly size: number;
  readonly spacing: number;
  readonly nodes: Vector2[];

  constructor(width: number, height: number, spacing: number = 40) {
    this.spacing = spacing;
    this.size = spacing / 2;
    this.nodes = this.generateGrid(width, height);
  }

  private generateGrid(width: number, height: number): Vector2[] {
    const nodes: Vector2[] = [];
    const sqrt3 = Math.sqrt(3);
    
    // Calculate grid dimensions
    const hexWidth = this.spacing * 2;
    const hexHeight = this.spacing * sqrt3;
    
    // Add extra rows and columns to cover the screen
    const cols = Math.ceil(width / (hexWidth * 0.75)) + 1;
    const rows = Math.ceil(height / hexHeight) + 1;

    for (let row = -1; row < rows; row++) {
      const isEvenRow = row % 2 === 0;
      const xOffset = isEvenRow ? 0 : hexWidth * 0.5;
      
      for (let col = -1; col < cols; col++) {
        const x = col * hexWidth * 0.75 + xOffset;
        const y = row * hexHeight;
        
        nodes.push({ x, y });
      }
    }

    return nodes;
  }

  getNearbyNodes(point: Vector2, radius: number): Vector2[] {
    return this.nodes.filter(node => {
      const dx = node.x - point.x;
      const dy = node.y - point.y;
      return Math.sqrt(dx * dx + dy * dy) <= radius;
    });
  }
}