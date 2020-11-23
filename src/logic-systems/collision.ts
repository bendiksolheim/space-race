import {
  Entity,
  logicSystem,
  World,
  Size,
  Position,
  Displayable,
  Rotation,
  Pivot,
} from "@bendiksolheim/ecs";
import * as PIXI from "pixi.js";
import boundingBox from "../math/bounding-box";
import { Rect, rect } from "../primitives/rect";
import Controlled from "../components/controlled";
import { cartesianProduct } from "../math/math";
import intersects, { Collision, lineIntersects } from "../math/intersection";
import Collidable from "../components/collidable";
import Scenes from "../components/scenes";
import Alive from "../components/alive";
import Polygon from "../components/polygon";
import { line, Line } from "../primitives/line";
import { Vec2D, vec2D } from "../primitives/vec2d";
import GameScene from "../components/game-scene";
import EndGame from "../components/events/end-game";

export default logicSystem(
  {
    player: [Controlled, Alive, Polygon, Displayable],
    objs: [Collidable, Polygon, Displayable],
    scene: [Position, Pivot, Rotation, GameScene],
  },
  (entities, world) => {
    const player = entities.player[0];
    if (player == null) {
      return;
    }
    const playerRef = player.get(Displayable).ref;
    const playerLocation = playerRef.getGlobalPosition();
    // Need to compentate for pivot
    playerLocation.x -= playerRef.pivot.x;
    playerLocation.y -= playerRef.pivot.y;
    const playerBounds = playerRef.getBounds();

    entities.objs.forEach((obj) => {
      const objRef = obj.get(Displayable).ref;
      const objLocation = objRef.getGlobalPosition();
      const objBounds = objRef.getBounds();
      if (intersects(objBounds, playerBounds) !== Collision.NONE) {
        const playerPolygon = player.get(Polygon).globalPoints(playerLocation);
        const objPolygon = obj.get(Polygon).globalPoints(objLocation);

        const rotatedPlayer = rotatePoints(playerPolygon, playerLocation, 0);
        const rotatedObj = rotatePoints(
          objPolygon,
          objLocation,
          entities.scene[0].get(Rotation).angle
        );

        const playerLines = makeLines(rotatedPlayer);
        const objLines = makeLines(rotatedObj);
        const collision = cartesian(objLines, playerLines).some((v) =>
          lineIntersects(v[0], v[1])
        );

        if (collision) {
          const entity = new Entity();
          entity.add(new EndGame());
          world.addEntity(entity);
        }
      }
    });
  }
);

const rotatePoints = (points: Array<Vec2D>, around: Vec2D, byAngle: number) =>
  points.map((point) => rotatePoint(point, around, byAngle));

function rotatePoint(point: Vec2D, around: Vec2D, byAngle: number): Vec2D {
  const xT = point.x - around.x;
  const yT = point.y - around.y;

  const xR = xT * Math.cos(byAngle) - yT * Math.sin(byAngle);
  const yR = xT * Math.sin(byAngle) + yT * Math.cos(byAngle);

  return vec2D(xR + around.x, yR + around.y);
}

function makeLines(points: Array<Vec2D>): Array<Line> {
  if (points.length === 2) {
    // There is only one line with two points
    return [line(points[0], points[1])];
  } else {
    const rotated = rotate(points);
    return zip(points, rotated).map((v) => line(v[0], v[1]));
  }
}

function rotate<T>(a: Array<T>): Array<T> {
  return [...a.slice(1, a.length), a[0]];
}

function zip<T, U>(a: Array<T>, b: Array<U>): Array<[T, U]> {
  return a.map((v, i) => [v, b[i]]);
}

function cartesian<T, U>(a: Array<T>, b: Array<U>): Array<[T, U]> {
  return a.map((t) => b.map((u) => [t, u] as [T, U])).flat();
}
