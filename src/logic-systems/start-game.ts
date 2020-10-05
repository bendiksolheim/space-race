import StartGame from "../components/events/start-game";
import Controlled from "../components/controlled";
import Scenes from "../components/scenes";
import { logicSystem, Key, Position, Rotation } from "ecs";
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
      world.removeEntity(event.id);

      entities.players.forEach((player) => {
        const position = player.get(Position);
        const velocity = player.get(Velocity);
        const rotation = player.get(Rotation);
        const scenes = entities.scenes[0].get(Scenes);
        velocity.x = 0;
        velocity.y = 0;
        player.add(new Alive());
        position.x = world.canvas.width / 2;
        position.y = world.canvas.height / 2;
        rotation.angle = 0;
        scenes.menu.visible = false;
        player.add(new Alive());
      });
    });
  }
);
