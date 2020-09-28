import { Entity, World } from "ecs";
import * as PIXI from "pixi.js";
import Position from "../components/position";
import Displayable from "../components/displayable";
import Rotation from "../components/rotation";
import Size from "../components/size";

class PixiEntity extends Entity {
  addDisplayObject(obj: PIXI.Container, container: PIXI.Container) {
    container.addChild(obj);

    this.add(new Position(obj.x, obj.y));
    this.add(new Displayable(obj));
    this.add(new Rotation(obj.rotation));
    this.add(new Size(obj.width, obj.height));
  }
}

export default PixiEntity;
