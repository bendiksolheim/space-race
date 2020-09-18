import Position from "../components/position";
import Velocity from "../components/velocity";
import { World, system, Entity } from "ecs";

export default system(
  [Position, Velocity],
  (entities: Entity[], world: World) => {
    entities.forEach((entity) => {
      const position = entity.get(Position);
      const velocity = entity.get(Velocity);
      position.x += velocity.x;
      position.y += velocity.y;
    });
  }
);
