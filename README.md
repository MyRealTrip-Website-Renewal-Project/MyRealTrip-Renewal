![CI](src/assets/img/CIWType.svg)   
# MyRealTrip Renewal Project

여행 예약 플랫폼 '마이리얼트립'의 UX 개선을 목표로 한 사이드 프로젝트입니다. 실제 사용자 흐름을 분석해 주요 페이지(메인, 검색, 상품 상세, 예약 등)의 UI/UX를 재설계하고, 반응형 웹 기반의 프로토타입을 제작했습니다. 사용자의 탐색 경험을 간결하고 직관적으로 개선하는 데 중점을 두었으며, 디자인 시스템 정비와 예약 흐름 최적화도 함께 진행했습니다.

---

## 🗂️ 시스템 폴더 구조

```
MyRealTrip-Renewal/
├── public/                   # 정적 파일 (favicon, robots.txt 등)
├── src/
│   ├── app/                  # 진입점(index.tsx), App, Provider, 라우팅 등
│   ├── assets/               # 이미지, SVG 등 정적 리소스
│   │   └── img/              # 각종 이미지 파일
│   ├── components/
│   │   ├── common/           # 공통 컴포넌트 (아이콘 등)
│   │   └── layout/           # 레이아웃 컴포넌트 (Header 등)
│   ├── features/             # 도메인별 페이지/비즈니스 로직/컴포넌트
│   │   ├── about/            # About 페이지
│   │   ├── home/             # Home 페이지
│   │   ├── mainVisual/       # 메인 비주얼, 검색바 등
│   │   └── splash/           # 스플래시 관련 컴포넌트
│   ├── stories/              # Storybook 스토리/테스트용 컴포넌트
│   ├── styles/               # 글로벌/테마 CSS, 폰트 등
│   └── types/                # 타입 정의 (category, subtab 등)
├── .storybook/               # Storybook 설정
├── node_modules/             # npm 패키지
├── package.json              # 프로젝트 메타/의존성/스크립트
├── tsconfig.json             # TypeScript 설정
├── vite.config.ts            # Vite 설정
├── README.md                 # 프로젝트 설명서
└── ...                       # 기타 설정/빌드 파일
```

---

## 🏗️ 폴더별 역할

- **public/**: 정적 파일(HTML, favicon 등)
- **src/app/**: 앱 진입점, 라우팅, Provider 등
- **src/assets/**: 이미지, SVG 등 정적 리소스
- **src/components/common/**: 공통 아이콘, 버튼 등 재사용 컴포넌트
- **src/components/layout/**: Header 등 레이아웃 관련 컴포넌트
- **src/features/**: 도메인별 페이지/비즈니스 로직/컴포넌트/스타일
- **src/stories/**: Storybook 스토리, 테스트용 컴포넌트
- **src/styles/**: 글로벌 CSS, 테마, 폰트
- **src/types/**: 타입스크립트 타입 정의
- **.storybook/**: Storybook 설정
- **package.json, tsconfig.json, vite.config.ts**: 프로젝트 설정 파일

---

## 🚀 주요 기능 및 개선 내역

- **UI/UX 고도화**: 픽셀 퍼펙트, 반응형, SVG 아이콘 통일, 폰트 통일 등
- **코드 구조 개선**: 대규모 서비스에 적합한 폴더 구조, 공통화, 중복 제거
- **반응형 처리**: 브레이크포인트별 레이아웃 자동 전환
- **시큐어 코딩/보안**: 입력값 sanitize, 버튼 연타 방지, autocomplete="off" 등
- **코드 품질**: 타입스크립트, ESLint, Prettier, Storybook, Jest

---

## 🛠️ 설치 및 실행

```bash
npm install
npm run dev
```

---

## 🌐 배포/호스팅

- 대기기

---

## 🔒 보안/시큐어 코딩 적용 내역

- 입력값 sanitize(특수문자 < > " ' 제거)
- 검색 버튼 연타 방지(loading state, disabled)
- 콘솔에 민감정보 출력 금지
- autocomplete="off" 적용

---

## 📦 기술 스택

- React, TypeScript, Vite, CSS Modules, Pretendard, Storybook, Jest, ESLint, Prettier

## 개발 및 품질 관리 가이드

### 1. Storybook 실행

```bash
npm run storybook
```
- 공통 컴포넌트 UI/UX, 접근성, 다양한 상태를 시각적으로 확인/문서화

### 2. 테스트 실행

```bash
npm test
```
- Jest + React Testing Library 기반 단위 테스트 자동화
- 커스텀 matcher(jest-dom) 포함

### 3. Lint & Build

```bash
npm run lint
npm run build
```
- 코드 스타일, 타입, 빌드 품질 점검

### 4. CI 자동화(GitHub Actions)
- main 브랜치로 push/pull request 시 lint, test, build 자동 실행
- 워크플로우: `.github/workflows/ci.yml`

### 5. 디자인 시스템/토큰
- `src/styles/variables.css`에서 색상, 폰트, 간격, 반응형 등 CSS 변수 관리

### 6. 타입/공통 구조
- `src/types/`에서 공통 타입 정의 및 관리
- props, 네이밍, 접근성 일관성 유지

### 7. 기타
- 접근성(aria, role 등) 강화
- Storybook/테스트/빌드 자동화로 품질 보장

---

문의/기여: PR 또는 Issue 등록

