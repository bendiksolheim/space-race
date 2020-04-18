import Entity from "./entity";
import Health from "./components/health";
import Position from "./components/position";
import World from "./world";
import Render from "./systems/render";
import Input from "./systems/input";
import Appearance from "./components/appearance";
import Controlled from "./components/controlled";
import Collidable from "./components/collidable";
import Collision from "./systems/collision";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

const world = new World(canvas);

const player = new Entity();
player.add(Health, new Health(20));
player.add(Position, new Position(100, 100));
player.add(Appearance, new Appearance({ r: 100, g: 100, b: 100 }, 20));
player.add(Controlled, new Controlled());

const enemy = new Entity();
enemy.add(Position, new Position(200, 200));
enemy.add(Appearance, new Appearance({ r: 250, g: 0, b: 0 }, 10));
enemy.add(Collidable, new Collidable());

const entities: Entity[] = [player, enemy];

const systems = [new Input(), new Collision(), new Render()];

systems.forEach(system => system.addEntities(entities));

function gameLoop() {
  systems.forEach(system => system.execute(world));

  requestAnimationFrame(gameLoop);
}

gameLoop();
