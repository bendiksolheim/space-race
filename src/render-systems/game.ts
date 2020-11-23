import {
  Displayable,
  Pivot,
  Position,
  renderSystem,
  Rotation,
} from "@bendiksolheim/ecs";

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
