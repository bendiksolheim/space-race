import { Component } from "ecs";

class Velocity implements Component {
  name = "velocity";
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default Velocity;
