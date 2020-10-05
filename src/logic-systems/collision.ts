import { Entity, logicSystem, World, Size, Position } from "ecs";
import boundingBox from "../math/bounding-box";
import { Rect } from "../primitives/rect";
import Controlled from "../components/controlled";
import intersects from "../math/intersection";
import Collidable from "../components/collidable";
import Scenes from "../components/scenes";
import Alive from "../components/alive";

export default logicSystem(
  {
    player: [Position, Size, Controlled],
    objs: [Position, Size, Collidable],
    scenes: [Scenes],
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
        const scenes = entities.scenes[0].get(Scenes);
        scenes.menu.visible = true;
      }
    });
  }
);
