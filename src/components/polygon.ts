import { Component } from "@bendiksolheim/ecs";
import { Vec2D, vec2D } from "../primitives/vec2d";

class Polygon implements Component {
  name = "polygon";
  points: Array<Vec2D>;

  constructor(points: Array<Vec2D>) {
    this.points = points;
  }

  globalPoints(reference: Vec2D): Array<Vec2D> {
    return this.points.map((v) => vec2D(v.x + reference.x, v.y + reference.y));
  }
}

export default Polygon;
