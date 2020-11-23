import { Component, Key } from "@bendiksolheim/ecs";

class Controlled implements Component {
  name = "controlled";
  forward: Key;
  left: Key;
  right: Key;

  constructor(forward: Key, left: Key, right: Key) {
    this.forward = forward;
    this.left = left;
    this.right = right;
  }
}

export default Controlled;
