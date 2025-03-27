import { IRuleEngine } from '../interfaces/IRuleEngine';
import { IGrid } from '../interfaces/IGrid';
import { Cell } from './Cell';

export class RuleEngine implements IRuleEngine {
  applyRules(grid: IGrid): IGrid {
    const newGrid = grid.clone();

    for (let y = 0; y < grid.getHeight(); y++) {
      for (let x = 0; x < grid.getWidth(); x++) {
        const alive = grid.getCell(x, y).isAlive();
        const neighbors = this.countAliveNeighbors(grid, x, y);

        if (alive && (neighbors < 2 || neighbors > 3)) {
          newGrid.getCell(x, y).setAlive(false);
        } else if (!alive && neighbors === 3) {
          newGrid.getCell(x, y).setAlive(true);
        }
      }
    }

    return newGrid;
  }

  private countAliveNeighbors(grid: IGrid, x: number, y: number): number {
    const directions = [
      [-1, -1], [0, -1], [1, -1],
      [-1,  0],          [1,  0],
      [-1,  1], [0,  1], [1,  1],
    ];

    return directions.reduce((acc, [dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 && nx < grid.getWidth() &&
        ny >= 0 && ny < grid.getHeight() &&
        grid.getCell(nx, ny).isAlive()
      ) {
        acc++;
      }
      return acc;
    }, 0);
  }
}
