import Appearance from "./components/appearance";
import Collidable from "./components/collidable";
import Controlled from "./components/controlled";
import Velocity from "./components/velocity";
import { Entity, Position, PixiEntity } from "ecs";
import * as PIXI from "pixi.js";

const grey = { r: 100, g: 100, b: 100 };
const red = { r: 250, g: 0, b: 0 };
const black = { r: 0, g: 0, b: 0 };

export function player(x: number, y: number, stage: PIXI.Container): Entity {
  const path = [0, 32, 12.5, 0, 25, 32, 12.5, 25];
  const g = new PIXI.Graphics();
  g.pivot.set(16, 12.5);
  g.lineStyle(3, 0xcecece, 1);
  g.drawPolygon(path);
  g.x = x;
  g.y = y;

  const player = new PixiEntity();
  player.addDisplayObject(g, stage);
  player.add(new Collidable());
  player.add(new Controlled());
  player.add(new Velocity(0, 0));
  return player;
}

export function wall(
  width: number,
  height: number,
  stage: PIXI.Container
): Entity {
  const path = [0, 0, 0, 100];
  const g = new PIXI.Graphics();
  g.lineStyle(3, 0xcecece, 1);
  g.drawPolygon(path);
  g.x = (width / 3) * 2;
  g.y = (height / 3) * 2;

  const wall = new PixiEntity();
  wall.addDisplayObject(g, stage);
  wall.add(new Collidable());
  return wall;
}

export function mkPaddle(stage: PIXI.Container): Entity {
  const g = new PIXI.Graphics();
  g.beginFill(0xcecece);
  g.drawRect(100, 100, 150, 15);
  g.endFill();

  const player = new PixiEntity();
  player.addDisplayObject(g, stage);
  // player.add(new Position(100, 550));
  // player.add(new Appearance(grey, { kind: "square", width: 150, height: 15 }));
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
