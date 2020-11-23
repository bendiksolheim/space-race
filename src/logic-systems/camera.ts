import {
  Pivot,
  Position,
  Displayable,
  logicSystem,
  Rotation,
  Size,
} from "@bendiksolheim/ecs";
import Controlled from "../components/controlled";
import GameScene from "../components/game-scene";

export default logicSystem(
  {
    player: [Position, Rotation, Controlled],
    scene: [Position, Pivot, Rotation, GameScene],
  },
  (entities, world) => {
    const player = entities.player[0];
    const playerPosition = player.get(Position);
    const playerRotation = player.get(Rotation);
    const scene = entities.scene[0];
    const scenePivot = scene.get(Pivot);
    const scenePosition = scene.get(Position);
    const sceneRotation = scene.get(Rotation);

    scenePivot.x = playerPosition.x;
    scenePivot.y = playerPosition.y;
    scenePosition.x = world.pixi.view.width / 2;
    scenePosition.y = world.pixi.view.height / 2;
    sceneRotation.angle = -playerRotation.angle;
  }
);
