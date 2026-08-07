/**
 * Utility to sanitize multiple-choice question options:
 * - Removes parenthetical text (e.g. "(Hanoi)", "(True)", "(២ ដងក្នុងមួយឆ្នាំ)") from options
 *   so students cannot guess answers based on parenthetical hints.
 * - Trims extra whitespace.
 */
export function sanitizeOptionText(opt: string): string {
  if (!opt || typeof opt !== 'string') return opt;
  // Remove parenthetical text in ASCII parentheses () or Khmer/full-width parentheses （）
  let cleaned = opt
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s*（[^）]*）/g, '')
    .trim();

  cleaned = cleaned.replace(/\s+/g, ' ');
  return cleaned || opt;
}

export function sanitizeQuestion<T extends { options?: string[] }>(q: T): T {
  if (!q || !Array.isArray(q.options)) return q;
  return {
    ...q,
    options: q.options.map(sanitizeOptionText)
  };
}

export function sanitizeExamPaper<T extends { questions?: any[] }>(paper: T): T {
  if (!paper || !Array.isArray(paper.questions)) return paper;
  return {
    ...paper,
    questions: paper.questions.map(sanitizeQuestion)
  };
}
