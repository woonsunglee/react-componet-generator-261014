# Create PR Skill

현재 브랜치의 변경사항을 분석하여 Pull Request를 생성하는 스킬

---
context: fork
---

## Triggers

- "PR 만들어", "PR 생성", "/create-pr"
- "풀리퀘스트 생성", "pull request"
- "리뷰 요청", "코드 리뷰 올려줘"

## Procedure

### 1. 브랜치 상태 확인

```bash
# 현재 브랜치 확인
git branch --show-current

# 베이스 브랜치(main/master) 대비 커밋 확인
git log main..HEAD --oneline

# 변경된 파일 목록
git diff main..HEAD --stat
```

### 2. 원격 저장소 동기화

```bash
# 푸시되지 않은 커밋 확인
git status -sb

# 원격에 브랜치가 없으면 푸시
git push -u origin HEAD
```

### 3. 변경사항 분석

커밋 히스토리와 diff를 분석하여 다음을 파악:

- 변경의 목적 (feat/fix/refactor/docs/chore)
- 주요 변경 파일 및 내용
- 영향 범위

### 4. PR 본문 작성

@references/pr-template.md 템플릿을 기반으로 PR 본문 작성:

- **Summary**: 변경 목적을 1-3문장으로 요약
- **Changes**: 주요 변경사항 bullet point
- **Test Plan**: 테스트/검증 방법
- **Related Issues**: 관련 이슈 번호 (있는 경우)

### 5. 사용자 승인

PR 생성 전 다음을 사용자에게 보여주고 승인 요청:

1. PR 제목 (브랜치명 또는 커밋 메시지 기반)
2. PR 본문 미리보기
3. 베이스 브랜치 확인

### 6. PR 생성

승인 후 gh CLI로 PR 생성:

```bash
gh pr create \
  --title "<PR 제목>" \
  --body "$(cat <<'EOF'
<PR 본문>
EOF
)" \
  --base main
```

### 7. 결과 보고

생성된 PR URL을 사용자에게 전달

## Examples

### 기능 추가 PR

**제목**: `feat: 프롬프트 500자 제한 검증 추가`

**본문**:
```markdown
## Summary

사용자가 입력하는 프롬프트의 길이를 500자로 제한하는 검증 기능 추가

## Changes

- `src/utils/validatePrompt.ts`: 길이 검증 순수 함수
- `src/components/PromptInput.tsx`: UI 연동 (글자수 표시, 에러 메시지)
- `src/App.css`: 관련 스타일 추가

## Test Plan

- [x] 단위 테스트 5개 통과 (`bun test src/utils/validatePrompt.test.ts`)
- [x] 500자 초과 시 버튼 비활성화 확인
- [x] 에러 메시지 표시 확인
```

### 버그 수정 PR

**제목**: `fix: 로그인 토큰 만료 시 무한 리다이렉트 수정`

**본문**:
```markdown
## Summary

만료된 토큰으로 인한 무한 리다이렉트 루프 문제 해결

## Changes

- 토큰 만료 체크 로직 수정
- 만료 시 로그아웃 처리 추가

## Test Plan

- [x] 토큰 만료 시나리오 수동 테스트
- [x] 정상 로그인 플로우 회귀 테스트

## Related Issues

Closes #123
```

## Constraints

- PR 생성 전 반드시 사용자 승인 필요
- 베이스 브랜치는 기본적으로 `main` (프로젝트에 따라 다를 수 있음)
- Draft PR 옵션은 사용자가 명시적으로 요청할 때만 사용
- 커밋이 없거나 이미 PR이 존재하면 안내 후 중단

## Options

사용자가 추가로 지정할 수 있는 옵션:

- `--draft`: Draft PR로 생성
- `--reviewer <username>`: 리뷰어 지정
- `--label <label>`: 라벨 추가
- `--base <branch>`: 베이스 브랜치 변경 (기본: main)
