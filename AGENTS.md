# AGENTS.md

## Operational Commands

Package manager: **Bun only** (npm, yarn, pnpm 사용 금지)

```bash
# 의존성 설치
bun install

# 개발 서버 실행 (API + Vite 동시 실행)
bun run dev

# API 서버만 실행
bun run server

# 빌드
bun run build

# 테스트
bun run test

# 린트
bun run lint
```

## Golden Rules

### Immutable Constraints

**[Hard Constraint] react-live noInline 모드 요구사항**

react-live는 `noInline` 모드로 동작하며, AI가 생성한 코드에 다음 제약이 적용된다.

- 근거: `server/index.ts:10-12`, `server/generator.ts:13-24`, `src/components/LivePreview.tsx:14`
- DO: 코드 끝에 `render(<ComponentName />)` 호출 필수
- DO: React hooks는 `React.useState`, `React.useEffect` 형태로 전역 참조
- DON'T: `import` 문 사용 금지 (React는 전역 스코프에서 제공됨)
- DON'T: TypeScript 문법 금지 (타입 어노테이션, 인터페이스, 제네릭, as 캐스트 모두 불가)

SYSTEM_PROMPT 수정 시 이 제약을 반드시 유지하라. 위반 시 react-live 미리보기가 동작하지 않는다.

**[Security Boundary] API 키 처리**

- 근거: `server/index.ts:59-66`, `server/index.ts:147-157`
- 서버는 실제 API 키를 클라이언트에 절대 노출하지 않는다
- `/api/config` 엔드포인트는 키 존재 여부만 boolean으로 반환한다
- DON'T: API 키 값을 응답에 포함시키지 마라
- DON'T: 로그에 API 키를 출력하지 마라

### Do's and Don'ts

**[Asymmetry] 모델 폴백은 Google만 지원**

- 근거: `server/index.ts:5`, `server/index.ts:134-136`
- Google: `withModelFallback`을 통해 여러 모델 순차 시도
- Anthropic: 단일 모델만 사용, 폴백 없음
- DO: Google 모델 추가 시 `GOOGLE_MODELS` 배열에 우선순위대로 추가
- DON'T: Anthropic에 폴백 로직을 추가하려면 아키텍처 검토 필요

**[Double Defense] API 키 검증은 클라이언트와 서버 양쪽에서**

- 근거: `src/App.tsx:33-38`, `server/index.ts:169-174`
- 클라이언트: UI에서 키가 없으면 alert 후 요청 중단
- 서버: 키가 없으면 400 에러 반환
- DON'T: 양쪽 검증 중 하나를 제거하지 마라. 클라이언트 검증만으로는 API 직접 호출을 막지 못한다.

**[Test Boundary] 순수 함수만 테스트 대상**

- 근거: `vite.config.ts:20-21`
- 테스트 대상: `server/generator.ts`, `server/fallback.ts`, `src/components/PromptInput.tsx`
- 테스트 미대상: `server/index.ts`(API 핸들러), `src/hooks/useComponentGenerator.ts`
- DO: 순수 함수(부수효과 없음)는 테스트 작성
- DO: 비즈니스 로직을 순수 함수로 분리하여 테스트 가능하게 유지

### Code Style

- 파일명: 컴포넌트는 PascalCase (`ComponentCard.tsx`), 유틸/훅은 camelCase (`useComponentGenerator.ts`)
- 테스트 파일: 대상 파일과 동일 위치에 `.test.ts(x)` 확장자 (`generator.test.ts`)
- 주석: 한국어 허용, 함수 설명은 JSDoc 스타일 권장

## Tech Stack

- Frontend: React 19, TypeScript, Vite 8
- Backend: Bun (API 프록시 서버)
- AI Provider: Anthropic Claude, Google Gemini
- Preview: react-live (noInline 모드)
- Test: Vitest, @testing-library/react

## Standards

### Git Commit Message

```
<type>: <subject>

<body>
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`

### Maintenance Policy

이 문서의 규칙과 실제 코드 사이에 불일치가 발생하면:
1. 코드가 정답인지 규칙이 정답인지 확인한다
2. 불일치를 발견한 에이전트는 업데이트를 제안한다
