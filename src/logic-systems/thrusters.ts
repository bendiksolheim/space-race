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
        velocity.right = SIDE_THRUSTER_SPEED;
      }

      if (world.keyboard.pressed(controls.right)) {
        velocity.left = SIDE_THRUSTER_SPEED;
      }

      if (world.keyboard.pressed(controls.forward)) {
        velocity.forward += FORWARD_THRUSTER_SPEED;
      }
    });
  }
);

const FULL_CIRCLE = 2 * Math.PI;
const FORWARD_THRUSTER_SPEED = 0.25;
const SIDE_THRUSTER_SPEED = FULL_CIRCLE / 120;
