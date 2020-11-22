import { Rect } from "../primitives/rect";
import { Vec2D } from "../primitives/vec2d";

export function containsPoint(rect: Rect, point: Vec2D): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x2 &&
    point.y >= rect.y &&
    point.y <= rect.y2
  );
}

export function cartesianProduct<T>(a: Array<T>, b: Array<T>): Array<[T, T]> {
  const ts: Array<[T, T]> = [];
  a.forEach((v1) => {
    b.forEach((v2) => ts.push([v1, v2]));
  });

  return ts;
}
