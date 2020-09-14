import { Component } from "../ecs";

class Rotation implements Component {
  name = "rotation";
  angle: number;

  constructor(angle: number = 0) {
    this.angle = angle;
  }
}

export default Rotation;
