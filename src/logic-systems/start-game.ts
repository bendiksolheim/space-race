import StartGame from "../components/events/start-game";
import Controlled from "../components/controlled";
import Scenes from "../components/scenes";
import { logicSystem, Key, Position, Rotation } from "@bendiksolheim/ecs";
import Alive from "../components/alive";
import Velocity from "../components/velocity";

export default logicSystem(
  {
    players: [Controlled, Position, Velocity, Rotation],
    events: [StartGame],
    scenes: [Scenes],
  },
  (entities, world) => {
    entities.events.forEach((event) => {
      world.removeEntity(event);

      entities.players.forEach((player) => {
        const position = player.get(Position);
        const velocity = player.get(Velocity);
        const rotation = player.get(Rotation);
        const scenes = entities.scenes[0].get(Scenes);
        velocity.forward = 0;
        rotation.angle = 0;
        position.x = 0;
        position.y = 0;
        scenes.menu.visible = false;
        player.add(new Alive(world.currentElapsedTime()));
      });
    });
  }
);
