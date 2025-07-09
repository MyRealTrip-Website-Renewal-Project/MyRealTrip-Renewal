# MyRealTrip Renewal

마이리얼트립의 현대적인 웹 애플리케이션입니다. React, TypeScript, 스타일드 컴포넌트를 기반으로 구축되었습니다.

## 🚀 주요 기능

### 🎨 UI/UX 개선
- **스타일드 컴포넌트**: CSS-in-JS를 활용한 모던한 스타일링
- **Framer Motion**: 부드러운 애니메이션과 전환 효과
- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- **접근성**: WCAG 가이드라인을 준수한 접근성 구현

### 🔧 기술 스택
- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안전성 보장
- **React Query**: 서버 상태 관리 및 캐싱
- **Zustand**: 클라이언트 상태 관리
- **React Hook Form**: 폼 상태 관리 및 유효성 검사
- **React Router**: 클라이언트 사이드 라우팅

### 📦 상태 관리
- **React Query**: 서버 데이터 캐싱 및 동기화
- **Zustand**: 전역 상태 관리 (인증, 검색 등)
- **로컬 스토리지**: 사용자 설정 및 세션 유지

### 🎯 컴포넌트 아키텍처
- **모듈화**: 재사용 가능한 컴포넌트 설계
- **캡슐화**: 관심사 분리를 통한 유지보수성 향상
- **커스텀 훅**: 비즈니스 로직의 재사용성 증대

## 🛠️ 설치 및 실행

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치
```bash
npm install --legacy-peer-deps
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 테스트
```bash
npm test
```

## 📁 프로젝트 구조

```
src/
├── app/                    # 앱 레벨 컴포넌트
│   ├── App.tsx            # 메인 앱 컴포넌트
│   ├── Providers.tsx      # 전역 프로바이더
│   └── index.tsx          # 앱 진입점
├── components/            # 재사용 가능한 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   │   ├── Button.styled.tsx
│   │   ├── Modal.styled.tsx
│   │   ├── AuthModal.styled.tsx
│   │   └── ...
│   └── layout/           # 레이아웃 컴포넌트
│       ├── Header.styled.tsx
│       └── Header.tsx
├── features/             # 기능별 페이지
│   ├── home/
│   ├── about/
│   └── ...
├── hooks/               # 커스텀 훅
│   ├── useLocalStorage.ts
│   ├── useIntersectionObserver.ts
│   ├── useDebounce.ts
│   ├── useHotels.ts
│   └── usePromotions.ts
├── services/            # API 서비스
│   └── api.ts
├── store/               # 상태 관리
│   ├── useAuthStore.ts
│   └── useSearchStore.ts
├── styles/              # 전역 스타일
│   ├── theme.ts
│   ├── global.css
│   └── styled.d.ts
└── types/               # TypeScript 타입 정의
    ├── category.ts
    ├── hotel.ts
    └── ...
```

## 🎨 디자인 시스템

### 테마 시스템
- **색상 팔레트**: 일관된 색상 체계
- **타이포그래피**: Pretendard 폰트 기반
- **간격 시스템**: 체계적인 spacing 규칙
- **그림자**: 계층적 그림자 시스템

### 컴포넌트 라이브러리
- **Button**: 다양한 variant와 size 지원
- **Modal**: 애니메이션과 접근성 고려
- **Form**: React Hook Form 통합
- **Card**: 호텔 카드 등 정보 표시

## 🔄 상태 관리 전략

### React Query
```typescript
// 호텔 데이터 조회
const { data: hotels, isLoading } = useHotels();

// 무한 스크롤
const { data, fetchNextPage } = useInfiniteHotels();
```

### Zustand
```typescript
// 인증 상태
const { user, isAuthenticated, login } = useAuthStore();

// 검색 상태
const { query, setQuery, recentSearches } = useSearchStore();
```

## 🎯 성능 최적화

### 코드 스플리팅
- React.lazy를 활용한 페이지별 지연 로딩
- 동적 import를 통한 번들 크기 최적화

### 메모이제이션
- React.memo를 활용한 불필요한 리렌더링 방지
- useMemo, useCallback을 통한 계산 최적화

### 이미지 최적화
- WebP 포맷 사용
- 적절한 이미지 크기 및 압축

## 🔒 보안

### 인증 시스템
- JWT 토큰 기반 인증
- 소셜 로그인 (Google, Apple)
- 세션 관리 및 자동 로그아웃

### 데이터 보호
- HTTPS 통신
- XSS 방지
- CSRF 토큰 사용

## 📱 반응형 디자인

### 브레이크포인트
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px 이상

### 접근성
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 고대비 모드 지원

## 🧪 테스팅

### 테스트 전략
- **단위 테스트**: Jest + React Testing Library
- **통합 테스트**: 컴포넌트 간 상호작용
- **E2E 테스트**: Playwright

### 테스트 실행
```bash
# 단위 테스트
npm test

# 커버리지
npm run test:coverage

# E2E 테스트
npm run test:e2e
```

## 🚀 배포

### 환경별 설정
- **개발**: 로컬 개발 환경
- **스테이징**: 테스트 환경
- **프로덕션**: 실제 서비스 환경

### CI/CD
- GitHub Actions를 통한 자동화
- 자동 테스트 및 빌드
- 자동 배포 파이프라인

## 📈 모니터링

### 성능 모니터링
- Core Web Vitals 추적
- 사용자 경험 메트릭 수집

### 에러 추적
- 에러 로깅 및 알림
- 사용자 피드백 수집

## 🤝 기여 가이드

### 개발 가이드라인
1. TypeScript 사용 필수
2. ESLint 규칙 준수
3. 커밋 메시지 컨벤션 준수
4. 테스트 코드 작성

### 브랜치 전략
- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치
- `hotfix/*`: 긴급 수정 브랜치

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👥 팀

- **개발자**: [개발자명]
- **디자이너**: [디자이너명]
- **PM**: [PM명]

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

