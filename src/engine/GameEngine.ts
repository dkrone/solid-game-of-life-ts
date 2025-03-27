
import { IGrid } from '../interfaces/IGrid';
import { IRuleEngine } from '../interfaces/IRuleEngine';
import { IRenderer } from '../interfaces/IRenderer';

export class GameEngine {
  constructor(
    private grid: IGrid,
    private ruleEngine: IRuleEngine,
    private renderer: IRenderer
  ) {}

  tick(): void {
    this.grid = this.ruleEngine.applyRules(this.grid);
    this.renderer.render(this.grid);
  }

  start(interval: number): void {
    setInterval(() => this.tick(), interval);
  }
}


