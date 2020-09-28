import Appearance, { Color } from "../components/appearance";
import {
  World,
  renderSystem,
  Entity,
  Component,
  Rotation,
  Displayable,
  Position,
} from "ecs";
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
