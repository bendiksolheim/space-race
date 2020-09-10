import { mkBall, mkEntities, mkPaddle } from "./entity-creator.ts";
import { level1 } from "./levels";
import brickCollision from "./systems/brick-collision";
import input from "./systems/input";
import physics from "./systems/physics";
import render from "./systems/render";
import worldCollision from "./systems/world-collision";
import { World } from "./ecs";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.display = "block";
canvas.style.backgroundColor = "#000";
canvas.style.cursor = "none";

document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.appendChild(canvas);

const entities = mkEntities(mkPaddle(), mkBall(), ...level1());

const world = new World(canvas, entities, [
  input,
  physics,
  worldCollision,
  brickCollision,
  render,
]);

function gameLoop() {
  world.tick();

  requestAnimationFrame(gameLoop);
}

gameLoop();
