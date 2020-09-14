import Component from "./component";
import Entity from "./entity";
import { Rect, rect } from "../primitives/rect";
import { System } from "./system";
import Keyboard, { Key } from "./keyboard";

type Filter = Array<new (...args: any) => Component>;

export default class World {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  mouse: { x: number; y: number };
  systems: System[];
  entities: Map<Filter, Map<string, Entity>>;
  keyboard: Keyboard;

  constructor(
    canvas: HTMLCanvasElement,
    entities: Record<string, Entity>,
    systems: System[]
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.mouse = { x: -100, y: -100 };
    this.systems = systems;
    this.entities = new Map();
    this.keyboard = new Keyboard();

    this.createEntityMapping(entities);
    this.createMouseListener();
    this.createKeyboardListener();
  }

  add(entity: Entity) {
    this.entities.forEach((entities, filter) => {
      if (matches(entity, filter)) {
        entities.set(entity.id, entity);
      }
    });
  }

  removeEntity(id: string) {
    this.entities.forEach((value) => {
      value.delete(id);
    });
  }

  boundingBox(): Rect {
    return rect(0, 0, this.canvas.width, this.canvas.height);
  }

  tick() {
    this.systems.forEach((system) => {
      const entities = Array.from(this.entities.get(system.filter)!.values());
      return system.tick(entities, this);
    });
  }

  createEntityMapping(entities: Record<string, Entity>) {
    this.systems.forEach((system) => {
      const entityMap = new Map();
      filterEntities(entities, system.filter).forEach((entity) => {
        entityMap.set(entity.id, entity);
      });
      this.entities.set(system.filter, entityMap);
    });
  }

  createMouseListener() {
    const canvasRect = this.canvas.getBoundingClientRect();
    this.canvas.addEventListener("mousemove", (ev) => {
      this.mouse.x = ev.clientX - canvasRect.left;
      this.mouse.y = ev.clientY - canvasRect.top;
    });
  }

  createKeyboardListener() {
    document.body.addEventListener("keydown", (ev) => {
      this.keyboard.press(ev.key);
    });

    document.body.addEventListener("keyup", (ev) => {
      this.keyboard.release(ev.key);
    });
  }
}

function filterEntities(
  entities: Record<string, Entity>,
  filter: Filter
): Entity[] {
  return Object.values(entities).filter((entity) => matches(entity, filter));
}

function matches(entity: Entity, filter: Filter): boolean {
  return filter.every((component) => entity.has(component));
}
