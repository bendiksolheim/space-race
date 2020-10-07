import { World, Entity } from "ecs";
import collision from "./logic-systems/collision";
import input from "./logic-systems/input";
import physics from "./logic-systems/physics";
import pixiApplication from "./pixi/app";
import initializeGameScene from "./pixi/game-scene";
import initializeMenuScene from "./pixi/menu-scene";
import renderGame from "./render-systems/game";
import mouseListener from "./logic-systems/mouse-listener";
import startGame from "./logic-systems/start-game";
import Scenes from "./components/scenes";
import PixiFps from "pixi-fps";

const pixi = pixiApplication();
const fpsCounter = new PixiFps();

document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.appendChild(pixi.view);

const [gameScene, gameEntities] = initializeGameScene();
const [menuScene, menuEntities] = initializeMenuScene();

const scenes = new Entity();
scenes.add(new Scenes(gameScene, menuScene));

pixi.stage.addChild(gameScene);
pixi.stage.addChild(menuScene);

const entities = gameEntities.concat(menuEntities).concat([scenes]);
const logicSystems = [mouseListener, startGame, input, physics, collision];
const renderConfig = {
  fps: 60,
  debug: false,
};

const world = new World(
  pixi.view,
  entities,
  logicSystems,
  [renderGame],
  renderConfig
);

world.start();
