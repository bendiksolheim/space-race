import Appearance, { Color } from "../components/appearance";
import Position from "../components/position";
import { World, renderSystem, Entity, Component } from "ecs";
import Displayable from "../components/displayable";
import Rotation from "../components/rotation";
import Velocity from "../components/velocity";

export default renderSystem(
  [Displayable],
  (entities: Entity[], lag: number, world: World) => {
    entities.forEach((entity) => {
      const { ref } = entity.get(Displayable);
      ifHas(entity, Position, (position) => {
        ref.x = position.x;
        ref.y = position.y;
      });

      ifHas(entity, Rotation, (rotation) => {
        ref.rotation = rotation.angle;
      });
    });
  }
);

function ifHas<C extends Component>(
  entity: Entity,
  component: new (...args: any) => C,
  fn: (component: C) => void
) {
  if (entity.has(component)) {
    fn(entity.get(component));
  }
}
