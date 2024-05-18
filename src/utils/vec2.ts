type TMutation = (x: number, y: number) => any;
type TPointVec2 = { x: number, y: number; };
type TTupleVec2 = [x: number, y: number];
type TSizeVec2 = { width: number, height: number; };
type TOffsetXY = { offsetX: number, offsetY: number; };

type TRect2 = [
  ...([x: number, y: number] | [xy: Vec2]),
  ...([w: number, h: number] | [wh: Vec2])
];

type TParameter = (
  never
  | []
  | [vec: Vec2]
  | [xy: TPointVec2]
  | [xy: number]
  | TTupleVec2
);

export function mutation<F extends TMutation>(args: TParameter, mutation: F): ReturnType<F> {
  var first = args[0] ?? 0;

  if (typeof first === 'number') {
    if (typeof args[1] === 'number')
      return mutation.call(null, first, args[1]);
    return mutation.call(null, first, first);
  }

  if (first && ('x' in first) && ('y' in first))
    return mutation.call(null, first.x, first.y);

  throw new Error('Unknown format');
}

export class Vec2 {
  read = false;
  x: number = 0;
  y: number = 0;

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }

  [Symbol.toStringTag]() {
    return this.toString();
  }

  toString() {
    return `${this.x} ${this.y}`;
  }

  get tuple(): TTupleVec2 {
    return [this.x, this.y];
  }

  get size(): TSizeVec2 {
    return {
      width: this.x,
      height: this.y
    };
  }

  get point(): TPointVec2 {
    return {
      x: this.x,
      y: this.y
    };
  }

  constructor(...args: TParameter) {
    this.set(...args);
  }

  equal(...args: TParameter) {
    return mutation(args, (x, y) => {
      return x === this.x && y === this.y;
    });
  }

  inRect(...args: TRect2) {
    const [x, y, w, h] = args.reduce<number[]>((acc, e) => (
      e instanceof Vec2 ? (
        acc.concat(e.x, e.y)
      ) : (
        acc.concat(e)
      )
    ), []);

    return (
      this.x >= x &&
      this.y >= y &&
      this.x <= w + x &&
      this.y <= h + y);
  }

  set(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x = x;
      this.y = y;
    });
    return this;
  }

  plus(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x += x;
      this.y += y;
    });
    return this;
  }

  minus(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x -= x;
      this.y -= y;
    });
    return this;
  }

  times(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x *= x;
      this.y *= y;
    });
    return this;
  }

  div(...args: TParameter) {
    mutation(args, (x, y) => {
      this.x /= x;
      this.y /= y;
    });
    return this;
  }

  clone() {
    return new Vec2(this);
  }

  cminus(...args: TParameter) {
    return this.clone().minus(...args);
  }

  static fromOffsetXY(offset: TOffsetXY, vec = new this()) {
    return vec.set(offset.offsetX, offset.offsetY);
  }


  cdiv(...args: TParameter) {
    return this.clone().div(...args);
  }
  ctimes(...args: TParameter) {
    return this.clone().times(...args);
  }

  static fromOffsetSize(elem: HTMLElement, vec = new this()) {
    return vec.set(elem.offsetWidth, elem.offsetHeight);
  }
}