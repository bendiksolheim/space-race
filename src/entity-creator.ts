import Appearance from "./components/appearance";
import Collidable from "./components/collidable";
import Controlled from "./components/controlled";
import Position from "./components/position";
import Velocity from "./components/velocity";
import { Entity } from "./ecs";

const grey = { r: 100, g: 100, b: 100 };
const red = { r: 250, g: 0, b: 0 };
const black = { r: 0, g: 0, b: 0 };

export function mkPaddle(): Entity {
  const player = new Entity();
  player.add(new Position(100, 550));
  player.add(new Appearance(grey, { kind: "square", width: 150, height: 15 }));
  player.add(new Collidable());
  player.add(new Controlled());
  return player;
}

export function mkBall(): Entity {
  const ball = new Entity();
  ball.add(new Position(400, 300));
  ball.add(new Appearance(black, { kind: "circle", radius: 8 }));
  ball.add(new Velocity(3.5, 3.5));
  return ball;
}

export function mkBrick(
  x: number,
  y: number,
  width: number,
  height: number
): Entity {
  const brick = new Entity();
  brick.add(new Position(x, y));
  brick.add(
    new Appearance(red, { kind: "square", width: width, height: height })
  );
  brick.add(new Collidable());
  return brick;
}

export function mkEntities(...entities: Entity[]): Record<string, Entity> {
  const initial: Record<string, Entity> = {};
  return entities.reduce((prev, cur) => {
    prev[cur.id] = cur;
    return prev;
  }, initial);
}
