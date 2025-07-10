# MyRealTrip Renewal (초기 셋팅)

## 폴더 구조
- src/components, features, hooks, store, services, utils, styles, types, pages, __tests__, __mocks__, config, storybook 등
- public/

## 주요 명령어
- `yarn dev` : 개발 서버
- `yarn build` : 프로덕션 빌드
- `yarn storybook` : 스토리북 실행
- `yarn storybook:build` : 스토리북 빌드
- `yarn lint` : ESLint
- `yarn format` : Prettier
- `yarn test` : Jest 테스트

## 자동화/CI
- GitHub Actions: Lint, Test, Build, Storybook, Chromatic, 접근성(a11y), 배포 자동화
- Husky, lint-staged: 커밋 전 자동 포맷/린트

## 코드 컨벤션
- Airbnb + Prettier, SCSS 변수/믹스인 자동주입

## 기타
- 글로벌 스타일, Sentry, i18n, dotenv, E2E, Chromatic, 접근성 등 기본 셋팅 