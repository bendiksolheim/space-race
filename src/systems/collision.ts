import System from "../system";
import Entity from "../entity";
import World from "../world";
import Appearance from "../components/appearance";
import Position from "../components/position";
import Controlled from "../components/controlled";
import Collidable from "../components/collidable";
import { Component } from "../component";

const collision: System = (world: World) => {
  const players = world.getEntities<Component>(
    Position,
    Appearance,
    Controlled
  );
  if (players.length === 0) {
    return;
  }
  const player = players[0];
  const enemies = world.getEntities<Component>(
    Position,
    Appearance,
    Collidable
  );
  const playerPosition = player.get(Position);
  const playerSize = player.get(Appearance).size;
  enemies.forEach(entity => {
    const entityPosition = entity.get(Position);
    const entitySize = entity.get(Appearance).size;
    const r1 = rect(playerPosition.x, playerPosition.y, playerSize);
    const r2 = rect(entityPosition.x, entityPosition.y, entitySize);

    if (intersects(r1, r2)) {
      if (playerSize > entitySize) {
        world.removeEntity(entity.id);
      }
    }

    return true;
  });
};

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

export default collision;
