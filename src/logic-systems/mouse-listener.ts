import Clickable from "../components/clickable";
import { logicSystem, MouseClick, Position, Size } from "ecs";
import boundingBox from "../math/bounding-box";
import { Vec2D, vec2D } from "../primitives/vec2d";
import { containsPoint } from "../math/math";

export default logicSystem(
  { mouse: [MouseClick], clickables: [Clickable, Size, Position] },
  (entities, world) => {
    entities.mouse.forEach((mouse) => {
      const ev = mouse.get(MouseClick);
      const point = vec2D(ev.x, ev.y);
      entities.clickables.forEach((clickable) => {
        const rect = boundingBox(clickable.get(Position), clickable.get(Size));
        if (containsPoint(rect, point)) {
          const fn = clickable.get(Clickable);
          fn.onClick(world);
        }
      });
      world.removeEntity(mouse.id);
    });
  }
);
