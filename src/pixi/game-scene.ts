import * as PIXI from "pixi.js";
import { Entity, PixiEntity, Key } from "ecs";
import Collidable from "../components/collidable";
import Controlled from "../components/controlled";
import Velocity from "../components/velocity";
import GameScene from "../components/game-scene";

export default function initializeGameScene(
  stage: PIXI.Container
): [PIXI.Container, Entity[]] {
  const scene = new PIXI.Container();
  scene.width = stage.width;
  scene.height = stage.height;
  const sceneEntity = new PixiEntity();
  sceneEntity.addDisplayObject(scene, stage);
  sceneEntity.add(new GameScene());

  const entities = [
    sceneEntity,
    player(window.innerWidth / 2, window.innerHeight / 2, scene),
    wall((window.innerWidth / 3) * 2, (window.innerHeight / 3) * 2, scene),
    wall(300, -100, scene),
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
  player.add(new Velocity(0));
  return player;
}

export function wall(x: number, y: number, stage: PIXI.Container): Entity {
  const path = [0, 0, 0, 100];
  const g = new PIXI.Graphics();
  g.lineStyle(3, 0xcecece, 1);
  g.drawPolygon(path);
  g.x = x;
  g.y = y;

  const wall = new PixiEntity();
  wall.addDisplayObject(g, stage);
  wall.add(new Collidable());
  return wall;
}
