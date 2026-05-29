// HTML 아티팩트의 inline SVG를 재사용 가능한 컴포넌트로 묶음.
// 모두 16x16 viewBox, stroke=currentColor 기준.

export function IconDashboard({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="14" height="14" rx="2" />
      <line x1="1" y1="5.5" x2="15" y2="5.5" />
      <line x1="5" y1="5.5" x2="5" y2="15" />
    </svg>
  )
}

export function IconPosts({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 3h12M2 8h12M2 13h8" />
    </svg>
  )
}

export function IconAuthors({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14a6 6 0 0112 0" />
    </svg>
  )
}

export function IconLogout({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3H3a1 1 0 00-1 1v8a1 1 0 001 1h3M10 5l3 3-3 3M13 8H6" />
    </svg>
  )
}

export function IconClock({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3l2 2" />
    </svg>
  )
}

export function IconDraft({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 2h12v10H2z" />
      <path d="M5 15h6M8 12v3" />
    </svg>
  )
}

export function IconPlus({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="2" x2="8" y2="14" />
      <line x1="2" y1="8" x2="14" y2="8" />
    </svg>
  )
}

export function IconChart({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="1,12 5,7 8,9 12,4 15,6" />
    </svg>
  )
}

export function IconBraze({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="5" />
      <path d="M8 5v3l2 2" />
    </svg>
  )
}

export function IconEvent({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <line x1="5" y1="1" x2="5" y2="5" />
      <line x1="11" y1="1" x2="11" y2="5" />
      <line x1="2" y1="7" x2="14" y2="7" />
    </svg>
  )
}

export function IconExternalLink({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2h5v5" />
      <path d="M14 2L7 9" />
      <path d="M12 9v4a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4" />
    </svg>
  )
}

export function IconImage({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 14" fill="none">
      <rect x="1" y="1" width="16" height="12" rx="2" stroke="#ccc" strokeWidth="1.2" />
      <circle cx="5.5" cy="5" r="1.5" fill="#ccc" />
      <path d="M1 10l4-3 3 3 3-4 5 4" stroke="#ccc" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </svg>
  )
}
