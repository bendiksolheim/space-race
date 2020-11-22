import { Vec2D } from "./vec2d";

export type Line = { from: Vec2D; to: Vec2D };

export function line(from: Vec2D, to: Vec2D): Line {
  return { from, to };
}
