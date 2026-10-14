const MAX_PROMPT_LENGTH = 500;

export interface PromptValidationResult {
  valid: boolean;
  error?: string;
  length: number;
}

export function validatePromptLength(prompt: string): PromptValidationResult {
  const length = prompt.length;

  if (length > MAX_PROMPT_LENGTH) {
    return {
      valid: false,
      error: '프롬프트는 500자를 초과할 수 없습니다.',
      length,
    };
  }

  return { valid: true, length };
}
