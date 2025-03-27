import "bulma/css/bulma.min.css";
import React, { useState, useCallback } from "react";
import { Pause, Play, XCircle, Globe } from "react-feather";
import { Grid } from "../engine/Grid";
import { Cell } from "../engine/Cell";
import { RuleEngine } from "../engine/RuleEngine";
import { IGrid } from "../interfaces/IGrid";
import "./ReactRenderer.css";

const numRows = 25;
const numCols = 35;

const createEmptyGrid = (): Grid => {
  return new Grid(numCols, numRows, () => new Cell());
};

const createRandomGrid = (): Grid => {
  const grid = new Grid(numCols, numRows, () => new Cell());
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      grid.getCell(x, y).setAlive(Math.random() > 0.7);
    }
  }
  return grid;
};

const ReactRenderer: React.FC = () => {
  const [grid, setGrid] = useState<IGrid>(() => createRandomGrid());
  const [running, setRunning] = useState(false);
  const runningRef = React.useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    const ruleEngine = new RuleEngine();
    const newGrid = ruleEngine.applyRules(grid);
    setGrid(newGrid);
  }, [grid]);

  React.useEffect(() => {
    const interval = setInterval(runSimulation, 150);
    return () => clearInterval(interval);
  }, [runSimulation]);

  return (
    <div className="container has-text-centered py-5">
      <h1 className="title is-uppercase">SOLID Game of Life</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        {Array.from({ length: numRows }, (_, i) =>
          Array.from({ length: numCols }, (_, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = grid.clone();
                newGrid.getCell(k, i).setAlive(!grid.getCell(k, i).isAlive());
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid.getCell(k, i).isAlive() ? "#F68E5F" : undefined,
                border: "1px solid #595959",
              }}
            ></div>
          ))
        )}
      </div>

      <div className="buttons is-centered pt-5">
        <button
          className="button start-game mx-2"
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
            }
          }}
        >
          <span className="icon">{running ? <Pause /> : <Play />}</span>
          <span>{running ? "Stop" : "Start"}</span>
        </button>

        <button
          className="button mx-2"
          onClick={() => {
            setGrid(createRandomGrid());
          }}
        >
          <span className="icon">
            <Globe />
          </span>
          <span>Random</span>
        </button>

        <button
          className="button mx-2"
          onClick={() => {
            setGrid(createEmptyGrid());
          }}
        >
          <span className="icon">
            <XCircle />
          </span>
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
};

export default ReactRenderer;
