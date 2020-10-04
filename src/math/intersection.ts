import { Rect } from "../primitives/rect";

export default function intersects(a: Rect, b: Rect): Collision | undefined {
  const w = 0.5 * (a.width + b.width);
  const h = 0.5 * (a.height + b.height);
  const dx = a.x1 + a.width / 2 - (b.x1 + b.width / 2);
  const dy = a.y1 + a.height / 2 - (b.y1 + b.height / 2);

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
    return undefined;
  }
}

enum Collision {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
}
