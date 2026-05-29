# Martinee Blog — Claude Code 가이드

## 프로젝트 개요

- **목표**: blog.martinee.io (Webflow) → React SPA + Supabase + AWS S3/CloudFront 자체 개발 전환
- **클라이언트**: Martinee
- **담당**: 세영 (design@martinee.io)

---

## 기술 스택

| 항목 | 기술 |
|---|---|
| 프론트엔드 | React + Vite (SPA) |
| 스타일 | CSS Modules |
| 라우팅 | React Router v6 |
| 백엔드/DB | Supabase (Seoul 리전) |
| 에디터 | Tiptap (MIT) |
| 스토리지 | AWS S3 + CloudFront |
| SEO | react-helmet-async |
| 분석 | GA4 |

---

## 폴더 구조

```
src/
├── pages/          # 라우팅 단위 페이지 컴포넌트
│   ├── Home.jsx
│   ├── Category.jsx
│   ├── Post.jsx
│   └── admin/
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── Posts.jsx
│       ├── Write.jsx
│       ├── Edit.jsx
│       └── Authors.jsx
├── components/     # 재사용 컴포넌트
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── PostCard.jsx
│   └── ...
├── hooks/          # 커스텀 훅
│   └── usePosts.js
├── lib/            # 외부 라이브러리 초기화
│   └── supabase.js
└── styles/         # 전역 스타일
    └── global.css
```

---

## 코드 규칙

- **스타일**: CSS Modules만 사용 (`Component.module.css`). 인라인 스타일 금지
- **컴포넌트**: 함수형 컴포넌트 + hooks만 사용. 클래스형 금지
- **작업 단위**: 한 번에 하나의 컴포넌트 또는 페이지만 작업
- **import**: 상대 경로 사용 (`../../lib/supabase`)
- **파일명**: 컴포넌트는 PascalCase (`PostCard.jsx`), 훅은 camelCase (`usePosts.js`)

---

## 디자인 토큰

관리자 UI HTML 파일과 동일한 토큰을 CSS 변수로 적용.

```css
/* global.css에 정의 */
:root {
  --primary: #0A6CFF;
  --primary-light: #EAF1FF;
  --primary-mid: #C0D8FF;
  --primary-dark: #0050CC;
  --black: #0e0e0e;
  --gray-1: #1e1e1e;
  --gray-2: #3a3a3a;
  --gray-3: #6a6a6a;
  --gray-4: #a0a0a0;
  --gray-5: #d0d0d0;
  --gray-6: #ebebeb;
  --gray-7: #f8f9fb;
  --white: #ffffff;
  --border: #eeeeee;
  --success: #12a150;
  --success-bg: #e8faf0;
  --warn: #c94a2a;
  --warn-bg: #fff0eb;
}
```

**폰트**: Noto Sans KR, 최소 13px
**반응형 브레이크포인트**: 375px(모바일) / 768px(태블릿) / 1280px(데스크탑)

---

## Supabase 설정

```js
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**환경변수 파일** (`.env.local` — gitignore 필수):
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

> ⚠️ Service Role Key는 절대 프론트엔드 번들에 포함 금지. anon key만 사용.

---

## DB 스키마

### posts 테이블
```sql
id uuid primary key default gen_random_uuid()
title_main text not null          -- 55자 이내 권장
title_sub text
slug text unique not null
content text                      -- HTML string (Tiptap 출력)
thumbnail_url text
category_gnbs text[]              -- ['인사이트', 'Growth'] 복수 선택
category_main text                -- 썸네일 배지용 단일 카테고리
tags text[]
video_link text                   -- 유튜브 URL
is_published boolean default false
is_featured boolean default false
is_featured_growth boolean default false
is_featured_crm boolean default false
is_featured_performance boolean default false
is_featured_event boolean default false
view_count int default 0
author_id uuid references authors(id)
cta_image_url text
cta_title text
cta_desc text
cta_btn1_label text
cta_btn1_url text
cta_btn2_label text
cta_btn2_url text
published_at timestamptz
created_at timestamptz default now()
updated_at timestamptz default now()
```

### authors 테이블
```sql
id uuid primary key default gen_random_uuid()
name_ko text not null
name_en text
slug text unique
profile_image_url text
job_title text
email text
bio_summary text
tag_team uuid references blog_tag_teams(id)
sns_linkedin text
sns_blog text
sns_facebook text
sns_instagram text
created_at timestamptz default now()
```

### 추가 테이블
- `blog_tag_teams` — 소속팀 마스터 (Supabase 대시보드에서 row 직접 추가)
- `blog_tag_categories_gnbs` — GNB 카테고리 마스터

### Storage 버킷 (public)
- `post-images` — 본문 이미지
- `thumbnails` — 썸네일 + 작성자 프로필

### RLS 정책
- SELECT: 누구나 (`is_published = true`인 글만)
- UPDATE view_count: 누구나 (+1만 허용)
- INSERT / UPDATE / DELETE: service_role만

---

## 카테고리 구조

| GNB 그룹 | category_gnbs 값 |
|---|---|
| 인사이트 | Growth, CRM |
| 솔루션 | AppsFlyer, Amplitude, Braze |
| 이벤트 | 이벤트 |
| 자료실 | 자료실 |

---

## 라우팅 구조

```
/                          → 블로그 홈
/category/:slug            → 카테고리 목록
/post/:slug                → 게시글 상세
/admin                     → 대시보드 (로그인 필요)
/admin/login               → 로그인
/admin/posts               → 게시글 관리 목록
/admin/posts/write         → 새 게시글 작성
/admin/posts/edit/:id      → 게시글 수정
/admin/authors             → 작성자 관리
/admin/reset-password      → 비밀번호 재설정
*                          → 404
```

---

## 관리자 UI 레퍼런스

관리자 화면은 HTML 아티팩트로 확정된 디자인이 있음.
React 구현 시 이 파일들의 스타일과 UX를 그대로 이식.

| HTML 파일 | 대응 React 페이지 |
|---|---|
| martinee-admin-login.html | /admin/login |
| martinee-admin-dashboard.html | /admin |
| martinee-admin-ui.html | /admin/posts |
| martinee-admin-write.html | /admin/posts/write |
| martinee-admin-edit.html | /admin/posts/edit/:id |
| martinee-admin-authors.html | /admin/authors |
| martinee-admin-reset-password.html | /admin/reset-password |
| martinee-admin-error.html | 404 / 403 / 401 |

---

## 게시글 상태

| 상태 | 조건 | 색상 |
|---|---|---|
| 발행 | is_published=true | 초록 |
| 비공개 | is_published=false + published_at 있음 | 주황 |
| 임시저장 | is_published=false + published_at 없음 | 회색 |

---

## 관리자 인증

- Supabase Auth (이메일 + 비밀번호)
- 로그인 성공 → JWT 토큰 → 관리자 화면 진입
- 토큰 만료 시 자동 로그아웃 → /admin/login 리다이렉트
- 계정 관리: Supabase 대시보드 → Authentication → Users → Invite

---

## Tiptap 에디터 설정

```bash
npm install @tiptap/react @tiptap/starter-kit \
  @tiptap/extension-image \
  @tiptap/extension-link \
  @tiptap/extension-table \
  @tiptap/extension-horizontal-rule
```

- 이미지 업로드 → Supabase `post-images` 버킷 → public URL 본문 삽입
- 썸네일 → `thumbnails` 버킷
- 에디터 출력: HTML string → posts.content 컬럼 저장
- 에디터 서체: Pretendard 적용 (`.ProseMirror font-family`)

---

## SEO

- `react-helmet-async`로 페이지별 title / description / OG 태그 주입
- 게시글 상세 페이지: slug 기반 동적 메타 태그
- GA4: React Router v6 페이지 이동마다 pageview 이벤트 전송

---

## 배포

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

> ⚠️ S3 오류 문서를 반드시 `index.html`로 설정. 미설정 시 /post/slug 직접 접근 시 404 발생.

---

## 작업 시 주의사항

- 한 번에 하나의 파일/컴포넌트만 작업하고 확인 후 진행
- CSS Modules 클래스명은 camelCase (`styles.postCard`)
- Supabase 쿼리는 항상 에러 핸들링 포함 (`const { data, error } = await supabase...`)
- 이미지는 lazy loading 기본 적용 (`loading="lazy"`)
- 깨진 이미지 fallback 처리 필수 (thumbnail)
