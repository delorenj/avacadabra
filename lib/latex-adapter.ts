import katex from "katex";

/**
 * Renders a LaTeX expression to an HTML string via KaTeX.
 * Returns the original text on failure so content degrades gracefully.
 */
function renderLatex(latex: string): string {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: false,
      output: "html",
    });
  } catch {
    return latex;
  }
}

/**
 * Ordered list of regex patterns that convert natural math text to LaTeX.
 * Order matters: mixed numbers must match before bare fractions.
 */
const MATH_PATTERNS: { pattern: RegExp; replace: (match: RegExpExecArray) => string }[] = [
  // Mixed numbers: "2 1/4", "1 1/2" (digit, space, fraction)
  {
    pattern: /(\d+)\s+(\d+)\s*\/\s*(\d+)/g,
    replace: (m) => renderLatex(`${m[1]}\\frac{${m[2]}}{${m[3]}}`),
  },
  // Bare fractions: "3/4", "5/6" (but not inside URLs or dates like 04/10)
  {
    pattern: /(?<![\/\d.])(\d+)\s*\/\s*(\d+)(?![\/\d])/g,
    replace: (m) => renderLatex(`\\frac{${m[1]}}{${m[2]}}`),
  },
  // Division with ÷: "9 ÷ 3/4" or "4 ÷ 1/2" — already handled since fractions
  // get converted first. This catches standalone "÷" between numbers.
  {
    pattern: /(\d+(?:\.\d+)?)\s*÷\s*(\d+(?:\.\d+)?)/g,
    replace: (m) => renderLatex(`${m[1]} \\div ${m[2]}`),
  },
  // Multiplication with ×: "3 × 2 × 4", "l × w × h"
  {
    pattern: /([a-zA-Z0-9.]+)\s*×\s*([a-zA-Z0-9.]+)(?:\s*×\s*([a-zA-Z0-9.]+))?/g,
    replace: (m) => {
      const parts = [m[1], m[2]];
      if (m[3]) parts.push(m[3]);
      return renderLatex(parts.join(" \\times "));
    },
  },
  // Expressions with − (minus sign, not hyphen): "5/6 − 1/3"
  // At this point fractions are already rendered, so we just style the operator
  {
    pattern: /\s−\s/g,
    replace: () => renderLatex(" - "),
  },
  // V = l × w × h style formulas (already partially handled by × pattern)
  {
    pattern: /\b([A-V])\s*=\s*([a-zA-Z0-9])/g,
    replace: (m) => `${renderLatex(`${m[1]} =`)} ${m[2]}`,
  },
  // Comparison operators: "> ", "< " between math expressions
  {
    pattern: /(\d+(?:\.\d+)?)\s*([><])\s*(\d+(?:\.\d+)?)/g,
    replace: (m) => renderLatex(`${m[1]} ${m[2] === ">" ? ">" : "<"} ${m[3]}`),
  },
  // Exponents (not common in 5th grade but just in case): "10^2"
  {
    pattern: /(\d+)\^(\d+)/g,
    replace: (m) => renderLatex(`${m[1]}^{${m[2]}}`),
  },
];

/**
 * Processes a plain-text string, converting math expressions to KaTeX HTML.
 * Runs each pattern in order so mixed numbers resolve before bare fractions.
 */
function convertTextNode(text: string): string {
  let result = text;
  for (const { pattern, replace } of MATH_PATTERNS) {
    // Reset regex lastIndex for global patterns
    pattern.lastIndex = 0;
    result = result.replace(pattern, (...args) => {
      // Build a pseudo match array from replacement args
      const match = args as unknown as RegExpExecArray;
      return replace(match);
    });
  }
  return result;
}

/**
 * Splits HTML into tags and text segments, applies math conversion only to
 * text segments (preserving all HTML tags intact). This avoids corrupting
 * tag attributes or structure.
 */
export function convertMathExpressions(html: string): string {
  // Split on HTML tags, preserving them
  const segments = html.split(/(<[^>]+>)/);
  return segments
    .map((segment) => {
      // Skip HTML tags and KaTeX output (already processed)
      if (segment.startsWith("<")) return segment;
      // Skip empty segments
      if (!segment.trim()) return segment;
      return convertTextNode(segment);
    })
    .join("");
}
