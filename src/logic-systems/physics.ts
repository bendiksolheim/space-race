import { Entity, logicSystem, World, Position, Rotation } from "ecs";
import Velocity from "../components/velocity";
import { Rect, rect } from "../primitives/rect";

export default logicSystem(
  { movables: [Position, Velocity, Rotation] },
  (entities, world) => {
    entities.movables.forEach((entity) => {
      const position = entity.get(Position);
      const velocity = entity.get(Velocity);
      const rotation = entity.get(Rotation);

      rotation.angle += velocity.left;
      rotation.angle -= velocity.right;

      const vx = velocity.forward * Math.cos(rotation.angle - Math.PI / 2);
      const vy = velocity.forward * Math.sin(rotation.angle - Math.PI / 2);
      // velocity.x += SPEED * Math.cos(rotation.angle - Math.PI / 2);
      // velocity.y += SPEED * Math.sin(rotation.angle - Math.PI / 2);

      // if (Math.abs(velocity.x) < 0.01) {
      //   velocity.x = 0;
      // } else {
      //   velocity.x *= DEACCELERATION;
      // }

      // if (Math.abs(velocity.y) < 0.01) {
      //   velocity.y = 0;
      // } else {
      //   velocity.y *= DEACCELERATION;
      // }

      position.x += vx;
      position.y += vy;
    });
  }
);
