import { Line, line } from "../primitives/line";
import { vec2D, Vec2D } from "../primitives/vec2d";

export default function translate(aLine: Line, toPoint: Vec2D): Line {
  const xDiff = toPoint.x - aLine.from.x;
  const yDiff = toPoint.y - aLine.from.y;
  const from = vec2D(0, 0);
  const to = vec2D(aLine.to.x + xDiff, aLine.to.y + yDiff);

  return line(from, to);
}
