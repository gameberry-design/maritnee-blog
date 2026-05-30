import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Editor from '../../components/admin/Editor.jsx'
import Select from '../../components/admin/Select.jsx'
import { IconExternalLink } from '../../components/icons/Icons.jsx'
import { CURRENT_USER } from '../../lib/mockData.js'
import styles from './PostForm.module.css'

const CATEGORIES = ['Growth', 'CRM', 'AppsFlyer', 'Amplitude', 'Braze', '이벤트', '자료실']

const FEATURED_TOGGLES = [
  { key: 'home', label: '홈 Featured', sub: '첫화면 Popular/Recommend 노출' },
  { key: 'growth', label: 'Growth Featured', sub: '카테고리 상단 노출' },
  { key: 'crm', label: 'CRM Featured', sub: '카테고리 상단 노출' },
  { key: 'event', label: 'Event Featured', sub: '카테고리 상단 노출' },
]

function slugify(text) {
  const map = {
    브랜드: 'brand', 혜택: 'benefits', 전환: 'conversion',
    마케팅: 'marketing', 전략: 'strategy', 가이드: 'guide',
    분석: 'analysis', 데이터: 'data', 고객: 'customer',
    경험: 'experience', 팀: 'team', 인터뷰: 'interview',
  }
  let s = text.toLowerCase()
  for (const [k, v] of Object.entries(map)) s = s.replace(new RegExp(k, 'g'), v)
  return s
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

const today = () => new Date().toISOString().split('T')[0]

const STATUS_LABEL = {
  published: '발행됨',
  private: '비공개',
  draft: '임시저장',
}

const STATUS_CLASS = {
  published: '',
  private: 'private',
  draft: 'draft',
}

// initial 데이터 기본형
const emptyData = {
  title: '',
  sub: '',
  content: '',
  slug: '',
  pubDate: today(),
  videoLink: '',
  cats: [],
  mainCat: '',
  tags: [],
  featured: { home: false, growth: false, crm: false, event: false },
  status: 'draft',
}

export default function PostFormPage({ mode = 'create', initial }) {
  const navigate = useNavigate()
  const isEdit = mode === 'edit'
  const [data, setData] = useState({ ...emptyData, ...(initial || {}) })
  const [accOpen, setAccOpen] = useState({
    cat: true, basic: true, thumb: true,
    tags: false, featured: false, author: false, cta: false,
  })
  const [tagInput, setTagInput] = useState('')
  const [previewMode, setPreviewMode] = useState(false)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [draftLabel, setDraftLabel] = useState(
    isEdit && initial?.modified
      ? `마지막 수정: ${initial.modified}`
      : '임시저장됨',
  )
  const titleRef = useRef(null)
  const subRef = useRef(null)
  const slugTouched = useRef(isEdit)

  // 자동 리사이즈
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto'
      titleRef.current.style.height = titleRef.current.scrollHeight + 'px'
    }
  }, [data.title])

  useEffect(() => {
    if (subRef.current) {
      subRef.current.style.height = 'auto'
      subRef.current.style.height = subRef.current.scrollHeight + 'px'
    }
  }, [data.sub])

  function update(patch) {
    setData((prev) => ({ ...prev, ...patch }))
  }

  function onTitleChange(value) {
    update({ title: value })
    if (!slugTouched.current) update({ slug: slugify(value) })
  }

  function onSlugChange(value) {
    slugTouched.current = true
    update({ slug: value })
  }

  function toggleCat(cat) {
    setData((prev) => {
      const nextCats = prev.cats.includes(cat)
        ? prev.cats.filter((c) => c !== cat)
        : [...prev.cats, cat]
      // 카드 배지 자동 갱신
      let nextMain = prev.mainCat
      if (!nextCats.includes(nextMain)) nextMain = ''
      if (nextCats.length === 1) nextMain = nextCats[0]
      return { ...prev, cats: nextCats, mainCat: nextMain }
    })
  }

  function addTag(e) {
    if (e.key !== 'Enter' && e.key !== ',') return
    e.preventDefault()
    const val = tagInput.trim().replace(',', '')
    if (!val || data.tags.includes(val)) {
      setTagInput('')
      return
    }
    update({ tags: [...data.tags, val] })
    setTagInput('')
  }

  function removeTag(tag) {
    update({ tags: data.tags.filter((t) => t !== tag) })
  }

  function toggleFeatured(key) {
    update({
      featured: { ...data.featured, [key]: !data.featured[key] },
    })
  }

  function validate() {
    const errs = {}
    if (!data.title.trim()) errs.title = '제목을 입력해 주세요'
    if (!data.slug.trim()) errs.slug = 'Slug를 입력해 주세요'
    if (data.cats.length === 0) errs.cats = '노출 메뉴를 1개 이상 선택해 주세요'
    if (!data.mainCat) errs.mainCat = '카드 배지를 선택해 주세요'
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      showToast('필수 항목을 확인해 주세요', 'error')
      return false
    }
    return true
  }

  function showToast(msg, kind = 'error') {
    setToast({ msg, kind })
    setTimeout(() => setToast(null), 3000)
  }

  function saveDraft() {
    setDraftLabel('저장 중…')
    setTimeout(() => {
      setDraftLabel(isEdit ? `마지막 수정: 방금 전` : '임시저장됨')
      showToast('임시저장되었습니다', 'success')
    }, 600)
  }

  function publish() {
    if (!validate()) return
    showToast(isEdit ? '✓ 변경사항이 저장되었습니다' : '게시글이 발행되었습니다', 'success')
  }

  function unpublish() {
    if (!window.confirm('비공개로 전환하시겠어요?')) return
    update({ status: 'private' })
    showToast('게시글이 비공개로 전환되었습니다', 'success')
  }

  function removePost() {
    if (!window.confirm('이 게시글을 삭제하시겠어요?\n삭제된 게시글은 복구할 수 없습니다.')) return
    showToast('게시글이 삭제되었습니다', 'success')
    setTimeout(() => navigate('/admin/posts'), 600)
  }

  function cancel() {
    const hasContent = data.title.trim() || (data.content && data.content.replace(/<[^>]+>/g, '').trim())
    if (hasContent && !isEdit) {
      if (!window.confirm('작성 중인 내용이 있어요. 취소하시겠어요?')) return
    }
    navigate('/admin/posts')
  }

  function toggleAcc(key) {
    setAccOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const titleCount = data.title.length

  return (
    <>
      <Helmet>
        <title>{isEdit ? '게시글 수정' : '새 게시글'} — Martinee Admin</title>
      </Helmet>

      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={cancel}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 3L5 8l5 5" />
          </svg>
          목록
        </button>
        <div className={styles.topbarDivider} />
        <span className={styles.topbarTitle}>
          {isEdit ? '게시글 수정' : '새 게시글'}
        </span>
        <span className={styles.draftBadge}>{draftLabel}</span>
        <div className={styles.spacer} />
        <button className={`${styles.btn} ${styles.btnCancel}`} onClick={cancel}>
          취소
        </button>
        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={saveDraft}>
          임시저장
        </button>
        {isEdit && data.status === 'published' && (
          <button className={`${styles.btn} ${styles.btnGhost}`} onClick={unpublish}>
            비공개
          </button>
        )}
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={publish}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 10l4 4 8-8" />
          </svg>
          {isEdit ? '저장하기' : '발행하기'}
        </button>
      </div>

      <div className={styles.modeTabs}>
        <button
          className={`${styles.modeTab} ${!previewMode ? styles.modeTabActive : ''}`}
          onClick={() => setPreviewMode(false)}
        >
          ✏️ 편집
        </button>
        <button
          className={`${styles.modeTab} ${previewMode ? styles.modeTabActive : ''}`}
          onClick={() => setPreviewMode(true)}
        >
          👁 미리보기
        </button>
      </div>

      <div className={styles.editorWrap}>
        {!previewMode ? (
          <div className={styles.editorLayout}>
            <div className={styles.editorArea}>
              <div>
                <textarea
                  ref={titleRef}
                  className={styles.titleInput}
                  rows={2}
                  placeholder="제목을 입력하세요 (55자 이내)"
                  maxLength={55}
                  value={data.title}
                  onChange={(e) => onTitleChange(e.target.value)}
                />
                <div className={styles.titleMeta}>
                  <span className={styles.fieldHint}>공백 포함 55자 이내 권장</span>
                  <span
                    className={`${styles.titleCounter} ${titleCount > 50 ? styles.titleCounterWarn : ''}`}
                  >
                    {titleCount} / 55
                  </span>
                </div>
              </div>
              <div>
                <textarea
                  ref={subRef}
                  className={styles.subtitleInput}
                  rows={2}
                  placeholder="서브 제목 (게시글 상세 페이지 헤더에 표시)"
                  value={data.sub}
                  onChange={(e) => update({ sub: e.target.value })}
                />
              </div>
              <div className={styles.dividerLine} />
              <Editor
                value={data.content}
                onChange={(html) => update({ content: html })}
              />
            </div>

            <aside className={styles.metaPanel}>
              {isEdit && (
                <div className={styles.statusZone}>
                  <div className={styles.statusZoneTop}>
                    <span className={styles.statusZoneLabel}>현재 상태</span>
                    <span
                      className={`${styles.publishedTag} ${styles[STATUS_CLASS[data.status]] || ''}`}
                    >
                      <span className={styles.publishedDot} />
                      {STATUS_LABEL[data.status]}
                    </span>
                  </div>
                  <button className={styles.deleteBtn} onClick={removePost}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <polyline points="2,4 14,4" />
                      <path d="M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10" />
                    </svg>
                    게시글 삭제
                  </button>
                </div>
              )}

              <AccSection
                title="카테고리"
                open={accOpen.cat}
                onToggle={() => toggleAcc('cat')}
              >
                <div className={styles.field}>
                  <div className={styles.fieldLabel}>
                    노출 메뉴 <span className={styles.required}>*</span>
                  </div>
                  <div className={styles.fieldNote}>복수 선택 가능</div>
                  <div className={styles.catChecks}>
                    {CATEGORIES.map((c) => (
                      <label key={c} className={styles.catCheckRow}>
                        <input
                          type="checkbox"
                          checked={data.cats.includes(c)}
                          onChange={() => toggleCat(c)}
                        />
                        {c}
                      </label>
                    ))}
                  </div>
                  {errors.cats && <div className={styles.fieldError}>{errors.cats}</div>}
                </div>

                <div className={styles.field}>
                  <div className={styles.fieldLabel}>
                    카드 배지 <span className={styles.required}>*</span>
                  </div>
                  <div className={styles.fieldNote}>썸네일에 표시 (1개)</div>
                  <Select
                    value={data.mainCat}
                    onChange={(v) => update({ mainCat: v })}
                    options={data.cats.map((c) => ({ value: c, label: c }))}
                    placeholder={
                      data.cats.length === 0
                        ? '노출 메뉴 선택 시 자동 설정'
                        : '선택하세요'
                    }
                  />
                  {errors.mainCat && (
                    <div className={styles.fieldError}>{errors.mainCat}</div>
                  )}
                </div>
              </AccSection>

              <AccSection
                title="기본 정보"
                open={accOpen.basic}
                onToggle={() => toggleAcc('basic')}
              >
                <div className={styles.field}>
                  <div className={styles.fieldLabel}>
                    URL Slug <span className={styles.required}>*</span>
                  </div>
                  <div className={styles.slugRow}>
                    <span className={styles.slugPrefix}>/post/</span>
                    <input
                      className={styles.slugInput}
                      type="text"
                      value={data.slug}
                      onChange={(e) => onSlugChange(e.target.value)}
                      placeholder="url-slug"
                    />
                    {isEdit && (
                      <a
                        className={styles.slugOpenBtn}
                        href={data.slug ? `/post/${data.slug}` : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!data.slug}
                        title="새 탭에서 공개 페이지 열기"
                      >
                        <IconExternalLink />
                      </a>
                    )}
                  </div>
                  {!errors.slug && data.slug && (
                    <div className={styles.fieldHint} style={{ color: 'var(--success)' }}>
                      ✓ 사용 가능한 slug
                    </div>
                  )}
                  {!errors.slug && !data.slug && (
                    <div className={styles.fieldHint}>제목 입력 시 자동 생성됩니다</div>
                  )}
                  {errors.slug && <div className={styles.fieldError}>{errors.slug}</div>}
                </div>
                <div className={styles.field}>
                  <div className={styles.fieldLabel}>발행일</div>
                  <input
                    className={styles.fieldInput}
                    type="date"
                    value={data.pubDate}
                    onChange={(e) => update({ pubDate: e.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <div className={styles.fieldLabel}>유튜브 링크</div>
                  <input
                    className={styles.fieldInput}
                    type="text"
                    placeholder="https://youtube.com/..."
                    value={data.videoLink}
                    onChange={(e) => update({ videoLink: e.target.value })}
                  />
                  {data.videoLink && data.videoLink.includes('youtube') && (
                    <div className={styles.videoPreview}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="1" y="3" width="14" height="10" rx="2" />
                        <polygon points="6.5,6 6.5,10 10.5,8" fill="currentColor" stroke="none" />
                      </svg>
                      <span className={styles.videoPreviewUrl}>{data.videoLink}</span>
                      <button
                        className={styles.videoPreviewClose}
                        onClick={() => update({ videoLink: '' })}
                        type="button"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </AccSection>

              <AccSection
                title="썸네일"
                open={accOpen.thumb}
                onToggle={() => toggleAcc('thumb')}
              >
                <div className={styles.field}>
                  <button
                    type="button"
                    className={styles.thumbUpload}
                    onClick={() => window.alert('Supabase Storage 연결 시 활성화')}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--gray-4)' }}>
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                    <span style={{ fontSize: 13, color: 'var(--gray-4)' }}>클릭하여 이미지 업로드</span>
                    <span style={{ fontSize: 13, color: 'var(--gray-5)' }}>권장: 1440×810px</span>
                  </button>
                  <div className={styles.fieldHint}>피그마 디자인 가이드에 따라 제작해 주세요</div>
                </div>
              </AccSection>

              <AccSection
                title="태그"
                open={accOpen.tags}
                onToggle={() => toggleAcc('tags')}
              >
                <div className={styles.field}>
                  <div className={styles.tagsWrap} onClick={(e) => {
                    const input = e.currentTarget.querySelector('input')
                    input?.focus()
                  }}>
                    {data.tags.map((t) => (
                      <span key={t} className={styles.tagChip}>
                        {t}
                        <button
                          type="button"
                          className={styles.tagChipX}
                          onClick={() => removeTag(t)}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    <input
                      className={styles.tagInputInline}
                      type="text"
                      placeholder="태그 입력 후 Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={addTag}
                    />
                  </div>
                  <div className={styles.fieldHint}>Enter 또는 쉼표(,)로 추가</div>
                </div>
              </AccSection>

              <AccSection
                title="노출 설정"
                open={accOpen.featured}
                onToggle={() => toggleAcc('featured')}
              >
                <div className={styles.toggleRows}>
                  {FEATURED_TOGGLES.map((t) => (
                    <div key={t.key} className={styles.toggleRow}>
                      <div>
                        <div className={styles.toggleLabel}>{t.label}</div>
                        <div className={styles.toggleSublabel}>{t.sub}</div>
                      </div>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={data.featured[t.key]}
                          onChange={() => toggleFeatured(t.key)}
                        />
                        <span className={styles.toggleSlider} />
                      </label>
                    </div>
                  ))}
                </div>
              </AccSection>

              <AccSection
                title="작성자"
                open={accOpen.author}
                onToggle={() => toggleAcc('author')}
              >
                <button
                  type="button"
                  className={styles.authorBox}
                  onClick={() => window.alert('작성자 선택 (다음 단계에서 구현)')}
                >
                  <div className={styles.authorAvatar}>{CURRENT_USER.avatarLetter}</div>
                  <div>
                    <div className={styles.authorName}>{CURRENT_USER.name}</div>
                    <div className={styles.authorRole}>Design Lead</div>
                  </div>
                  <span className={styles.authorChange}>변경</span>
                </button>
              </AccSection>

              <AccSection
                title="하단 CTA 배너"
                open={accOpen.cta}
                onToggle={() => toggleAcc('cta')}
              >
                <div className={styles.ctaMini}>
                  <button
                    type="button"
                    className={styles.ctaImgUpload}
                    onClick={() => window.alert('CTA 이미지 업로드 (Phase 03 후)')}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8 2v9M4 7l4-5 4 5M2 13h12" />
                    </svg>
                    CTA 이미지 업로드
                  </button>
                  <input className={styles.fieldInput} type="text" placeholder="CTA 제목" />
                  <input className={styles.fieldInput} type="text" placeholder="CTA 설명" />
                  <div className={styles.ctaRow}>
                    <input className={styles.fieldInput} type="text" placeholder="버튼1 텍스트" />
                    <input className={styles.fieldInput} type="text" placeholder="버튼1 URL" />
                  </div>
                  <div className={styles.ctaRow}>
                    <input className={styles.fieldInput} type="text" placeholder="버튼2 텍스트" />
                    <input className={styles.fieldInput} type="text" placeholder="버튼2 URL" />
                  </div>
                </div>
              </AccSection>
            </aside>
          </div>
        ) : (
          <div className={styles.previewPane}>
            <div className={styles.previewInner}>
              <div className={styles.previewCat}>{data.mainCat || '카테고리'}</div>
              <div className={styles.previewTitle}>{data.title || '제목이 여기에 표시됩니다'}</div>
              {data.sub && <div className={styles.previewSub}>{data.sub}</div>}
              <div className={styles.previewMeta}>{data.pubDate || ''}</div>
              {data.content && data.content !== '<p></p>' ? (
                <div
                  className={styles.richPreview}
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              ) : (
                <div className={styles.previewEmpty}>
                  본문을 입력하면 미리보기가 표시됩니다
                </div>
              )}
              <div className={styles.previewAuthor}>
                <div className={styles.pAuthorImg}>{CURRENT_USER.avatarLetter}</div>
                <div>
                  <div className={styles.pAuthorName}>{CURRENT_USER.name}</div>
                  <div className={styles.pAuthorRole}>Design Lead · Martinee</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div
          className={`${styles.toast} ${toast.kind === 'success' ? styles.toastSuccess : ''}`}
        >
          {toast.msg}
        </div>
      )}
    </>
  )
}

function AccSection({ title, open, onToggle, children }) {
  return (
    <div className={`${styles.accSection} ${open ? styles.accSectionOpen : ''}`}>
      <button
        type="button"
        className={styles.accHeader}
        onClick={onToggle}
      >
        <div className={styles.accTitle}>{title}</div>
        <span className={styles.accArrow}>▾</span>
      </button>
      {open && <div className={styles.accBody}>{children}</div>}
    </div>
  )
}
