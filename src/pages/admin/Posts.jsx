import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { POSTS, CATEGORY_COLOR } from '../../lib/mockData.js'
import { IconPlus, IconImage } from '../../components/icons/Icons.jsx'
import styles from './Posts.module.css'

const GROUP_CATS = {
  insight: ['Growth', 'CRM'],
  solution: ['AppsFlyer', 'Amplitude', 'Braze'],
  event: ['이벤트'],
  guide: ['자료실'],
}

const GROUP_TITLE = {
  insight: '인사이트',
  solution: '솔루션',
  event: '이벤트',
  guide: '자료실',
}

const GROUP_TABS = {
  insight: [
    { label: '전체', cat: '_all' },
    { label: 'Growth', cat: 'Growth' },
    { label: 'CRM', cat: 'CRM' },
  ],
  solution: [
    { label: '전체', cat: '_all' },
    { label: 'AppsFlyer', cat: 'AppsFlyer' },
    { label: 'Amplitude', cat: 'Amplitude' },
    { label: 'Braze', cat: 'Braze' },
  ],
  event: [{ label: '전체', cat: '_all' }],
  guide: [{ label: '전체', cat: '_all' }],
}

const STATUS_LABEL = {
  published: '발행',
  draft: '임시저장',
  private: '비공개',
}

const STATUS_CLASS = {
  published: 'statusPublished',
  draft: 'statusDraft',
  private: 'statusPrivate',
}

const THUMB_COLORS = [
  '#dbeafe',
  '#dcfce7',
  '#fef9c3',
  '#fce7f3',
  '#ede9fe',
  '#ffedd5',
  '#e0f2fe',
  '#d1fae5',
]

function downloadCSV(rows, group) {
  const header = ['제목', '카테고리', '상태', '조회수', '발행일', '수정일'].join(',')
  const body = rows.map((p) =>
    [
      `"${p.title.replace(/"/g, '""')}"`,
      p.cat,
      STATUS_LABEL[p.status],
      p.views,
      p.date,
      p.modified,
    ].join(','),
  )
  const bom = '﻿'
  const csv = bom + [header, ...body].join('\r\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const today = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `martinee_blog_${GROUP_TITLE[group] || '전체'}_${today}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function Posts() {
  const [searchParams] = useSearchParams()
  const initialGroup = searchParams.get('group') || 'insight'
  const initialStatus = searchParams.get('status') || 'all'

  const [group, setGroup] = useState(initialGroup)
  const [cat, setCat] = useState('_all')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(initialStatus)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [posts, setPosts] = useState(POSTS)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setGroup(searchParams.get('group') || 'insight')
    setCat('_all')
    setStatus(searchParams.get('status') || 'all')
    setSelectedIds(new Set())
    setPage(1)
  }, [searchParams])

  // 필터/검색 변경 시 1페이지로 리셋
  useEffect(() => {
    setPage(1)
  }, [cat, status, search])

  const tabs = GROUP_TABS[group] ?? []
  const allowedCats = GROUP_CATS[group] ?? []

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (!allowedCats.includes(p.cat)) return false
      if (cat !== '_all' && p.cat !== cat) return false
      if (status !== 'all' && p.status !== status) return false
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
        return false
      return true
    })
  }, [posts, allowedCats, cat, status, search])

  const PAGE_SIZE = 15
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PAGE_SIZE
  const display = filtered.slice(start, start + PAGE_SIZE)

  // 페이지 변경 시 콘텐츠 영역(스크롤 가능한 조상) 최상단으로 스크롤.
  // 첫 마운트엔 동작하지 않도록 플래그 처리.
  const contentRef = useRef(null)
  const isFirstMount = useRef(true)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    let el = contentRef.current
    while (el) {
      const overflow = window.getComputedStyle(el).overflowY
      if (overflow === 'auto' || overflow === 'scroll') {
        el.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      el = el.parentElement
    }
  }, [safePage])
  const allChecked = display.length > 0 && display.every((p) => selectedIds.has(p.id))

  function toggleAll() {
    if (allChecked) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(display.map((p) => p.id)))
    }
  }

  function toggleRow(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function bulkUpdateStatus(newStatus) {
    setPosts((prev) =>
      prev.map((p) => (selectedIds.has(p.id) ? { ...p, status: newStatus } : p)),
    )
    setSelectedIds(new Set())
  }

  function bulkDelete() {
    const n = selectedIds.size
    if (!window.confirm(`선택한 ${n}개 게시글을 삭제하시겠어요?\n삭제된 게시글은 복구할 수 없습니다.`))
      return
    setPosts((prev) => prev.filter((p) => !selectedIds.has(p.id)))
    setSelectedIds(new Set())
  }

  const hasDraftSelected = useMemo(
    () =>
      Array.from(selectedIds).some((id) => {
        const p = posts.find((x) => x.id === id)
        return p && p.status === 'draft'
      }),
    [selectedIds, posts],
  )

  return (
    <>
      <Helmet>
        <title>{GROUP_TITLE[group]} — Martinee Admin</title>
      </Helmet>

      <div className={styles.topbar}>
        <span className={styles.topbarTitle}>{GROUP_TITLE[group]}</span>
        <div className={styles.spacer} />
        <button
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={() => downloadCSV(filtered, group)}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 2v9M4 11l4 4 4-4" />
            <line x1="2" y1="15" x2="14" y2="15" />
          </svg>
          Export
        </button>
        <Link to="/admin/posts/write" className={`${styles.btn} ${styles.btnPrimary}`}>
          <IconPlus size={13} />새 게시글
        </Link>
      </div>

      <div className={styles.content} ref={contentRef}>
        <div className={styles.catTabs}>
          {tabs.map((t) => (
            <button
              key={t.cat}
              className={`${styles.catTab} ${cat === t.cat ? styles.catTabActive : ''}`}
              onClick={() => setCat(t.cat)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={styles.filterBar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="6.5" cy="6.5" r="4.5" />
                <line x1="10" y1="10" x2="14" y2="14" />
              </svg>
            </span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="제목으로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={styles.filterSelect}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">전체 상태</option>
            <option value="published">발행</option>
            <option value="private">비공개</option>
            <option value="draft">임시저장</option>
          </select>
          <select className={styles.filterSelect} defaultValue="recent">
            <option value="recent">최신순</option>
            <option value="views">조회수순</option>
            <option value="title">제목순</option>
          </select>
          <div style={{ flex: 1 }} />
          {selectedIds.size > 0 && (
            <div className={styles.bulkBar}>
              <span className={styles.bulkCount}>{selectedIds.size}개 선택됨 ·</span>
              {hasDraftSelected && (
                <button className={styles.bulkBtn} onClick={() => bulkUpdateStatus('published')}>
                  발행하기
                </button>
              )}
              <button className={styles.bulkBtn} onClick={() => bulkUpdateStatus('private')}>
                비공개로 전환
              </button>
              <button className={styles.bulkBtn} onClick={bulkDelete}>
                삭제
              </button>
            </div>
          )}
          <span className={styles.pageInfo}>
            {filtered.length === 0
              ? '0개'
              : `${start + 1}–${start + display.length} / ${filtered.length}개`}
          </span>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thCheck} style={{ paddingLeft: 16, width: 40 }}>
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                </th>
                <th className={styles.thumbCell} style={{ width: 80 }}>썸네일</th>
                <th>제목</th>
                <th>카테고리</th>
                <th>상태</th>
                <th className={styles.thCenter}>조회수</th>
                <th>발행일</th>
                <th>수정일</th>
              </tr>
            </thead>
            <tbody>
              {display.length === 0 ? (
                <tr className={styles.emptyRow}>
                  <td colSpan={8}>
                    {search || status !== 'all'
                      ? '검색 결과가 없어요'
                      : '등록된 게시글이 없어요'}
                  </td>
                </tr>
              ) : (
                display.map((p, i) => {
                  const selected = selectedIds.has(p.id)
                  const colorKey = CATEGORY_COLOR[p.cat] || 'guide'
                  const catClass =
                    styles[`cat${colorKey[0].toUpperCase()}${colorKey.slice(1)}`]
                  const statusClass = styles[STATUS_CLASS[p.status]]
                  return (
                    <tr key={p.id} className={selected ? styles.rowSelected : ''}>
                      <td className={styles.tdCheck}>
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleRow(p.id)}
                        />
                      </td>
                      <td className={styles.thumbCell}>
                        <div
                          className={styles.thumbPlaceholder}
                          style={{ background: THUMB_COLORS[i % THUMB_COLORS.length] }}
                        >
                          <IconImage />
                        </div>
                      </td>
                      <td className={styles.postTitleCell}>
                        <Link
                          to={`/admin/posts/edit/${p.id}`}
                          style={{ display: 'block' }}
                        >
                          <div className={styles.postTitle}>
                            {p.featured && <span className={styles.featuredStar}>★</span>}
                            {p.title}
                          </div>
                          <div className={styles.postSub}>{p.sub}</div>
                        </Link>
                      </td>
                      <td>
                        <span className={`${styles.catBadge} ${catClass}`}>{p.cat}</span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${statusClass}`}>
                          <span className={styles.statusDot} />
                          {STATUS_LABEL[p.status]}
                        </span>
                      </td>
                      <td className={`${styles.tdCenter} ${styles.cellViews}`}>
                        {p.views.toLocaleString()}
                      </td>
                      <td className={styles.cellDate}>{p.date}</td>
                      <td className={styles.cellDate}>{p.modified}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <div className={styles.pageButtons}>
                <button
                  className={styles.pageBtn}
                  disabled={safePage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={`${styles.pageBtn} ${n === safePage ? styles.pageBtnActive : ''}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  className={styles.pageBtn}
                  disabled={safePage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
