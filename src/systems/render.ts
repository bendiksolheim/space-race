import System from "../system";
import Entity from "../entity";
import World from "../world";
import Appearance, { Color } from "../components/appearance";
import Position from "../components/position";
import { Component } from "../component";

function clear(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  context.save();

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.restore();
}

export default class Render implements System {
  entities: Entity[] = [];

  addEntities(entities: Entity[]): void {
    entities.forEach(entity => {
      if (entity.has(Appearance) && entity.has(Position)) {
        this.entities.push(entity);
      }
    });
  }

  execute(world: World): void {
    const { canvas, context } = world;
    clear(canvas, context);

    //const entities = world.getEntities<Component>([Position, Appearance]);

    this.entities.forEach(entity => {
      const { color, size } = entity.get(Appearance);
      const { x, y } = entity.get(Position);

      context.fillStyle = rgb(color);
      context.fillStyle = "rgba(0,0,0,1)";

      context.fillRect(x - size, y - size, size * 2, size * 2);
      context.strokeRect(x - size, y - size, size * 2, size * 2);
    });
  }
}

function rgb(color: Color) {
  return `rgb(${color.r},${color.g},${color.b})`;
}
