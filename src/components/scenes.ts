import { Component } from "@bendiksolheim/ecs";
import * as PIXI from "pixi.js";

class Scenes implements Component {
  name = "scenes";
  game: PIXI.Container;
  menu: PIXI.Container;

  constructor(game: PIXI.Container, menu: PIXI.Container) {
    this.game = game;
    this.menu = menu;
  }
}

export default Scenes;
