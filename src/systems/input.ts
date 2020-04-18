import System from "../system";
import Entity from "../entity";
import Controlled from "../components/controlled";
import World from "../world";
import Position from "../components/position";

export default class Input implements System {
  entities: Entity[] = [];

  addEntities(entities: Entity[]): void {
    entities.forEach(entity => {
      if (entity.has(Controlled) && entity.has(Position)) {
        this.entities.push(entity);
      }
    });
  }

  execute(world: World): void {
    this.entities.forEach(entity => {
      const mouse = world.mouse;
      const position = entity.get(Position);
      position.x = mouse.x;
      position.y = mouse.y;
    });
  }
}
