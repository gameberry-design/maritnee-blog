// Phase 03 (Supabase 연동) 전까지 사용하는 임시 데이터.
// 실 데이터로 전환 시 이 파일은 삭제하고 src/lib/supabase.js의 쿼리로 교체.

export const CATEGORY_GROUPS = {
  insight: { title: '인사이트', cats: ['Growth', 'CRM'] },
  solution: { title: '솔루션', cats: ['AppsFlyer', 'Amplitude', 'Braze'] },
  event: { title: '이벤트', cats: ['이벤트'] },
  guide: { title: '자료실', cats: ['자료실'] },
}

export const CATEGORY_COLOR = {
  Growth: 'growth',
  CRM: 'crm',
  AppsFlyer: 'appsflyer',
  Amplitude: 'amplitude',
  Braze: 'braze',
  이벤트: 'event',
  자료실: 'guide',
}

export const TEAM_COLOR = {
  Growth: 'growth',
  CRM: 'crm',
  Braze: 'braze',
  AppsFlyer: 'appsflyer',
  Amplitude: 'amplitude',
  Design: 'design',
}

export const POSTS = [
  { id: 1, title: '마케팅 워크플로우에서 에이전틱 AI를 활용하는 방법', sub: 'AI 기반 마케팅 자동화의 실전 가이드', cat: 'Growth', status: 'published', views: 2841, date: '2026-05-11', modified: '2026-05-15', featured: true },
  { id: 2, title: 'Amplitude AI Assistant: 프로덕트 경험을 바꾸는 AI 고객 지원', sub: 'AI가 바꾸는 프로덕트 분석의 미래', cat: 'Amplitude', status: 'published', views: 1932, date: '2026-04-30', modified: '2026-04-30', featured: false },
  { id: 3, title: '브랜드 vs 혜택, 무엇이 더 전환을 만드는가?', sub: '전환율 최적화를 위한 마케팅 전략 분석', cat: 'Growth', status: 'published', views: 3104, date: '2026-04-22', modified: '2026-05-11', featured: true },
  { id: 4, title: '[Review] Grow with Braze Seoul 2026', sub: '브레이즈 서울 컨퍼런스 현장 리뷰', cat: '이벤트', status: 'published', views: 892, date: '2026-04-09', modified: '2026-04-09', featured: false },
  { id: 5, title: '[Review] AppsFlyer BFSI Experience in Bangkok', sub: 'BFSI 금융 마케팅 인사이트 총정리', cat: 'AppsFlyer', status: 'published', views: 764, date: '2026-04-03', modified: '2026-04-24', featured: false },
  { id: 6, title: '[인터뷰] 분석이 아니라, 결정을 설계하는 팀입니다', sub: '마티니 그로스팀 리더 인터뷰', cat: 'Growth', status: 'published', views: 2210, date: '2026-03-31', modified: '2026-04-27', featured: false },
  { id: 7, title: '[Review] CRM Leadership Lunch - 고객 경험의 새로운 기준', sub: 'CRM 리더십 런치 이벤트 현장 리뷰', cat: '이벤트', status: 'published', views: 543, date: '2026-03-31', modified: '2026-04-03', featured: false },
  { id: 8, title: 'CRM으로 UI/UX 개선하기: 예스24를 사례로', sub: 'CRM 데이터를 활용한 UX 개선 방법론', cat: 'CRM', status: 'published', views: 1876, date: '2026-03-19', modified: '2026-04-01', featured: false },
  { id: 9, title: '고퀄리티 광고에 익숙해진 고객에게 던지는 새로운 자극', sub: '광고 피로도를 극복하는 크리에이티브 전략', cat: 'Growth', status: 'draft', views: 0, date: '2026-03-17', modified: '2026-04-03', featured: false },
  { id: 10, title: '[Review] Growth Marketing Forward 2026', sub: '그로스 마케팅 컨퍼런스 핵심 인사이트', cat: '이벤트', status: 'published', views: 1243, date: '2026-03-06', modified: '2026-04-03', featured: false },
  { id: 11, title: '오디언스 타겟팅: 데이터로 성과 개선의 지름길 제시하기', sub: '퍼스트파티 데이터 기반 타겟팅 전략', cat: 'CRM', status: 'private', views: 987, date: '2026-02-13', modified: '2026-02-20', featured: false },
  { id: 12, title: 'AppsFlyer MCP: AI 시대를 위한 마케팅 인텔리전스', sub: 'MCP 연동으로 마케팅 분석 자동화하기', cat: 'AppsFlyer', status: 'published', views: 1654, date: '2026-02-04', modified: '2026-04-30', featured: true },
  { id: 13, title: '브레이즈 캔버스(Canvas) 활용하기', sub: '캔버스로 구현하는 멀티채널 고객 여정', cat: 'Braze', status: 'published', views: 2387, date: '2026-01-09', modified: '2026-04-27', featured: false },
  { id: 14, title: '[브레이즈 활용도 자가진단] 브레이즈(Braze), 잘 활용하고 계신가요?', sub: '브레이즈 활용도 자가진단 체크리스트', cat: 'Braze', status: 'published', views: 3021, date: '2026-01-06', modified: '2026-04-27', featured: true },
  { id: 15, title: 'CRM 마케팅이란? 초보자를 위한 CRM 마케팅 A to Z', sub: 'CRM 마케팅 입문자를 위한 완벽 가이드', cat: 'CRM', status: 'draft', views: 0, date: '2026-01-05', modified: '2026-04-27', featured: false },
  { id: 16, title: '브레이즈(Braze)란? 브레이즈 핵심 기능 알아보기', sub: '브레이즈 플랫폼 기능 완벽 분석', cat: 'Braze', status: 'published', views: 4102, date: '2025-12-29', modified: '2026-04-24', featured: true },
  { id: 17, title: '[인터뷰] 고객 경험을 설계하는 팀입니다', sub: '마티니 CRM팀 인터뷰', cat: 'CRM', status: 'published', views: 1876, date: '2025-12-24', modified: '2026-04-24', featured: false },
  { id: 18, title: '항공으로 바라본 트래픽 캠페인이 구매 효율에 미치는 영향', sub: '항공 업계 트래픽 캠페인 성과 분석', cat: 'Growth', status: 'published', views: 743, date: '2025-12-16', modified: '2026-03-20', featured: false },
  { id: 19, title: '데이터 분석의 새로운 파트너: Ask Amplitude', sub: '자연어로 데이터 분석하는 AI 어시스턴트', cat: 'Amplitude', status: 'published', views: 2156, date: '2025-12-11', modified: '2026-04-30', featured: false },
  { id: 20, title: '정적형과 반응형, 마케터가 놓치면 안 될 소재 테스트 결과', sub: '광고 소재 A/B 테스트 결과 분석', cat: 'Growth', status: 'published', views: 1432, date: '2025-12-09', modified: '2025-12-09', featured: false },
  { id: 21, title: 'CRM 자동화: 이탈 고객을 되돌리는 방법', sub: '리텐션 캠페인 실전 가이드', cat: 'CRM', status: 'published', views: 1120, date: '2025-11-30', modified: '2025-11-30', featured: false },
  { id: 22, title: 'Braze Content Cards 활용 전략', sub: '콘텐츠 카드로 개인화 마케팅 구현', cat: 'Braze', status: 'published', views: 890, date: '2025-11-20', modified: '2025-11-20', featured: false },
  { id: 23, title: 'AppsFlyer Protect360 딥다이브', sub: '광고 사기 방지의 모든 것', cat: 'AppsFlyer', status: 'published', views: 670, date: '2025-11-10', modified: '2025-11-10', featured: false },

  // === 인사이트 샘플 확장 (Growth 23개 + CRM 16개) ===
  { id: 24, title: 'CAC vs LTV: 진짜 중요한 지표는 무엇인가', sub: '단위경제 관점에서 본 마케팅 효율', cat: 'Growth', status: 'published', views: 2840, date: '2026-05-22', modified: '2026-05-22', featured: false },
  { id: 25, title: '리타게팅 캠페인 ROI를 2배로 만든 전략', sub: '세그먼트 정교화와 빈도 최적화', cat: 'Growth', status: 'published', views: 1920, date: '2026-05-18', modified: '2026-05-20', featured: false },
  { id: 26, title: 'First-party 데이터 시대, 마케터가 준비해야 할 것', sub: '쿠키리스 환경 대응 가이드', cat: 'Growth', status: 'published', views: 3210, date: '2026-05-14', modified: '2026-05-14', featured: false },
  { id: 27, title: '그로스 해킹의 함정: 단기 성과의 그늘', sub: '지속 가능한 그로스의 조건', cat: 'Growth', status: 'published', views: 1580, date: '2026-05-08', modified: '2026-05-08', featured: false },
  { id: 28, title: '랜딩 페이지 A/B 테스트, 무엇을 먼저 바꿔야 할까', sub: '우선순위가 높은 7가지 요소', cat: 'Growth', status: 'published', views: 2410, date: '2026-05-02', modified: '2026-05-05', featured: false },
  { id: 29, title: '유입 채널별 컨버전 분석: 채널 믹스 최적화', sub: '예산 재분배로 효율 30% 개선 사례', cat: 'Growth', status: 'published', views: 2180, date: '2026-04-27', modified: '2026-04-27', featured: false },
  { id: 30, title: '퍼널 분석으로 본 이탈 포인트 발견하기', sub: '단계별 드롭오프 줄이는 방법', cat: 'Growth', status: 'published', views: 1730, date: '2026-04-21', modified: '2026-04-21', featured: false },
  { id: 31, title: '마케팅 자동화 도입 전 점검할 5가지', sub: '실패 사례에서 배우는 체크리스트', cat: 'Growth', status: 'draft', views: 0, date: '2026-04-18', modified: '2026-04-18', featured: false },
  { id: 32, title: '검색 광고 vs 디스플레이 광고: 예산 분배 가이드', sub: '업종별 권장 비율과 시나리오', cat: 'Growth', status: 'published', views: 1420, date: '2026-04-12', modified: '2026-04-15', featured: false },
  { id: 33, title: '인플루언서 마케팅의 측정 가능성', sub: '브랜드 리프트와 직접 전환 분리하기', cat: 'Growth', status: 'published', views: 1090, date: '2026-04-08', modified: '2026-04-08', featured: false },
  { id: 34, title: '유저 코호트 분석으로 LTV 개선하기', sub: '월별 코호트가 알려주는 인사이트', cat: 'Growth', status: 'published', views: 1980, date: '2026-04-02', modified: '2026-04-02', featured: true },
  { id: 35, title: '광고 크리에이티브 피로도 해소법', sub: '러닝 시간과 변주 주기 잡기', cat: 'Growth', status: 'published', views: 1310, date: '2026-03-28', modified: '2026-03-28', featured: false },
  { id: 36, title: 'SEO에서 GEO로: 검색 환경의 변화', sub: 'AI 검색 시대의 콘텐츠 전략', cat: 'Growth', status: 'published', views: 2670, date: '2026-03-22', modified: '2026-03-25', featured: false },
  { id: 37, title: '전환율을 좌우하는 결제 UX 개선', sub: '단 3가지 변경으로 +12% 사례', cat: 'Growth', status: 'published', views: 1840, date: '2026-03-15', modified: '2026-03-15', featured: false },
  { id: 38, title: '유튜브 쇼츠를 활용한 브랜드 빌딩', sub: '도달과 유지의 균형 잡기', cat: 'Growth', status: 'published', views: 920, date: '2026-03-09', modified: '2026-03-09', featured: false },
  { id: 39, title: '퍼포먼스 마케팅에서 브랜드 가치 측정', sub: '직접 전환을 넘어선 지표 설계', cat: 'Growth', status: 'published', views: 1450, date: '2026-03-03', modified: '2026-03-03', featured: false },
  { id: 40, title: '데이터 클린룸의 등장과 마케터의 역할', sub: '협업과 보안의 새로운 균형점', cat: 'Growth', status: 'draft', views: 0, date: '2026-02-26', modified: '2026-02-26', featured: false },
  { id: 41, title: '프로모션 의존도를 낮추는 방법', sub: '할인 없이도 전환되는 메시지 구조', cat: 'Growth', status: 'published', views: 1280, date: '2026-02-20', modified: '2026-02-20', featured: false },
  { id: 42, title: 'Google Analytics 4 마이그레이션 체크리스트', sub: 'GA4로 옮긴 후 점검할 12가지', cat: 'Growth', status: 'published', views: 3340, date: '2026-02-14', modified: '2026-02-18', featured: true },
  { id: 43, title: 'Mobile Measurement Partner 선택 가이드', sub: 'AppsFlyer, Adjust, Branch 비교', cat: 'Growth', status: 'published', views: 1690, date: '2026-02-09', modified: '2026-02-09', featured: false },
  { id: 44, title: '퍼포먼스 마케팅 KPI 재정의', sub: 'ROAS만으로 부족한 이유', cat: 'Growth', status: 'private', views: 750, date: '2026-02-04', modified: '2026-02-06', featured: false },
  { id: 45, title: '마케팅 어트리뷰션 모델 비교', sub: 'Last-click부터 Data-driven까지', cat: 'Growth', status: 'published', views: 2110, date: '2026-01-29', modified: '2026-01-29', featured: false },
  { id: 46, title: '랜딩 페이지 컨버전 최적화 7가지 원칙', sub: '오랫동안 유효한 기본기 정리', cat: 'Growth', status: 'published', views: 2870, date: '2026-01-22', modified: '2026-01-25', featured: false },

  { id: 47, title: '이메일 마케팅 오픈율을 2배로 만드는 제목 작성법', sub: '제목 카피의 4가지 패턴', cat: 'CRM', status: 'published', views: 2540, date: '2026-05-19', modified: '2026-05-19', featured: false },
  { id: 48, title: '푸시 알림 발송 최적 시간 분석', sub: '오픈율 데이터 1만건 분석', cat: 'CRM', status: 'published', views: 1830, date: '2026-05-13', modified: '2026-05-13', featured: false },
  { id: 49, title: 'CRM 캠페인의 빈도 vs 성과 균형', sub: '피로도 곡선을 만드는 방법', cat: 'CRM', status: 'published', views: 1620, date: '2026-05-06', modified: '2026-05-06', featured: false },
  { id: 50, title: '구매 직후 24시간의 중요성', sub: '리피트 전환을 만드는 골든 윈도우', cat: 'CRM', status: 'published', views: 2190, date: '2026-04-29', modified: '2026-04-29', featured: false },
  { id: 51, title: '이탈 고객 winback 캠페인 설계', sub: '단계별 메시지와 인센티브 전략', cat: 'CRM', status: 'published', views: 1480, date: '2026-04-23', modified: '2026-04-25', featured: false },
  { id: 52, title: 'VIP 고객 세그먼트 정의와 관리', sub: 'RFM 모델 실무 적용 가이드', cat: 'CRM', status: 'published', views: 2030, date: '2026-04-17', modified: '2026-04-17', featured: true },
  { id: 53, title: '퍼스널라이제이션 vs 프라이버시', sub: '둘 다 잡는 데이터 활용법', cat: 'CRM', status: 'published', views: 1370, date: '2026-04-11', modified: '2026-04-11', featured: false },
  { id: 54, title: '라이프사이클 단계별 메시지 전략', sub: '신규부터 휴면까지 7단계', cat: 'CRM', status: 'published', views: 1910, date: '2026-04-05', modified: '2026-04-05', featured: false },
  { id: 55, title: '온보딩 시퀀스 최적화 사례', sub: '첫 7일 동안 보내야 할 5개 메시지', cat: 'CRM', status: 'published', views: 2260, date: '2026-03-30', modified: '2026-03-30', featured: false },
  { id: 56, title: '리텐션을 좌우하는 첫 7일', sub: '습관화 구간을 만드는 방법', cat: 'CRM', status: 'published', views: 2780, date: '2026-03-24', modified: '2026-03-24', featured: false },
  { id: 57, title: '고객 세그먼트 자동화 모범 사례', sub: '룰 기반 vs 머신러닝 비교', cat: 'CRM', status: 'draft', views: 0, date: '2026-03-18', modified: '2026-03-18', featured: false },
  { id: 58, title: '구매 이력 기반 추천 알고리즘', sub: '협업 필터링 실무 적용', cat: 'CRM', status: 'published', views: 1140, date: '2026-03-12', modified: '2026-03-12', featured: false },
  { id: 59, title: '고객 여정 맵핑 실무 가이드', sub: '디지털 터치포인트 정리법', cat: 'CRM', status: 'published', views: 1660, date: '2026-03-06', modified: '2026-03-06', featured: false },
  { id: 60, title: '이커머스 장바구니 이탈 회복', sub: '리마인더 시퀀스 설계 사례', cat: 'CRM', status: 'published', views: 1820, date: '2026-02-28', modified: '2026-02-28', featured: false },
  { id: 61, title: '트랜잭셔널 이메일의 마케팅 활용', sub: '높은 오픈율을 활용하는 방법', cat: 'CRM', status: 'published', views: 1290, date: '2026-02-22', modified: '2026-02-22', featured: false },
  { id: 62, title: 'CRM 데이터 위생 관리', sub: '중복/오류 데이터 정리 자동화', cat: 'CRM', status: 'private', views: 620, date: '2026-02-15', modified: '2026-02-17', featured: false },
]

export const AUTHORS = [
  { id: 1, nameKo: '홍길동', nameEn: 'Gildong Hong', job: 'Growth Marketing Lead', team: 'Growth', email: 'member01@martinee.io', bio: '그로스 마케팅 전문가.', posts: 24 },
  { id: 2, nameKo: '김민준', nameEn: 'Minjun Kim', job: 'COO', team: 'CRM', email: 'member02@martinee.io', bio: '마티니 COO.', posts: 18 },
  { id: 3, nameKo: '이서연', nameEn: 'Seoyeon Lee', job: 'CRM Part Lead', team: 'CRM', email: 'member03@martinee.io', bio: 'CRM 파트 리드.', posts: 31 },
  { id: 4, nameKo: '박지호', nameEn: 'Jiho Park', job: 'B2B Marketing Manager', team: 'Growth', email: 'member04@martinee.io', bio: 'B2B 마케팅 매니저.', posts: 15 },
  { id: 5, nameKo: '최수아', nameEn: 'Sua Choi', job: 'CRM Consultant', team: 'Braze', email: 'member05@martinee.io', bio: '브레이즈 전문 컨설턴트.', posts: 22 },
  { id: 6, nameKo: '정도윤', nameEn: 'Doyun Jung', job: 'AppsFlyer Specialist', team: 'AppsFlyer', email: 'member06@martinee.io', bio: 'AppsFlyer 전문가.', posts: 9 },
  { id: 7, nameKo: '윤하린', nameEn: 'Harin Yoon', job: 'Amplitude Analyst', team: 'Amplitude', email: 'member07@martinee.io', bio: 'Amplitude 분석가.', posts: 7 },
  { id: 8, nameKo: '강민서', nameEn: 'Minseo Kang', job: 'Design Lead', team: 'Design', email: 'member08@martinee.io', bio: '디자인 리드.', posts: 3 },
]

export const CURRENT_USER = {
  name: '세영',
  email: 'design@martinee.io',
  avatarLetter: '세',
}
