import System from "../system";
import Entity from "../entity";
import World from "../world";
import Appearance from "../components/appearance";
import Position from "../components/position";
import Controlled from "../components/controlled";
import Collidable from "../components/collidable";

function clear(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  context.save();

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.restore();
}

export default class Collision implements System {
  player?: Entity;
  entities: Entity[] = [];

  addEntities(entities: Entity[]): void {
    entities.forEach(entity => {
      if (
        entity.has(Position) &&
        entity.has(Appearance) &&
        entity.has(Controlled)
      ) {
        this.player = entity;
      } else if (
        entity.has(Position) &&
        entity.has(Appearance) &&
        entity.has(Collidable)
      ) {
        this.entities.push(entity);
      }
    });
  }

  execute(world: World): void {
    if (this.player !== undefined) {
      const playerPosition = this.player.get(Position);
      const playerSize = this.player.get(Appearance).size;

      this.entities = this.entities.filter(entity => {
        const entityPosition = entity.get(Position);
        const entitySize = entity.get(Appearance).size;
        const r1 = rect(playerPosition.x, playerPosition.y, playerSize);
        const r2 = rect(entityPosition.x, entityPosition.y, entitySize);

        if (intersects(r1, r2)) {
          if (playerSize < entitySize) {
            return false;
          } else {
            this.player = undefined;
          }
        }

        return true;
      });
    }
  }
}

function intersects(a: Rect, b: Rect): boolean {
  return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
}

type Rect = { x1: number; y1: number; x2: number; y2: number };
function rect(x: number, y: number, size: number): Rect {
  return {
    x1: x - size,
    y1: y - size,
    x2: x + size * 2,
    y2: y + size * 2
  };
}
