// ConsoleRenderer.ts
import { RendererBase } from './RendererBase';
import { IGrid } from '../interfaces/IGrid';

export class ConsoleRenderer extends RendererBase {
  render(grid: IGrid): void {
    this.logRender();
    // ... draw the grid to console
  }
}
