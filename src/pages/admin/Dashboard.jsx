import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { POSTS, AUTHORS, GROUP_OF_CAT } from '../../lib/mockData.js'
import {
  IconPosts,
  IconClock,
  IconDraft,
  IconAuthors,
  IconImage,
} from '../../components/icons/Icons.jsx'
import styles from './Dashboard.module.css'

const THUMB_COLORS = ['#dbeafe', '#dcfce7', '#fef9c3', '#fce7f3', '#ede9fe', '#ffedd5']

const STATUS_LABEL = {
  published: { text: '발행', className: 'pillPublished' },
  draft: { text: '임시저장', className: 'pillDraft' },
  private: { text: '비공개', className: 'pillPrivate' },
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
                <Link
                  key={p.id}
                  to={`/admin/posts/edit/${p.id}?group=${GROUP_OF_CAT[p.cat] || ''}`}
                  className={styles.postRow}
                >
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
                </Link>
              )
            })}
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>조회수 TOP 5</span>
              <span className={styles.sectionMeta}>누적 기준</span>
            </div>
            {topPosts.map((p, i) => (
              <Link
                key={p.id}
                to={`/admin/posts/edit/${p.id}`}
                className={styles.topPostRow}
              >
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
