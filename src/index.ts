import * as PIXI from "pixi.js";
import { World } from "ecs";
import { player, wall } from "./entity-creator";
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

const entities = [
  player(window.innerWidth / 2, window.innerHeight / 2, pixi.stage),
  wall(window.innerWidth, window.innerHeight, pixi.stage),
];

const world = new World(
  pixi.view,
  entities,
  [input, physics, collision],
  [render],
  { fps: 60, debug: false }
);

world.start();
