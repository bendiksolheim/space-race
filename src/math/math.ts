import { Rect } from "../primitives/rect";
import { Vec2D } from "../primitives/vec2d";

export function containsPoint(rect: Rect, point: Vec2D): boolean {
  return (
    point.x >= rect.x1 &&
    point.x <= rect.x2 &&
    point.y >= rect.y1 &&
    point.y <= rect.y2
  );
}
