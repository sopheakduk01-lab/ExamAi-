import React from 'react';

interface MathFormattedTextProps {
  text: string;
  className?: string;
  as?: 'p' | 'span' | 'h2' | 'h3' | 'div';
}

/**
 * A specialized component to render Khmer math text with elegant mathematical
 * formatting for vertical fractions, mixed numbers, exponents, equations, and operators.
 */
export const MathFormattedText: React.FC<MathFormattedTextProps> = ({
  text,
  className = '',
  as: Component = 'span'
}) => {
  if (!text) return null;

  // Helper to render formatted segment
  const renderFormattedString = (str: string) => {
    // Split by mixed fractions, standalone fractions, formulas, superscripts
    // 1. Regex to catch mixed numbers or standalone fractions like:
    //    "3 (1/2)", "12 1/4", "(3/4)", "8/15", "a/b"
    //    or superscripts like cm², cm³, m², km², a³, R²

    // Tokenize string safely
    // Match fractions like (num/den) or num/den or whole number + (num/den)
    const tokens: React.ReactNode[] = [];
    
    // Replace common math symbols with clean versions
    let processed = str
      .replace(/km\^2/g, 'km²')
      .replace(/cm\^2/g, 'cm²')
      .replace(/m\^2/g, 'm²')
      .replace(/cm\^3/g, 'cm³')
      .replace(/m\^3/g, 'm³')
      .replace(/(\d+)\^2/g, '$1²')
      .replace(/(\d+)\^3/g, '$1³');

    // Regex for fraction pattern:
    // Pattern matches:
    // Group 1: Optional whole number before fraction (e.g. "2" in "2 (1/2)" or "2 1/2")
    // Group 2: Numerator
    // Group 3: Denominator
    const fractionRegex = /(?:(\d+)\s+)?(?:\(?(\d+|[a-zA-Z\+\-\*]+)\/(\d+|[a-zA-Z\+\-\*]+)\)?)/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = fractionRegex.exec(processed)) !== null) {
      const matchIndex = match.index;

      // Push preceding text
      if (matchIndex > lastIndex) {
        const precedingText = processed.substring(lastIndex, matchIndex);
        tokens.push(formatGeneralText(precedingText, `text-${lastIndex}`));
      }

      const wholeNum = match[1];
      const num = match[2];
      const den = match[3];

      tokens.push(
        <span key={`frac-${matchIndex}`} className="inline-flex items-baseline mx-1 align-middle whitespace-nowrap bg-amber-50/80 px-1.5 py-0.5 rounded-lg border border-amber-200/60 shadow-2xs font-mono text-slate-900">
          {wholeNum && (
            <span className="font-bold text-base mr-1.5 text-amber-950 font-sans">
              {wholeNum}
            </span>
          )}
          <span className="inline-flex flex-col text-center justify-center align-middle leading-none text-xs font-bold text-slate-800">
            <span className="border-b-2 border-slate-700 px-1 pb-0.5 text-[0.95em]">{num}</span>
            <span className="px-1 pt-0.5 text-[0.95em] text-slate-700">{den}</span>
          </span>
        </span>
      );

      lastIndex = fractionRegex.lastIndex;
    }

    // Push remaining text
    if (lastIndex < processed.length) {
      const remainingText = processed.substring(lastIndex);
      tokens.push(formatGeneralText(remainingText, `text-${lastIndex}`));
    }

    return tokens;
  };

  // Format superscripts, operators, and equations in remaining string chunks
  const formatGeneralText = (chunk: string, keyPrefix: string): React.ReactNode => {
    // Highlight exponents like cm², m², cm³, R², a³
    const parts = chunk.split(/([a-zA-Z0-9\π\)\}]*[²³])/g);

    return (
      <span key={keyPrefix}>
        {parts.map((part, i) => {
          if (/[²³]$/.test(part)) {
            const base = part.slice(0, -1);
            const sup = part.slice(-1);
            return (
              <span key={`${keyPrefix}-${i}`} className="inline-flex items-baseline font-semibold text-slate-900">
                <span>{base}</span>
                <sup className="text-[0.7em] font-bold text-amber-900 -top-1 relative ml-0.5">{sup}</sup>
              </span>
            );
          }

          // Format math symbols like ×, ÷, =, +, -, :, √, π
          return (
            <span key={`${keyPrefix}-${i}`}>
              {part}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <Component className={className}>
      {renderFormattedString(text)}
    </Component>
  );
};
