import { World, Entity } from "@bendiksolheim/ecs";
import collision from "./logic-systems/collision";

import thrusters from "./logic-systems/thrusters";
import physics from "./logic-systems/physics";
import pixiApplication from "./app";
import initializeGameScene from "./scenes/game-scene";
import initializeMenuScene from "./scenes/menu-scene";
import renderGame from "./render-systems/game";
import mouseListener from "./logic-systems/mouse-listener";
import startGame from "./logic-systems/start-game";
import endGame from "./logic-systems/end-game";
import Scenes from "./components/scenes";
import PixiFps from "pixi-fps";
import camera from "./logic-systems/camera";
import slowdown from "./logic-systems/slowdown";

const pixi = pixiApplication();
const fpsCounter = new PixiFps();

document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.appendChild(pixi.view);

const [gameScene, gameEntities] = initializeGameScene(pixi.stage);
const [menuScene, menuEntities] = initializeMenuScene(pixi.stage);

const scenes = new Entity();
scenes.add(new Scenes(gameScene, menuScene));

pixi.stage.addChild(gameScene);
pixi.stage.addChild(menuScene);
// pixi.stage.addChild(fpsCounter);

const entities = gameEntities.concat(menuEntities).concat([scenes]);
const logicSystems = [
  mouseListener,
  startGame,
  endGame,
  thrusters,
  physics,
  collision,
  slowdown,
  camera,
];
const renderConfig = {
  fps: 60,
  debug: DEBUG,
};

const world = new World(
  pixi,
  entities,
  logicSystems,
  [renderGame],
  renderConfig
);

world.start();
