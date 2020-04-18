import Entity from "./entity";
import Position from "./components/position";
import World from "./world";
import render from "./systems/render";
import input from "./systems/input";
import collision from "./systems/collision";
import Appearance from "./components/appearance";
import Controlled from "./components/controlled";
import Collidable from "./components/collidable";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

const player = new Entity();
player.add(Position, new Position(100, 100));
player.add(Appearance, new Appearance({ r: 100, g: 100, b: 100 }, 30));
player.add(Controlled, new Controlled());

const enemy = new Entity();
enemy.add(Position, new Position(200, 200));
enemy.add(Appearance, new Appearance({ r: 250, g: 0, b: 0 }, 15));
enemy.add(Collidable, new Collidable());

const entities: Record<string, Entity> = {
  [player.id]: player,
  [enemy.id]: enemy
};

const world = new World(canvas, entities);

const systems = [input, collision, render];

function gameLoop() {
  systems.forEach(system => system(world));

  requestAnimationFrame(gameLoop);
}

gameLoop();
