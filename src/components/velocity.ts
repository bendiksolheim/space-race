import { Component } from "@bendiksolheim/ecs";

class Velocity implements Component {
  name = "velocity";
  forward: number;
  left: number;
  right: number;

  constructor(forward: number, left: number = 0, right: number = 0) {
    this.forward = forward;
    this.left = left;
    this.right = right;
  }
}

export default Velocity;
