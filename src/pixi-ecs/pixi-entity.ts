import { Entity, World } from "ecs";
import * as PIXI from "pixi.js";
import Position from "../components/position";
import Displayable from "../components/displayable";
import Rotation from "../components/rotation";

class PixiEntity extends Entity {
  addDisplayObject(obj: PIXI.DisplayObject, container: PIXI.Container) {
    container.addChild(obj);

    this.add(new Position(obj.x, obj.y));
    this.add(new Displayable(obj));
    this.add(new Rotation(obj.rotation));
  }
}

export default PixiEntity;
