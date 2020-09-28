import { Component } from "ecs";

class Size implements Component {
  name = "size";
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export default Size;
