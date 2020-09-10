import Appearance, { Color } from "../components/appearance";
import Position from "../components/position";
import { World, system, Entity } from "../ecs";

function clear(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  context.save();

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.restore();
}

export default system(
  [Appearance, Position],
  (entities: Entity[], world: World) => {
    const { canvas, context } = world;
    clear(canvas, context);

    entities.forEach((entity) => {
      const { color, shape } = entity.get(Appearance);
      const position = entity.get(Position);

      switch (shape.kind) {
        case "square":
          drawSquare(context, color, shape.width, shape.height, position);
        case "circle":
          drawCircle(context, color, shape.radius, position);
      }
    });
  }
);

function drawSquare(
  context: CanvasRenderingContext2D,
  color: Color,
  width: number,
  height: number,
  position: Position
): void {
  const { x, y } = position;
  context.beginPath();
  context.fillStyle = rgb(color);
  context.strokeStyle = "rgba(0,0,0,1)";
  context.fillRect(x, y, width, height);
}

function drawCircle(
  context: CanvasRenderingContext2D,
  color: Color,
  radius: number,
  position: Position
): void {
  const { x, y } = position;
  context.beginPath();
  context.fillStyle = rgb(color);
  context.strokeStyle = "rgba(0,0,0,1)";
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
}

function rgb(color: Color) {
  return `rgb(${color.r},${color.g},${color.b})`;
}
