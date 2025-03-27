// RendererBase.ts
import { IRenderer } from '../interfaces/IRenderer';
import { IGrid } from '../interfaces/IGrid';

export abstract class RendererBase implements IRenderer {
  abstract render(grid: IGrid): void;

  protected logRender(): void {
    console.log('Rendered at', new Date().toISOString());
  }
}


