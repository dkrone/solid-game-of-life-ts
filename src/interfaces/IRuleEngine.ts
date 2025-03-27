import { IGrid } from './IGrid';

// IRuleEngine.ts
export interface IRuleEngine {
    applyRules(grid: IGrid): IGrid;
  }

  