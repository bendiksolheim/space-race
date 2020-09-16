import Controlled from "../components/controlled";
import Position from "../components/position";
import { World, system, Entity, Key } from "../ecs";
import Rotation from "../components/rotation";
import Velocity from "../components/velocity";

export default system(
  [Controlled, Position, Rotation, Velocity],
  (entities: Entity[], world: World) => {
    entities.forEach((entity) => {
      const rotation = entity.get(Rotation);
      const velocity = entity.get(Velocity);
      const position = entity.get(Position);

      if (world.keyboard.pressed(Key.Left)) {
        rotation.angle = (rotation.angle - ANGLE_DELTA) % FULL_CIRCLE;
      }
      if (world.keyboard.pressed(Key.Right)) {
        rotation.angle = (rotation.angle + ANGLE_DELTA) % FULL_CIRCLE;
      }
      if (world.keyboard.pressed(Key.Up)) {
        velocity.x += SPEED * Math.cos(rotation.angle - Math.PI / 2);
        velocity.y += SPEED * Math.sin(rotation.angle - Math.PI / 2);

        position.x += velocity.x;
        position.y += velocity.y;
      }

      const { width, height } = world.boundingBox();
      // Black magic to make entity wrap around edges
      position.x = ((position.x % width) + width) % width;
      position.y = ((position.y % height) + height) % height;

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
    });
  }
);

const FULL_CIRCLE = 2 * Math.PI;
const ANGLE_DELTA = FULL_CIRCLE / 60;
const SPEED = 0.25;
