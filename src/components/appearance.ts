import { Component } from "../component";

export type Color = {
  r: number;
  g: number;
  b: number;
};

class Appearance implements Component {
  name = "appearance";
  color: Color;
  size: number;

  constructor(color: Color, size: number) {
    this.color = color;
    this.size = size;
  }
}

export default Appearance;
