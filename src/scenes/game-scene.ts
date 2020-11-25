import * as PIXI from "pixi.js";
import { Entity, PixiEntity, Key } from "@bendiksolheim/ecs";
import Collidable from "../components/collidable";
import Controlled from "../components/controlled";
import Velocity from "../components/velocity";
import GameScene from "../components/game-scene";
import Polygon from "../components/polygon";
import { Vec2D, vec2D } from "../primitives/vec2d";
import { Line, line } from "../primitives/line";
import translate from "../math/translate";

const walls = [
  line(vec2D(-100, 50), vec2D(-100, -50)),
  line(vec2D(-100, -50), vec2D(-50, -100)),
  line(vec2D(-50, -100), vec2D(50, -100)),
  line(vec2D(50, -100), vec2D(100, -50)),
  line(vec2D(100, -50), vec2D(100, 50)),
];

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
    player(0, 0, scene),
    xAxis(scene),
    yAxis(scene),
  ].concat(walls.map((w) => wall(w, scene)));

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

export function wall(line: Line, stage: PIXI.Container): Entity {
  const localLine = translate(line, vec2D(0, 0));
  // We invert the y axis to get make positive Y upwards
  const points = [localLine.from, localLine.to].map((p) => vec2D(p.x, -p.y));
  const path = points.map((p) => [p.x, p.y]).flat();
  const g = new PIXI.Graphics();
  g.name = "wall";
  g.lineStyle(3, 0xcecece, 1);
  g.drawPolygon(path);
  g.x = line.from.x;
  // We invert the y axis to get make positive Y upwards
  g.y = line.from.y * -1;

  const wall = new PixiEntity();
  wall.addDisplayObject(g, stage);
  wall.add(new Collidable());
  wall.add(new Polygon(points));
  return wall;
}

function xAxis(stage: PIXI.Container): Entity {
  const from = vec2D(0, 0);
  const to = vec2D(1000, 0);
  const points = [from, to];
  const path = points.map((p) => [p.x, p.y]).flat();
  const g = new PIXI.Graphics();
  g.name = "axis";
  g.lineStyle(1, 0xff0000, 0.5);
  g.drawPolygon(path);
  g.x = -500;
  g.y = 0;

  const axis = new PixiEntity();
  axis.addDisplayObject(g, stage);
  return axis;
}

function yAxis(stage: PIXI.Container): Entity {
  const from = vec2D(0, 0);
  const to = vec2D(0, 1000);
  const points = [from, to];
  const path = points.map((p) => [p.x, p.y]).flat();
  const g = new PIXI.Graphics();
  g.name = "axis";
  g.lineStyle(1, 0xff0000, 0.5);
  g.drawPolygon(path);
  g.x = 0;
  g.y = -500;

  const axis = new PixiEntity();
  axis.addDisplayObject(g, stage);
  return axis;
}
