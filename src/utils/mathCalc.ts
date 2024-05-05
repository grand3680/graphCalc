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