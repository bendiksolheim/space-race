import { Entity, logicSystem, World, Size, Position } from "ecs";
import boundingBox from "../math/bounding-box";
import { Rect } from "../primitives/rect";
import Controlled from "../components/controlled";
import Alive from "../components/alive";
import intersects from "../math/intersection";
import Collidable from "../components/collidable";

export default logicSystem(
  {
    player: [Position, Size, Controlled],
    objs: [Position, Size, Collidable],
  },
  (entities, world) => {
    const player = entities.player[0];
    if (player == null) {
      return;
    }

    const playerRect = boundingBox(player.get(Position), player.get(Size));

    entities.objs.forEach((obj) => {
      const objRect = boundingBox(obj.get(Position), obj.get(Size));
      if (intersects(objRect, playerRect)) {
        player.remove(Alive);
      }
    });
  }
);
