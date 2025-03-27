import { ICell } from '../interfaces/ICell';

export class Cell implements ICell {
    constructor(private alive: boolean = false) {}
  
    isAlive(): boolean {
      return this.alive;
    }
  
    setAlive(alive: boolean): void {
      this.alive = alive;
    }
  }
  