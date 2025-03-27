import { IGrid } from '../interfaces/IGrid';
import { ICell } from '../interfaces/ICell';
import { Cell } from './Cell';

export class Grid implements IGrid {
  private cells: ICell[][];

  constructor(private width: number, private height: number, cellFactory: () => ICell) {
    this.cells = Array.from({ length: height }, () =>
      Array.from({ length: width }, cellFactory)
    );
  }

  getCell(x: number, y: number): ICell {
    return this.cells[y][x];
  }

  setCell(x: number, y: number, cell: ICell): void {
    this.cells[y][x] = cell;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  clone(): Grid {
    const newGrid = new Grid(this.width, this.height, () => new Cell());
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        newGrid.getCell(x, y).setAlive(this.getCell(x, y).isAlive());
      }
    }
    return newGrid;
  }
}
