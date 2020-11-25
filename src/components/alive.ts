import { Component } from "@bendiksolheim/ecs";

export default class Alive implements Component {
  name = "alive";
  time = 0;

  constructor(time: number) {
    this.time = time;
  }
}
