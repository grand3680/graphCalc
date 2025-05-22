import { replacements } from '../config/replacements';

export const formulaReplace = (val: string) => {
  let correctFormla: string = val.replaceAll(' ', '');

  let typeFunc: string = 'y';
  if (correctFormla.includes('=')) {
    const parts: string[] = correctFormla.split('=');
    typeFunc = parts[0].trim();
    correctFormla = parts[1].trim();
  }

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

  return [correctFormla, typeFunc];
};
