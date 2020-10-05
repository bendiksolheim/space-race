import * as PIXI from "pixi.js";
import { Entity, PixiEntity, Key } from "ecs";
import Collidable from "../components/collidable";
import Controlled from "../components/controlled";
import Velocity from "../components/velocity";
import Alive from "../components/alive";

export default function initializeGameScene(): [PIXI.Container, Entity[]] {
  const scene = new PIXI.Container();

  const entities = [
    player(window.innerWidth / 2, window.innerHeight / 2, scene),
    wall(window.innerWidth, window.innerHeight, scene),
  ];

  return [scene, entities];
}

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
  player.add(new Controlled(Key.Up, Key.Left, Key.Right));
  player.add(new Velocity(0, 0));
  // player.add(new Alive());
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
