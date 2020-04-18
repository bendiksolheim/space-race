import System from "../system";
import Entity from "../entity";
import Controlled from "../components/controlled";
import World from "../world";
import Position from "../components/position";
import { Component } from "../component";

const input: System = (world: World) => {
  const entities = world.getEntities<Component>(Controlled, Position);
  entities.forEach(entity => {
    const mouse = world.mouse;
    const position = entity.get(Position);
    position.x = mouse.x;
    position.y = mouse.y;
  });
};

export default input;
