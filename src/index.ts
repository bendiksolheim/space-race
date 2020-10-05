import { World } from "ecs";
import collision from "./logic-systems/collision";
import input from "./logic-systems/input";
import physics from "./logic-systems/physics";
import pixiApplication from "./pixi/app";
import initializeGameScene from "./pixi/game-scene";
import initializeMenuScene from "./pixi/menu-scene";
import renderGame from "./render-systems/game";
import mouseListener from "./logic-systems/mouse-listener";
import startGame from "./logic-systems/start-game";

const pixi = pixiApplication();

document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.appendChild(pixi.view);

const [gameScene, gameEntities] = initializeGameScene();
const [menuScene, menuEntities] = initializeMenuScene();

pixi.stage.addChild(gameScene);
pixi.stage.addChild(menuScene);
menuScene.visible = true;

const entities = gameEntities.concat(menuEntities);

const world = new World(
  pixi.view,
  entities,
  [mouseListener, startGame, input, physics, collision],
  [renderGame],
  { fps: 60, debug: false }
);

world.start();
