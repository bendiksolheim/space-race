import { Entity, Key, logicSystem, Rotation, World } from "ecs";
import Controlled from "../components/controlled";
import Velocity from "../components/velocity";
import Alive from "../components/alive";

export default logicSystem(
  { players: [Controlled, Rotation, Velocity, Alive] },
  (entities, world) => {
    entities.players.forEach((entity) => {
      const rotation = entity.get(Rotation);
      const velocity = entity.get(Velocity);
      const controls = entity.get(Controlled);

      if (world.keyboard.pressed(controls.left)) {
        rotation.angle = (rotation.angle - ANGLE_DELTA) % FULL_CIRCLE;
      }

      if (world.keyboard.pressed(controls.right)) {
        rotation.angle = (rotation.angle + ANGLE_DELTA) % FULL_CIRCLE;
      }

      if (world.keyboard.pressed(controls.forward)) {
        velocity.x += SPEED * Math.cos(rotation.angle - Math.PI / 2);
        velocity.y += SPEED * Math.sin(rotation.angle - Math.PI / 2);
      }
    });
  }
);

const FULL_CIRCLE = 2 * Math.PI;
const ANGLE_DELTA = FULL_CIRCLE / 120;
const SPEED = 0.25;
