import { Component } from "./component";

export default class Entity {
  id: string;
  components: Map<new () => Component, Component>;

  constructor() {
    this.id = randomId();
    this.components = new Map();
  }

  add<C extends Component>(key: new (...args: any) => C, component: C) {
    this.components.set(key, component);
  }

  remove<C extends Component>(component: new (...args: any) => C) {
    this.components.delete(component);
  }

  has<C extends Component>(component: new (...args: any) => C): boolean {
    return this.components.has(component);
  }

  get<C extends Component>(component: new (...args: any) => C): C {
    return this.components.get(component) as C;
  }

  print() {
    const components = [...this.components];
    console.log(JSON.stringify({ id: this.id, components }, null, 4));
  }
}

let counter = 0;
function randomId(): string {
  let _counter = counter;
  counter += 1;
  return (
    Date.now().toString(16) +
    ((Math.random() * 100000000) | 0).toString(16) +
    _counter
  );
}
