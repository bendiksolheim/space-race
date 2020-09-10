import Component from "./component";
import Entity from "./entity";
import { Rect } from "../primitives/rect";
import { System } from "./system";

type ComponentList = Array<new (...args: any) => Component>;

export default class World {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  mouse: { x: number; y: number };
  systems: System[];
  entities: Map<ComponentList, Map<string, Entity>>;

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

    this.createEntityMapping(entities);
    this.createMouseListener();
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
    return {
      x1: 0,
      y1: 0,
      x2: this.canvas.width,
      y2: this.canvas.height,
      width: this.canvas.width,
      height: this.canvas.height,
    };
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
}

function filterEntities(
  entities: Record<string, Entity>,
  filter: ComponentList
): Entity[] {
  return Object.values(entities).filter((entity) => matches(entity, filter));
}

function matches(entity: Entity, filter: Filter): boolean {
  return filter.every((component) => entity.has(component));
}
