import { Component } from "ecs";

class Collidable implements Component {
  name = "collision";
  collision: true;

  constructor() {
    this.collision = true;
  }
}

export default Collidable;
