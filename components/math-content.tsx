"use client";

import { useMemo } from "react";
import { convertMathExpressions } from "../lib/latex-adapter";

interface MathContentProps {
  html: string;
  className?: string;
  worksheet?: boolean;
}

/**
 * Renders HTML content with math expressions converted to KaTeX.
 * When `worksheet` is true, adds lined-paper styling for a 5th-grade feel.
 */
export function MathContent({ html, className = "", worksheet = false }: MathContentProps) {
  const rendered = useMemo(() => convertMathExpressions(html), [html]);

  return (
    <div
      className={`math-content ${worksheet ? "worksheet" : ""} ${className}`}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
}
