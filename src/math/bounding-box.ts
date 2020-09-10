import Appearance from "../components/appearance";
import Position from "../components/position";
import { Rect } from "../primitives/rect";

export default function boundingBox(
  position: Position,
  appearance: Appearance
): Rect {
  switch (appearance.shape.kind) {
    case "square":
      return {
        x1: position.x,
        y1: position.y,
        x2: position.x + appearance.shape.width,
        y2: position.y + appearance.shape.height,
        width: appearance.shape.width,
        height: appearance.shape.height,
      };
    case "circle":
      return {
        x1: position.x - appearance.shape.radius,
        y1: position.y - appearance.shape.radius,
        x2: position.x + appearance.shape.radius,
        y2: position.y + appearance.shape.radius,
        width: appearance.shape.radius * 2,
        height: appearance.shape.radius * 2,
      };
  }
}
