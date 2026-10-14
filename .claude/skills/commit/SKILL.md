# Commit Skill

변경사항을 분석하여 프로젝트 컨벤션에 맞게 커밋하는 스킬

## Triggers

- "커밋", "커밋해줘", "/commit"
- "변경사항 저장", "커밋 생성"
- "commit", "save changes"

## Procedure

### 1. 변경사항 분석

```bash
# 스테이징된 변경사항 확인
git diff --cached --stat
git diff --cached

# 스테이징되지 않은 변경사항 확인
git status
git diff --stat
```

### 2. 논리적 단위 분류

변경사항을 다음 기준으로 분류한다:

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **refactor**: 코드 리팩토링 (기능 변경 없음)
- **test**: 테스트 추가/수정
- **docs**: 문서 변경
- **chore**: 빌드, 설정, 의존성 등 기타 변경

### 3. 커밋 메시지 작성

프로젝트 컨벤션 (AGENTS.md 기준):

```
<type>: <subject>

<body>
```

규칙:
- `<subject>`: 한국어로 간결하게 작성 (50자 이내)
- `<body>`: 변경 이유, 상세 내용 (선택적)
- 여러 논리적 단위가 있으면 별도 커밋으로 분리 제안

### 4. 사용자 승인

커밋 실행 전 다음을 사용자에게 보여주고 승인 요청:

1. 스테이징할 파일 목록
2. 제안된 커밋 메시지
3. 여러 커밋으로 분리가 필요한 경우 분리 계획

### 5. 커밋 실행

승인 후 커밋 실행:

```bash
git add <files>
git commit -m "<type>: <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

## Examples

### 단일 기능 추가

```
feat: 사용자 프로필 이미지 업로드 기능 추가

- 이미지 리사이징 로직 구현
- S3 업로드 연동
```

### 버그 수정

```
fix: 로그인 시 토큰 만료 처리 오류 수정

만료된 토큰으로 인한 무한 리다이렉트 문제 해결
```

### 복합 변경 시 분리

변경사항이 여러 논리적 단위를 포함하면:

1. 각 단위별로 파일 그룹화
2. 순서대로 스테이징 및 커밋 제안
3. 사용자 승인 시 순차 실행

## Constraints

- 커밋 전 반드시 사용자 승인 필요
- `.env`, 인증 정보가 포함된 파일은 커밋 대상에서 제외 경고
- push는 자동 실행하지 않음 (명시적 요청 시에만)
