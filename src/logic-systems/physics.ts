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

      position.x += vx;
      position.y += vy;
    });
  }
);
