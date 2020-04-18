import { Component } from "../component";

class Health implements Component {
  name = "health";
  health: number;

  constructor(health: number = 20) {
    this.health = health;
  }
}

export default Health;
