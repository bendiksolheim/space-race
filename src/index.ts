import * as PIXI from "pixi.js";
import { World } from "ecs";
import { player } from "./entity-creator";
import { mkEntities } from "./entity-creator.ts";
import collision from "./systems/collision";
import input from "./systems/input";
import physics from "./systems/physics";
import render from "./systems/render";

const pixi = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: 1,
  antialias: false,
});

pixi.view.style.display = "block";

document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.appendChild(pixi.view);

const entities = mkEntities(
  player(window.innerWidth / 2, window.innerHeight / 2, pixi.stage)
);

const world = new World(
  pixi.view,
  entities,
  [input, physics, collision],
  [render],
  { fps: 60, debug: false }
);

world.start();
