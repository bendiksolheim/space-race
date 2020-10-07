import { logicSystem } from "ecs";
import Velocity from "../components/velocity";

export default logicSystem({ thrusters: [Velocity] }, (entities, world) => {
  entities.thrusters.forEach((thruster) => {
    const velocity = thruster.get(Velocity);

    if (Math.abs(velocity.forward) < 0.01) {
      velocity.forward = 0;
    } else {
      velocity.forward *= FORWARD_SLOWDOWN;
    }

    if (Math.abs(velocity.left) < 0.01) {
      velocity.left = 0;
    } else {
      velocity.left *= SIDE_SLOWDOWN;
    }

    if (Math.abs(velocity.right) < 0.01) {
      velocity.right = 0;
    } else {
      velocity.right *= SIDE_SLOWDOWN;
    }
  });
});

const FORWARD_SLOWDOWN = 0.99;
const SIDE_SLOWDOWN = 0.8;
