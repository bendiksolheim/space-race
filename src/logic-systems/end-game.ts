import { logicSystem } from "@bendiksolheim/ecs";
import Alive from "../components/alive";
import EndGame from "../components/events/end-game";
import Scenes from "../components/scenes";

export default logicSystem(
  {
    players: [Alive],
    events: [EndGame],
    scenes: [Scenes],
  },
  (entities, world) => {
    entities.events.forEach((event) => {
      const scenes = entities.scenes[0].get(Scenes);
      world.removeEntity(event);

      entities.players.forEach((player) => player.remove(Alive));
      scenes.menu.visible = true;
    });
  }
);
