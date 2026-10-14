import { describe, it, expect } from 'vitest';
import { validatePromptLength } from './validatePrompt';

describe('validatePromptLength', () => {
  it('500자 미만이면 valid를 반환한다', () => {
    const result = validatePromptLength('짧은 프롬프트');
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('정확히 500자면 valid를 반환한다', () => {
    const prompt = 'a'.repeat(500);
    const result = validatePromptLength(prompt);
    expect(result.valid).toBe(true);
  });

  it('501자 이상이면 invalid와 에러 메시지를 반환한다', () => {
    const prompt = 'a'.repeat(501);
    const result = validatePromptLength(prompt);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('프롬프트는 500자를 초과할 수 없습니다.');
  });

  it('빈 문자열은 valid를 반환한다', () => {
    const result = validatePromptLength('');
    expect(result.valid).toBe(true);
  });

  it('현재 글자 수를 반환한다', () => {
    const result = validatePromptLength('테스트');
    expect(result.length).toBe(3);
  });
});
