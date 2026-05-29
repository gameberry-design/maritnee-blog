import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { useEffect } from 'react'
import styles from './Editor.module.css'

export default function Editor({ value = '', onChange, placeholder = '본문을 입력하세요' }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // HorizontalRule은 StarterKit에 포함됨 — 별도 import 불필요.
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value,
    editorProps: {
      attributes: {
        'data-placeholder': placeholder,
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })

  // 외부에서 value가 바뀌면 (예: Edit 페이지 prefill) 반영.
  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor])

  if (!editor) return <div className={styles.body} />

  const run = (fn) => () => fn(editor.chain().focus()).run()

  const isActive = (name, attrs) => editor.isActive(name, attrs)

  const insertLink = () => {
    const url = window.prompt('링크 URL:')
    if (!url) return
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const insertImage = () => {
    // TODO Phase 03: Supabase Storage 업로드 연동. 지금은 URL 직접 입력.
    const url = window.prompt('이미지 URL:')
    if (!url) return
    editor.chain().focus().setImage({ src: url }).run()
  }

  return (
    <>
      <div className={styles.toolbar}>
        <span className={styles.label}>서식</span>
        <button
          type="button"
          className={`${styles.btn} ${isActive('bold') ? styles.active : ''}`}
          onClick={run((c) => c.toggleBold())}
          title="굵게"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={`${styles.btn} ${isActive('italic') ? styles.active : ''}`}
          onClick={run((c) => c.toggleItalic())}
          title="기울임"
        >
          <i>I</i>
        </button>

        <div className={styles.sep} />
        <span className={styles.label}>제목</span>
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            type="button"
            className={`${styles.btn} ${isActive('heading', { level }) ? styles.active : ''}`}
            onClick={run((c) => c.toggleHeading({ level }))}
            style={{ fontSize: 11 }}
            title={`H${level}`}
          >
            H{level}
          </button>
        ))}

        <div className={styles.sep} />
        <button
          type="button"
          className={`${styles.btn} ${isActive('blockquote') ? styles.active : ''}`}
          onClick={run((c) => c.toggleBlockquote())}
          title="인용"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 3v10M3 8h4M7 3v10" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.btn} ${isActive('bulletList') ? styles.active : ''}`}
          onClick={run((c) => c.toggleBulletList())}
          title="목록"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="3" cy="4" r="1" fill="currentColor" />
            <circle cx="3" cy="8" r="1" fill="currentColor" />
            <circle cx="3" cy="12" r="1" fill="currentColor" />
            <line x1="6" y1="4" x2="14" y2="4" />
            <line x1="6" y1="8" x2="14" y2="8" />
            <line x1="6" y1="12" x2="14" y2="12" />
          </svg>
        </button>

        <div className={styles.sep} />
        <button type="button" className={styles.btn} onClick={insertLink} title="링크">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 10a4 4 0 005.66 0l1-1a4 4 0 00-5.66-5.66L6 4M10 6a4 4 0 00-5.66 0l-1 1a4 4 0 005.66 5.66L10 12" />
          </svg>
        </button>
        <button type="button" className={styles.btn} onClick={insertImage} title="이미지">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="1" y="2" width="14" height="12" rx="2" />
            <circle cx="5.5" cy="6" r="1.5" />
            <path d="M1 11l4-3 3 3 2-2 4 3" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={run((c) => c.setHorizontalRule())}
          title="구분선"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
        </button>
      </div>

      <div className={styles.body}>
        <EditorContent editor={editor} />
      </div>
    </>
  )
}
