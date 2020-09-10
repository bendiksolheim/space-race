import { Entity } from "./ecs";
import { mkBrick } from "./entity-creator";

export function level1(): Entity[] {
  const cols = 6;
  const rows = 6;
  const width = 100;
  const height = 20;
  const xPadding = 10;
  const yPadding = 10;
  const leftPadding = 60;
  const topPadding = 60;

  const bricks = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      bricks.push(
        mkBrick(
          leftPadding + xPadding + x * width + x * xPadding,
          topPadding + yPadding + y * height + y * yPadding,
          width,
          height
        )
      );
    }
  }

  return bricks;
}
