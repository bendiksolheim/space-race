import * as PIXI from "pixi.js";
import { Entity, PixiEntity, World } from "ecs";
import StartGame from "../components/events/start-game";
import Clickable from "../components/clickable";

export default function initializeMenuScene(): [PIXI.Container, Entity[]] {
  const scene = new PIXI.Container();

  const entities = [background(scene), button(scene)];

  return [scene, entities];
}

function background(stage: PIXI.Container): Entity {
  const g = new PIXI.Graphics();
  g.beginFill(0x000000, 0.8);
  g.drawRect(0, 0, window.innerWidth, window.innerHeight);
  g.endFill();

  const entity = new PixiEntity();
  entity.addDisplayObject(g, stage);
  return entity;
}

function button(stage: PIXI.Container): Entity {
  const width = 100;
  const height = 30;

  const clickable = new Clickable((world: World) => {
    const e = new Entity();
    e.add(new StartGame());
    world.addEntity(e);
  });

  const button = new PIXI.Container();
  button.interactive = true;
  const background = new PIXI.Graphics();
  background.beginFill(0x000000);
  background.drawRect(0, 0, width, height);
  background.endFill();
  button.addChild(background);

  const border = new PIXI.Graphics();
  border.lineStyle(2, 0xffffff, 0.9, 0);
  border.drawRect(1, 1, width - 2, height - 2);
  button.addChild(border);

  const text = new PIXI.Text("Start", { fontFamily: "Arial", fill: 0xffffff });
  button.addChild(text);

  const entity = new PixiEntity();
  entity.add(clickable);
  entity.addDisplayObject(button, stage);

  return entity;
}
