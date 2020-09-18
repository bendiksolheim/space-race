import Appearance from "../components/appearance";
import Position from "../components/position";
import Velocity from "../components/velocity";
import { World, system, Entity } from "ecs";
import boundingBox from "../math/bounding-box";
import { rect, Rect } from "../primitives/rect";

export default system(
  [Position, Velocity, Appearance],
  (entities: Entity[], world: World) => {
    const worldBounds = worldBox(world);
    entities.forEach((entity) => {
      const position = entity.get(Position);
      const velocity = entity.get(Velocity);
      const bounds = boundingBox(position, entity.get(Appearance));
      if (bounds.x1 <= worldBounds.x1 || bounds.x2 >= worldBounds.x2) {
        velocity.x *= -1;
      } else if (bounds.y1 <= worldBounds.y1) {
        velocity.y *= -1;
      }
    });
  }
);

function worldBox(world: World): Rect {
  const canvas = world.canvas;
  return rect(0, 0, canvas.width, canvas.height);
}
