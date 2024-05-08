import React from 'react';
import './styles/highLight.scss';

interface HighlightProps {
  expression: string;
}

const HighlightConverter: React.FC<HighlightProps> = ({ expression }) => {
  const convertExpression = (expression: string): JSX.Element => {
    let converted = expression.replace(/\^(\d+)/g, (_, group) => `<sup>${group}</sup>`);
    converted = converted.replace(/sqrt\((.+?)\)/g, (_, group) => `√<span class="Mathsqrt">${group}</span>`);
    
    converted = converted.replace(/\/(?=[^\{\}]*})/g, '</span><span class="divisionLine"></span><span class="divisition">');
    const terms = converted.split(/([+-])/);

    return (
      <span className="mathExpression">
        {terms.map((term, index) => (
          <span key={index}>
            {/* If it's an operator (+ or -), just display it */}
            {term.match(/[+-]/) ? term : <span dangerouslySetInnerHTML={{ __html: term }} />}
          </span>
        ))}
      </span>
    );
  };

  const convertedExpression = convertExpression(expression);

  return <span className="highlightConverter">{convertedExpression}</span>;
};

export default HighlightConverter;