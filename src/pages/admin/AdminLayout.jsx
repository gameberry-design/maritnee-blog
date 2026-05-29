import { Link, NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import {
  IconDashboard,
  IconPosts,
  IconAuthors,
  IconLogout,
} from '../../components/icons/Icons.jsx'
import {
  POSTS,
  AUTHORS,
  CURRENT_USER,
  CATEGORY_GROUPS,
  GROUP_OF_CAT,
} from '../../lib/mockData.js'
import styles from './AdminLayout.module.css'

export default function AdminLayout() {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const counts = useMemo(() => {
    const c = { total: POSTS.length, insight: 0, solution: 0, event: 0, guide: 0 }
    POSTS.forEach((p) => {
      const g = GROUP_OF_CAT[p.cat]
      if (g) c[g]++
    })
    return c
  }, [])

  // 사이드바 하위 메뉴 active 판정:
  //  - /admin/posts 목록: ?group= 또는 기본 'insight'
  //  - /admin/posts/* 하위 경로(write/edit): 링크에서 넘긴 ?group= 사용
  //  - 그 외(dashboard/authors): 비활성
  const activeGroup = (() => {
    if (pathname === '/admin/posts') return searchParams.get('group') || 'insight'
    if (pathname.startsWith('/admin/posts/')) return searchParams.get('group')
    return null
  })()

  const navItemClass = ({ isActive }) =>
    `${styles.navItem} ${isActive ? styles.active : ''}`

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            MARTINEE<span>.</span>ADMIN
          </div>
        </div>

        <div className={styles.userCard}>
          <div className={styles.userAvatar}>{CURRENT_USER.avatarLetter}</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{CURRENT_USER.name}</div>
            <div className={styles.userEmail}>{CURRENT_USER.email}</div>
          </div>
          <button className={styles.logoutBtn} title="로그아웃">
            <IconLogout />
          </button>
        </div>

        <nav className={styles.nav}>
          <NavLink to="/admin" end className={navItemClass}>
            <span className={styles.navIcon}>
              <IconDashboard />
            </span>
            대시보드
          </NavLink>

          {/* 그룹 헤더 — 클릭은 가능하지만 active 스타일은 적용하지 않음 */}
          <Link to="/admin/posts" className={styles.navItem}>
            <span className={styles.navIcon}>
              <IconPosts />
            </span>
            게시글 관리
            <span className={styles.navBadge}>{counts.total}</span>
          </Link>

          <div className={styles.subNav}>
            {Object.entries(CATEGORY_GROUPS).map(([key, { title }]) => (
              <Link
                key={key}
                to={`/admin/posts?group=${key}`}
                className={`${styles.subNavItem} ${activeGroup === key ? styles.active : ''}`}
              >
                {title}
                <span className={styles.subNavCount}>{counts[key]}</span>
              </Link>
            ))}
          </div>

          <NavLink to="/admin/authors" className={navItemClass}>
            <span className={styles.navIcon}>
              <IconAuthors />
            </span>
            작성자 관리
            <span className={styles.navCount}>{AUTHORS.length}</span>
          </NavLink>
        </nav>
      </aside>

      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  )
}
