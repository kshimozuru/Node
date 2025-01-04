import { Vector2 } from './types';

export class Particle {
  position: Vector2;
  velocity: Vector2;
  life: number;
  maxLife: number;
  
  constructor(x: number, y: number) {
    this.position = { x, y };
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 0.5;
    this.velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
    this.maxLife = 100 + Math.random() * 50;
    this.life = this.maxLife;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.life--;
  }

  get opacity() {
    return (this.life / this.maxLife) * 0.5;
  }
}