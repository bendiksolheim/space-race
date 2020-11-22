import * as PIXI from "pixi.js";
import { Entity, PixiEntity, Key } from "ecs";
import Collidable from "../components/collidable";
import Controlled from "../components/controlled";
import Velocity from "../components/velocity";
import GameScene from "../components/game-scene";
import Polygon from "../components/polygon";
import { vec2D } from "../primitives/vec2d";

export default function initializeGameScene(
  stage: PIXI.Container
): [PIXI.Container, Entity[]] {
  const scene = new PIXI.Container();
  scene.name = "game-scene";
  // scene.width = stage.width;
  // scene.height = stage.height;
  const sceneEntity = new PixiEntity();
  sceneEntity.addDisplayObject(scene, stage);
  sceneEntity.add(new GameScene());

  const entities = [
    sceneEntity,
    player(window.innerWidth / 2, window.innerHeight / 2, scene),
    // player(12.5, 16, scene),
    // wall((window.innerWidth / 3) * 2, (window.innerHeight / 3) * 2, scene),
    wall(100, 100, scene),
  ];

  return [scene, entities];
}

export function player(x: number, y: number, stage: PIXI.Container): Entity {
  const points = [vec2D(0, 32), vec2D(12.5, 0), vec2D(25, 32), vec2D(12.5, 25)];
  const path = points.map((p) => [p.x, p.y]).flat();
  const g = new PIXI.Graphics();
  g.name = "player";
  g.pivot.set(12.5, 16);
  g.lineStyle(3, 0xcecece, 1, 0);
  g.drawPolygon(path);
  g.x = x;
  g.y = y;

  const player = new PixiEntity();
  player.addDisplayObject(g, stage);
  player.add(new Controlled(Key.Up, Key.Left, Key.Right));
  player.add(new Velocity(0));
  player.add(new Polygon(points));
  return player;
}

export function wall(x: number, y: number, stage: PIXI.Container): Entity {
  const points = [vec2D(0, 0), vec2D(0, 100)];
  const path = points.map((p) => [p.x, p.y]).flat();
  const g = new PIXI.Graphics();
  g.name = "wall";
  g.lineStyle(3, 0xcecece, 1);
  g.drawPolygon(path);
  g.x = x;
  g.y = y;

  const wall = new PixiEntity();
  wall.addDisplayObject(g, stage);
  wall.add(new Collidable());
  wall.add(new Polygon(points));
  return wall;
}
