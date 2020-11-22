import intersects, { lineIntersects } from "../../src/math/intersection";
import { vec2D } from "../../src/primitives/vec2d";

test("intersection same way", () => {
  const l1 = { from: vec2D(1, 1), to: vec2D(5, 3) };
  const l2 = { from: vec2D(2, 1), to: vec2D(4, 3) };
  expect(lineIntersects(l1, l2)).toBe(true);
});

test("intersection opposite way", () => {
  const l1 = { from: vec2D(1, 1), to: vec2D(5, 3) };
  const l2 = { from: vec2D(4, 3), to: vec2D(2, 1) };
  expect(lineIntersects(l1, l2)).toBe(true);
});

test("rising and falling line", () => {
  const l1 = { from: vec2D(1, 1), to: vec2D(5, 3) };
  const l2 = { from: vec2D(1, 2), to: vec2D(3, 1) };
  expect(lineIntersects(l1, l2)).toBe(true);
});

test("rising and falling line, opposite way", () => {
  const l1 = { from: vec2D(1, 1), to: vec2D(5, 3) };
  const l2 = { from: vec2D(3, 1), to: vec2D(1, 2) };
  expect(lineIntersects(l1, l2)).toBe(true);
});

test("rect intersection", () => {
  const r1 = { x: 826, y: 272, width: 28, height: 35, type: 1 };
  const r2 = {
    x: 798.3232385249029,
    y: 273.74374951048134,
    width: 77.343905457593,
    height: 72.47381963500408,
    type: 1,
  };
  expect(intersects(r1, r2)).not.toBe("NONE");
});
