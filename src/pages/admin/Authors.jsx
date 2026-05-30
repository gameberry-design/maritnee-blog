import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AUTHORS, TEAM_COLOR } from '../../lib/mockData.js'
import { IconPlus } from '../../components/icons/Icons.jsx'
import Select from '../../components/admin/Select.jsx'
import styles from './Authors.module.css'

const AVATAR_BG = ['#dbeafe', '#dcfce7', '#fef9c3', '#fce7f3', '#ede9fe', '#ffedd5', '#e0f2fe', '#d1fae5']
const AVATAR_TEXT = ['#185fa5', '#1a7a3a', '#854f0b', '#993556', '#6a20c0', '#993c1d', '#0369a1', '#065f46']

const TEAMS = ['Growth', 'CRM', 'Braze', 'AppsFlyer', 'Amplitude', 'Design']

const emptyForm = {
  nameKo: '',
  nameEn: '',
  job: '',
  team: '',
  email: '',
  bio: '',
  linkedin: '',
  facebook: '',
  instagram: '',
  blog: '',
}

export default function Authors() {
  const [authors, setAuthors] = useState(AUTHORS)
  const [search, setSearch] = useState('')
  const [teamFilter, setTeamFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const filtered = useMemo(() => {
    return authors.filter((a) => {
      const sOk =
        !search ||
        a.nameKo.includes(search) ||
        a.nameEn.toLowerCase().includes(search.toLowerCase())
      const tOk = teamFilter === 'all' || a.team === teamFilter
      return sOk && tOk
    })
  }, [authors, search, teamFilter])

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(a) {
    setEditingId(a.id)
    setForm({
      nameKo: a.nameKo,
      nameEn: a.nameEn,
      job: a.job,
      team: a.team,
      email: a.email,
      bio: a.bio,
      linkedin: '',
      facebook: '',
      instagram: '',
      blog: '',
    })
    setModalOpen(true)
  }

  function close() {
    setModalOpen(false)
  }

  function save() {
    if (!form.nameKo || !form.nameEn || !form.job || !form.email) {
      window.alert('필수 항목을 모두 입력해 주세요.')
      return
    }
    if (editingId) {
      setAuthors((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a)),
      )
    } else {
      setAuthors((prev) => [
        ...prev,
        { id: Date.now(), ...form, posts: 0 },
      ])
    }
    setModalOpen(false)
  }

  function removeAuthor() {
    const a = authors.find((x) => x.id === editingId)
    if (!a) return
    if (!window.confirm(`'${a.nameKo}' 작성자를 삭제하시겠어요?`)) return
    setAuthors((prev) => prev.filter((x) => x.id !== editingId))
    setModalOpen(false)
  }

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <Helmet>
        <title>작성자 관리 — Martinee Admin</title>
      </Helmet>

      <div className={styles.topbar}>
        <span className={styles.topbarTitle}>작성자 관리</span>
        <div className={styles.spacer} />
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={openAdd}>
          <IconPlus size={13} />작성자 추가
        </button>
      </div>

      <div className={styles.content}>
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
              placeholder="이름으로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={teamFilter}
            onChange={setTeamFilter}
            options={[
              { value: 'all', label: '전체 팀' },
              ...TEAMS.map((t) => ({ value: t, label: t })),
            ]}
            width={130}
          />
        </div>

        <div className={styles.list}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 48 }} />
                <th>이름</th>
                <th>직책</th>
                <th>소속 팀</th>
                <th>게시글</th>
                <th>이메일</th>
                <th style={{ width: 80 }} />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr className={styles.emptyRow}>
                  <td colSpan={7}>검색 결과가 없어요</td>
                </tr>
              ) : (
                filtered.map((a, i) => {
                  const teamKey = TEAM_COLOR[a.team] || 'design'
                  const teamClass =
                    styles[`team${teamKey[0].toUpperCase()}${teamKey.slice(1)}`]
                  return (
                    <tr key={a.id} onClick={() => openEdit(a)}>
                      <td>
                        <div
                          className={styles.authorImg}
                          style={{
                            background: AVATAR_BG[i % AVATAR_BG.length],
                            color: AVATAR_TEXT[i % AVATAR_TEXT.length],
                          }}
                        >
                          {a.nameKo[0]}
                        </div>
                      </td>
                      <td>
                        <div className={styles.authorNameKo}>{a.nameKo}</div>
                        <div className={styles.authorNameEn}>{a.nameEn}</div>
                      </td>
                      <td className={styles.cellJob}>{a.job}</td>
                      <td>
                        <span className={`${styles.teamBadge} ${teamClass}`}>
                          {a.team}
                        </span>
                      </td>
                      <td className={styles.cellPosts}>{a.posts}개</td>
                      <td className={styles.cellEmail}>{a.email}</td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <button
                          className={styles.actionBtn}
                          onClick={() => openEdit(a)}
                        >
                          수정
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={close}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>
                {editingId ? '작성자 수정' : '작성자 추가'}
              </span>
              <button className={styles.modalClose} onClick={close}>
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.uploadBox} onClick={() => window.alert('Supabase Storage 연결 시 활성화')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--gray-4)' }}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
                <span style={{ fontSize: 13, color: 'var(--gray-4)' }}>클릭 또는 드래그</span>
                <span style={{ fontSize: 13, color: 'var(--gray-5)' }}>권장: 200×200px</span>
              </div>
              <div className={styles.uploadHint}>프로필 사진을 업로드하세요</div>

              <div className={styles.mfield}>
                <div className={styles.mfieldLabel}>이름 (한국어) <span className={styles.req}>*</span></div>
                <input
                  className={styles.mfieldInput}
                  type="text"
                  placeholder="홍길동"
                  value={form.nameKo}
                  onChange={(e) => setField('nameKo', e.target.value)}
                />
              </div>
              <div className={styles.mfield}>
                <div className={styles.mfieldLabel}>이름 (영문) <span className={styles.req}>*</span></div>
                <input
                  className={styles.mfieldInput}
                  type="text"
                  placeholder="Gildong Hong"
                  value={form.nameEn}
                  onChange={(e) => setField('nameEn', e.target.value)}
                />
              </div>
              <div className={styles.mfield}>
                <div className={styles.mfieldLabel}>직책 <span className={styles.req}>*</span></div>
                <input
                  className={styles.mfieldInput}
                  type="text"
                  placeholder="CRM Consultant"
                  value={form.job}
                  onChange={(e) => setField('job', e.target.value)}
                />
              </div>
              <div className={styles.mfield}>
                <div className={styles.mfieldLabel}>소속 팀</div>
                <Select
                  value={form.team}
                  onChange={(v) => setField('team', v)}
                  options={[
                    { value: '', label: '선택' },
                    ...TEAMS.map((t) => ({ value: t, label: t })),
                  ]}
                  placeholder="선택"
                />
              </div>
              <div className={styles.mfield}>
                <div className={styles.mfieldLabel}>이메일 <span className={styles.req}>*</span></div>
                <input
                  className={styles.mfieldInput}
                  type="email"
                  placeholder="name@martinee.io"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                />
              </div>
              <div className={styles.mfield}>
                <div className={styles.mfieldLabel}>소개</div>
                <textarea
                  className={styles.mfieldInput}
                  rows={2}
                  placeholder="간단한 소개를 입력하세요"
                  style={{ resize: 'none' }}
                  value={form.bio}
                  onChange={(e) => setField('bio', e.target.value)}
                />
              </div>

              <div style={{ marginTop: 16 }}>
                <div className={styles.mfieldSection}>SNS 링크</div>
                {[
                  ['linkedin', 'LinkedIn', 'https://linkedin.com/in/...'],
                  ['facebook', 'Facebook', 'https://facebook.com/...'],
                  ['instagram', 'Instagram', 'https://instagram.com/...'],
                  ['blog', 'Blog (브런치 등)', 'https://brunch.co.kr/...'],
                ].map(([key, label, placeholder]) => (
                  <div key={key} className={styles.mfield}>
                    <div className={styles.mfieldLabel}>{label}</div>
                    <input
                      className={styles.mfieldInput}
                      type="text"
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) => setField(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modalFooter}>
              {editingId && (
                <button className={styles.deleteBtn} onClick={removeAuthor}>
                  삭제
                </button>
              )}
              <button className={`${styles.btn} ${styles.btnGhost}`} onClick={close}>
                취소
              </button>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={save}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
