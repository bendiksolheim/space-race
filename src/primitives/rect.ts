export type Rect = {
  x: number;
  y: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
};

export function rect(x: number, y: number, x2: number, y2: number): Rect {
  return {
    x,
    y,
    x2,
    y2,
    width: x2 - x,
    height: y2 - y,
  };
}
