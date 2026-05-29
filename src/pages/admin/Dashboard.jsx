import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { POSTS, AUTHORS } from '../../lib/mockData.js'
import {
  IconPosts,
  IconClock,
  IconDraft,
  IconAuthors,
  IconPlus,
  IconChart,
  IconBraze,
  IconEvent,
  IconImage,
} from '../../components/icons/Icons.jsx'
import styles from './Dashboard.module.css'

const THUMB_COLORS = ['#dbeafe', '#dcfce7', '#fef9c3', '#fce7f3', '#ede9fe', '#ffedd5']

const STATUS_LABEL = {
  published: { text: '발행', className: 'pillPublished' },
  draft: { text: '임시저장', className: 'pillDraft' },
  private: { text: '비공개', className: 'pillPrivate' },
}

const CATEGORY_BREAKDOWN_COLORS = {
  인사이트: '#0A6CFF',
  솔루션: '#12a150',
  이벤트: '#993556',
  자료실: '#a0a0a0',
}

const GROUP_OF_CAT = {
  Growth: '인사이트',
  CRM: '인사이트',
  AppsFlyer: '솔루션',
  Amplitude: '솔루션',
  Braze: '솔루션',
  이벤트: '이벤트',
  자료실: '자료실',
}

function formatToday() {
  const d = new Date()
  const day = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()]
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${day}요일`
}

export default function Dashboard() {
  const stats = useMemo(() => {
    const total = POSTS.length
    const published = POSTS.filter((p) => p.status === 'published').length
    const draft = POSTS.filter((p) => p.status === 'draft').length
    return { total, published, draft, authors: AUTHORS.length }
  }, [])

  const recent = useMemo(
    () => [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
    [],
  )

  const topPosts = useMemo(
    () => [...POSTS].sort((a, b) => b.views - a.views).slice(0, 5),
    [],
  )

  const catBreakdown = useMemo(() => {
    const total = POSTS.length
    const counts = { 인사이트: 0, 솔루션: 0, 이벤트: 0, 자료실: 0 }
    POSTS.forEach((p) => {
      const g = GROUP_OF_CAT[p.cat]
      if (g) counts[g]++
    })
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      total,
      color: CATEGORY_BREAKDOWN_COLORS[name],
    }))
  }, [])

  return (
    <>
      <Helmet>
        <title>대시보드 — Martinee Admin</title>
      </Helmet>

      <div className={styles.topbar}>
        <span className={styles.topbarTitle}>대시보드</span>
        <span className={styles.topbarSub}>{formatToday()}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.statGrid}>
          <div className={`${styles.statCard} ${styles.statCardHighlight}`}>
            <div className={styles.statLabel}>
              <IconPosts size={14} />총 게시글
            </div>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statSub}>전체 카테고리 합산</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>
              <IconClock />발행 중
            </div>
            <div className={`${styles.statValue} ${styles.statValueSuccess}`}>
              {stats.published}
            </div>
            <div className={styles.statSub}>블로그에 노출 중</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>
              <IconDraft />임시저장
            </div>
            <div className={`${styles.statValue} ${styles.statValueDraft}`}>
              {stats.draft}
            </div>
            <div className={styles.statSub}>작성 중인 글</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>
              <IconAuthors size={14} />작성자 수
            </div>
            <div className={styles.statValue}>{stats.authors}</div>
            <div className={styles.statSub}>등록된 작성자</div>
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>최근 게시글</span>
              <Link to="/admin/posts" className={styles.sectionLink}>
                전체 보기 →
              </Link>
            </div>
            {recent.map((p, i) => {
              const status = STATUS_LABEL[p.status]
              return (
                <div key={p.id} className={styles.postRow}>
                  <div
                    className={styles.postThumb}
                    style={{ background: THUMB_COLORS[i % THUMB_COLORS.length] }}
                  >
                    <IconImage size={16} />
                  </div>
                  <div className={styles.postInfo}>
                    <div className={styles.postTitleText}>{p.title}</div>
                    <div className={styles.postMetaText}>
                      {p.cat} · {p.date}
                    </div>
                  </div>
                  <span
                    className={`${styles.statusPill} ${styles[status.className]}`}
                  >
                    {status.text}
                  </span>
                </div>
              )
            })}
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>카테고리 현황</span>
            </div>
            {catBreakdown.map((c) => (
              <div key={c.name} className={styles.catRow}>
                <div className={styles.catTop}>
                  <span className={styles.catName}>{c.name}</span>
                  <span className={styles.catCount}>{c.count}개</span>
                </div>
                <div className={styles.barBg}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${Math.round((c.count / c.total) * 100)}%`,
                      background: c.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>조회수 TOP 5</span>
              <span className={styles.sectionMeta}>누적 기준</span>
            </div>
            {topPosts.map((p, i) => (
              <div key={p.id} className={styles.topPostRow}>
                <span
                  className={`${styles.rank} ${i < 3 ? styles.rankTop : ''}`}
                >
                  {i + 1}
                </span>
                <div className={styles.topPostInfo}>
                  <div className={styles.topPostTitle}>{p.title}</div>
                  <div className={styles.topPostCat}>{p.cat}</div>
                </div>
                <span className={styles.topPostViews}>
                  {p.views.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>빠른 액션</span>
            </div>
            <div className={styles.quickGrid}>
              <Link to="/admin/posts/write" className={styles.quickBtn}>
                <div
                  className={styles.quickIcon}
                  style={{ background: 'var(--primary-light)' }}
                >
                  <IconPlus />
                </div>
                <span className={styles.quickLabel}>새 게시글</span>
              </Link>

              <Link to="/admin/authors" className={styles.quickBtn}>
                <div
                  className={styles.quickIcon}
                  style={{ background: '#e8f8ef' }}
                >
                  <IconAuthors size={16} />
                </div>
                <span className={styles.quickLabel}>작성자 추가</span>
              </Link>

              <Link
                to="/admin/posts?status=draft"
                className={styles.quickBtn}
              >
                <div
                  className={styles.quickIcon}
                  style={{ background: 'var(--gray-7)' }}
                >
                  <IconDraft size={16} />
                </div>
                <span className={styles.quickLabel}>
                  임시저장 {stats.draft}개
                </span>
              </Link>

              <Link
                to="/admin/posts?group=insight"
                className={styles.quickBtn}
              >
                <div
                  className={styles.quickIcon}
                  style={{ background: '#e8f8ef' }}
                >
                  <IconChart />
                </div>
                <span className={styles.quickLabel}>인사이트</span>
              </Link>

              <Link
                to="/admin/posts?group=solution"
                className={styles.quickBtn}
              >
                <div
                  className={styles.quickIcon}
                  style={{ background: '#faeeda' }}
                >
                  <IconBraze />
                </div>
                <span className={styles.quickLabel}>솔루션</span>
              </Link>

              <Link
                to="/admin/posts?group=event"
                className={styles.quickBtn}
              >
                <div
                  className={styles.quickIcon}
                  style={{ background: '#fbeaf0' }}
                >
                  <IconEvent />
                </div>
                <span className={styles.quickLabel}>이벤트</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
