// IGrid.ts
import { ICell } from './ICell';

export interface IGrid {
    getCell(x: number, y: number): ICell;
    setCell(x: number, y: number, cell: ICell): void;
    getWidth(): number;
    getHeight(): number;
    clone(): IGrid;
}
  