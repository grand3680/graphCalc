export const formulaReplace = (val: string) => {
  var correctFormla: string = val.replaceAll(' ', '');

  var typeFunc: string = 'y';
  if (correctFormla.includes('=')) {
    const parts: string[] = correctFormla.split('=');
    typeFunc = parts[0].trim();
    correctFormla = parts[1].trim();
  }

  const replacements: { [key: string]: string } = {
    pi: 'Math.PI',
    e: 'Math.E',
    '\\^': '**',
    'abs\\(([^)]+)\\)': '(Math.abs($1))',
    '\\|([^|]+)\\|': '(Math.abs($1))',
    'sqrt\\(([^)]+)\\)': '(Math.sqrt($1))',
    'ln\\(([^)]+)\\)': '(Math.log($1))',
    'log\\(([^),]+),([^)]+)\\)': '(Math.log($1)/Math.log($2))',

    'arcsin\\(([^)]+)\\)': '(Math.asin($1))',
    'arccos\\(([^)]+)\\)': '(Math.acos($1))',
    'arctg\\(([^)]+)\\)': '(Math.atan($1))',
    'arctan\\(([^)]+)\\)': '(Math.atan($1))',
    'arcctg\\(([^)]+)\\)': '(Math.PI/2-Math.atan($1))',

    '(?:^|(?<=[+\\-*/]))sin\\(([^)]+)\\)': '(Math.sin($1))',
    '(?:^|(?<=[+\\-*/]))cos\\(([^)]+)\\)': '(Math.cos($1))',
    '(?:^|(?<=[+\\-*/]))tg\\(([^)]+)\\)': '(Math.tan($1))',
    '(?:^|(?<=[+\\-*/]))tan\\(([^)]+)\\)': '(Math.tan($1))',
    '(?:^|(?<=[+\\-*/]))ctg\\(([^)]+)\\)': '(1/Math.tan($1))',

    '(\\w+)!': 'frac($1)',
    '\\(([^)]+)\\)!': 'frac($1)',
  };

  function insertMultiplicationOperators(expression: string): string {
    const patterns = [/(\d)([a-zA-Z])/g, /(\))([xy0-9])/g, /([xy])(\()/g, /([xy])([a-zA-Z])/g];

    patterns.forEach((pattern) => {
      while (pattern.test(expression)) {
        expression = expression.replace(pattern, '$1*$2');
      }
    });

    return expression;
  }
  correctFormla = insertMultiplicationOperators(correctFormla);

  for (const key in replacements) {
    if (Object.prototype.hasOwnProperty.call(replacements, key)) {
      const regexPattern: RegExp = new RegExp(`${key}`, 'g');
      correctFormla = correctFormla.replace(regexPattern, replacements[key]);
    }
  }
  console.log(val, correctFormla);
  return [correctFormla, typeFunc];
};
