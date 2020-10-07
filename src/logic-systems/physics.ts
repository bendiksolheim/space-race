import { Entity, logicSystem, World, Position } from "ecs";
import Velocity from "../components/velocity";
import { Rect, rect } from "../primitives/rect";

export default logicSystem(
  { movables: [Position, Velocity] },
  (entities, world) => {
    entities.movables.forEach((entity) => {
      const position = entity.get(Position);
      const velocity = entity.get(Velocity);
      const { width, height } = worldBox(world);

      if (Math.abs(velocity.x) < 0.01) {
        velocity.x = 0;
      } else {
        velocity.x *= 0.999;
      }

      if (Math.abs(velocity.y) < 0.01) {
        velocity.y = 0;
      } else {
        velocity.y *= 0.999;
      }

      position.x += velocity.x;
      position.y += velocity.y;
    });
  }
);

function worldBox(world: World): Rect {
  const canvas = world.canvas;
  return rect(0, 0, canvas.width, canvas.height);
}
