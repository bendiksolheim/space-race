import { Component } from "ecs";

export type Color = {
  r: number;
  g: number;
  b: number;
};

export interface Square {
  kind: "square";
  width: number;
  height: number;
}

export interface Circle {
  kind: "circle";
  radius: number;
}

export type Shape = Circle | Square;

class Appearance implements Component {
  name = "appearance";
  color: Color;
  shape: Shape;

  constructor(color: Color, shape: Shape) {
    this.color = color;
    this.shape = shape;
  }
}

export default Appearance;
