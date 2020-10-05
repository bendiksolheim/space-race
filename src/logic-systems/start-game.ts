import StartGame from "../components/events/start-game";
import Alive from "../components/alive";
import Controlled from "../components/controlled";
import { logicSystem } from "ecs";

export default logicSystem(
  { players: [Controlled], events: [StartGame] },
  (entities, world) => {
    entities.events.forEach((event) => {
      world.removeEntity(event.id);

      entities.players.forEach((player) => {
        player.add(new Alive());
      });
    });
  }
);
