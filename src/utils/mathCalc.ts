export const minMax = (v: number, minV: number, maxV: number) => (
  Math.min(maxV, Math.max(minV, v))
);

export const precision = (v: number, n = 1) => {
  n = Math.max(n | 0, 0);
  if (!n)
    return v;

  if (n === 1)
    return v | 0;

  return ((v / n) | 0) * n;
};

export const derivative = (func: (x: number) => number, x: number, h: number = 0.0001): number => {
  const slope = (func(x + h) - func(x)) / h;
  return slope;
}

export var gamma = (x: number): number => {
    if (Number.isInteger(x)) return frac(x);
  
    // Lanczos approximation constants
    const g = 7;
    const p = [
        0.99999999999980993,
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];

    if (x < 0.5) {
        return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
    } else {
        x -= 1;

        let a = p[0];
        let t = x + g + 0.5;
        for (let i = 1; i < p.length; i++) {
            a += p[i] / (x + i);
        }

        return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
    }
}


export var frac = (n : number) : number => {
  let res = 1;
  while (n > 1) {
    res *= n;
    n--;
  }
  return res;
}