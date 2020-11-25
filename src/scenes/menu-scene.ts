import * as PIXI from "pixi.js";
import { Entity, PixiEntity, World } from "@bendiksolheim/ecs";
import StartGame from "../components/events/start-game";
import Clickable from "../components/clickable";

export default function initializeMenuScene(
  stage: PIXI.Container
): [PIXI.Container, Entity[]] {
  const scene = new PIXI.Container();

  const entities = [background(scene), button(scene)];

  return [scene, entities];
}

function background(stage: PIXI.Container): Entity {
  const g = new PIXI.Graphics();
  g.name = "menu-background";
  g.beginFill(0x000000, 0.8);
  g.drawRect(0, 0, window.innerWidth, window.innerHeight);
  g.endFill();

  const entity = new PixiEntity();
  entity.addDisplayObject(g, stage);
  return entity;
}

function button(scene: PIXI.Container): Entity {
  const width = 100;
  const height = 30;
  const x = scene.width / 2 - width / 2;
  const y = scene.height / 2 - height / 2;

  const clickable = new Clickable((world: World) => {
    const e = new Entity();
    e.add(new StartGame());
    world.addEntity(e);
  });

  const button = new PIXI.Graphics();
  button.x = x;
  button.y = y;
  button.name = "button-background";
  button.beginFill(0x000000);
  button.drawRect(0, 0, width, height);
  button.endFill();
  button.lineStyle(2, 0xffffff, 0.9, 0);
  button.drawRect(1, 1, width - 2, height - 2);

  const text = new PIXI.Text("Start", { fontFamily: "Arial", fill: 0xffffff });
  button.addChild(text);

  const entity = new PixiEntity();
  entity.add(clickable);
  entity.addDisplayObject(button, scene);

  return entity;
}
