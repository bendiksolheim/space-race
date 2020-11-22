import { Rect } from "../primitives/rect";
import { Line } from "../primitives/line";

type Intersectable = { x: number; y: number; width: number; height: number };

export default function intersects(
  a: Intersectable,
  b: Intersectable
): Collision {
  const w = 0.5 * (a.width + b.width);
  const h = 0.5 * (a.height + b.height);
  const dx = a.x + a.width / 2 - (b.x + b.width / 2);
  const dy = a.y + a.height / 2 - (b.y + b.height / 2);

  if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
    const wy = w * dy;
    const hx = h * dx;
    if (wy > hx) {
      if (wy > -hx) {
        return Collision.TOP;
      } else {
        return Collision.LEFT;
      }
    } else {
      if (wy > -hx) {
        return Collision.RIGHT;
      } else {
        return Collision.BOTTOM;
      }
    }
  } else {
    return Collision.NONE;
  }
}

export function lineIntersects(l1: Line, l2: Line): boolean {
  const dx = l1.to.x - l1.from.x;
  const dy = l1.to.y - l1.from.y;
  const determinant = dx * (l2.to.y - l2.from.y) - (l2.to.x - l2.from.x) * dy;

  // parallel lines
  if (determinant === 0) {
    return false;
  } else {
    const lambda =
      ((l2.to.y - l2.from.y) * (l2.to.x - l1.from.x) +
        (l2.from.x - l2.to.x) * (l2.to.y - l1.from.y)) /
      determinant;
    const gamma =
      ((l1.from.y - l1.to.y) * (l2.to.x - l1.from.x) +
        dx * (l2.to.y - l1.from.y)) /
      determinant;

    return 0 <= lambda && lambda <= 1 && 0 <= gamma && gamma <= 1;
  }
}

export enum Collision {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  NONE = "NONE",
}
