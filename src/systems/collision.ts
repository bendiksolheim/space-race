import Appearance from "../components/appearance";
import Collidable from "../components/collidable";
import Controlled from "../components/controlled";
import Position from "../components/position";
import Velocity from "../components/velocity";
import { Entity, logicSystem, World } from "ecs";
import boundingBox from "../math/bounding-box";
import { Rect } from "../primitives/rect";

export default logicSystem(
  [Position, Appearance],
  (entities: Entity[], world: World) => {
    const ball = entities.find((e) => e.has(Velocity));

    if (!ball) {
      return;
    }

    const bricks = entities.filter((e) => e.has(Collidable));
    const ballRect = boundingBox(ball.get(Position), ball.get(Appearance));

    bricks.forEach((brick) => {
      const brickRect = boundingBox(brick.get(Position), brick.get(Appearance));
      const c = collision(ballRect, brickRect);
      if (c !== undefined) {
        if (!brick.has(Controlled)) {
          world.removeEntity(brick.id);
        }
        switch (c) {
          case Collision.TOP:
            ball.get(Velocity).y *= -1;
            break;
          case Collision.BOTTOM:
            ball.get(Velocity).y *= -1;
            break;
          case Collision.LEFT:
            ball.get(Velocity).x *= -1;
            break;
          case Collision.RIGHT:
            ball.get(Velocity).x *= -1;
            break;
        }
      }
    });
  }
);

function collision(a: Rect, b: Rect): Collision | undefined {
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
