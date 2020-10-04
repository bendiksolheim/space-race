import { Component, World } from "ecs";

type OnClick = (world: World) => void;

export default class Clickable implements Component {
  name = "clickable";
  onClick: OnClick;

  constructor(onClick: OnClick) {
    this.onClick = onClick;
  }
}
