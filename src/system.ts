import Entity from "./entity";
import World from "./world";

interface System {
  entities: Entity[];
  addEntities(entities: Entity[]): void;
  execute(world: World): void;
}

export default System;
