import Appearance, { Color } from "../components/appearance";
import {
  World,
  renderSystem,
  Entity,
  Component,
  Rotation,
  Displayable,
  Position,
  Pivot,
} from "ecs";
import Velocity from "../components/velocity";
import GameScene from "../components/game-scene";

export default renderSystem(
  { displayables: [Displayable] },
  (entities, lag, world) => {
    entities.displayables.forEach((entity) => {
      const { ref } = entity.get(Displayable);

      entity.ifHas(Position, (position) => {
        ref.x = position.x;
        ref.y = position.y;
      });

      entity.ifHas(Rotation, (rotation) => {
        ref.rotation = rotation.angle;
      });

      entity.ifHas(Pivot, (pivot) => {
        ref.pivot.x = pivot.x;
        ref.pivot.y = pivot.y;
      });
    });
  }
);
