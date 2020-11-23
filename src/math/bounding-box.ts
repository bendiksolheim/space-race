import { Position, Size } from "@bendiksolheim/ecs";
import { Rect } from "../primitives/rect";

export default function boundingBox(position: Position, size: Size): Rect {
  return {
    x: position.x,
    y: position.y,
    x2: position.x + size.width,
    y2: position.y + size.height,
    width: size.width,
    height: size.height,
  };
}
