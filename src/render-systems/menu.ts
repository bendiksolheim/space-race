import { Displayable, renderSystem, Entity, World } from "ecs";

export default renderSystem(
  { items: [Displayable] },
  (entities, lag, world) => {}
);
