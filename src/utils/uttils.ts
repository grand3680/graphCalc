export var frac = (n : number) : number => {
  if (n == 1) return 1;
  return n * frac(n - 1);
}


export var aproximiSin = (x : number) : number => {
    var sinA = 0;

    for (var i = 1; i < 200; i += 2) {
        if (i % 2 == 0) {
            sinA = sinA + ((Math.pow(x, i)) / frac(i))
        } else {
            sinA = sinA - ((Math.pow(x, i)) / frac(i))
        }
    }
    return sinA;
}
