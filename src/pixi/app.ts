import * as PIXI from "pixi.js";

window.PIXI = PIXI;

export default function pixiApplication(): PIXI.Application {
  const pixi = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: 1,
    antialias: false,
  });

  pixi.view.style.display = "block";

  return pixi;
}
