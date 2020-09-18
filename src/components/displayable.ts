import { Component } from "ecs";
import * as PIXI from "pixi.js";

class Displayable implements Component {
  name = "displayable";
  ref: PIXI.DisplayObject;

  constructor(ref: PIXI.DisplayObject) {
    this.ref = ref;
  }
}

export default Displayable;
