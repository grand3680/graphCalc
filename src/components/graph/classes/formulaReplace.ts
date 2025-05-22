import { replacements } from '../config/replacements';

export const formulaReplace = (val: string): [string, string] => {
  let correctFormula: string = val.replaceAll(' ', '');

  let typeFunc: string = 'y';
  if (correctFormula.includes('=')) {
    const parts: string[] = correctFormula.split('=');
    typeFunc = parts[0].trim();
    correctFormula = parts[1].trim();
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
  correctFormula = insertMultiplicationOperators(correctFormula);

  for (const key in replacements) {
    if (Object.prototype.hasOwnProperty.call(replacements, key)) {
      const regexPattern: RegExp = new RegExp(`${key}`, 'g');
      correctFormula = correctFormula.replace(regexPattern, replacements[key]);
    }
  }

  return [correctFormula, typeFunc];
};
