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
