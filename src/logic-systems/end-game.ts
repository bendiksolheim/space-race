import { logicSystem } from "@bendiksolheim/ecs";
import Alive from "../components/alive";
import EndGame from "../components/events/end-game";
import Scenes from "../components/scenes";

export default logicSystem(
  {
    player: [Alive],
    events: [EndGame],
    scenes: [Scenes],
  },
  (entities, world) => {
    entities.events.forEach((event) => {
      const player = entities.player[0];
      const scenes = entities.scenes[0].get(Scenes);
      world.removeEntity(event);
      const alive = player.get(Alive);
      console.log(world.currentElapsedTime() - alive.time);

      player.remove(Alive);
      scenes.menu.visible = true;
    });
  }
);
