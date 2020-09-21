import { Entity, Key, logicSystem, World } from "ecs";
import Controlled from "../components/controlled";
import Position from "../components/position";
import Rotation from "../components/rotation";
import Velocity from "../components/velocity";

export default logicSystem(
  [Controlled, Position, Rotation, Velocity],
  (entities: Entity[], world: World) => {
    entities.forEach((entity) => {
      const rotation = entity.get(Rotation);
      const velocity = entity.get(Velocity);

      if (world.keyboard.pressed(Key.Left)) {
        rotation.angle = (rotation.angle - ANGLE_DELTA) % FULL_CIRCLE;
      }
      if (world.keyboard.pressed(Key.Right)) {
        rotation.angle = (rotation.angle + ANGLE_DELTA) % FULL_CIRCLE;
      }
      if (world.keyboard.pressed(Key.Up)) {
        velocity.x += SPEED * Math.cos(rotation.angle - Math.PI / 2);
        velocity.y += SPEED * Math.sin(rotation.angle - Math.PI / 2);
      }
    });
  }
);

const FULL_CIRCLE = 2 * Math.PI;
const ANGLE_DELTA = FULL_CIRCLE / 60;
const SPEED = 0.25;
