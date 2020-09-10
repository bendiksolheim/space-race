import Appearance from "../components/appearance";
import Position from "../components/position";
import Velocity from "../components/velocity";
import { World, system, Entity } from "../ecs";
import boundingBox from "../math/bounding-box";

export default system(
  [Position, Velocity, Appearance],
  (entities: Entity[], world: World) => {
    const worldBox = world.boundingBox();
    entities.forEach((entity) => {
      const position = entity.get(Position);
      const velocity = entity.get(Velocity);
      const bounds = boundingBox(position, entity.get(Appearance));
      if (bounds.x1 <= worldBox.x1 || bounds.x2 >= worldBox.x2) {
        velocity.x *= -1;
      } else if (bounds.y1 <= worldBox.y1) {
        velocity.y *= -1;
      }
    });
  }
);
