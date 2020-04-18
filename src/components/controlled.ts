import { Component } from "../component";

class Controlled implements Component {
  name = "controlled";
  controlled: true;

  constructor() {
    this.controlled = true;
  }
}

export default Controlled;
