export type Vec2D = {
  x: number;
  y: number;
};

export function vec2D(x: number, y: number): Vec2D {
  return {
    x,
    y,
  };
}
