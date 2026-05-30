import { useEffect, useRef, useState } from 'react'
import styles from './Select.module.css'

/**
 * 네이티브 <select>를 대체하는 커스텀 드롭다운.
 * options: [{ value, label }]
 * value: 현재 선택값
 * onChange(value)
 * placeholder: value가 옵션에 없을 때 표시할 문구
 * triggerClassName: 트리거 외부 width 등 추가 클래스
 */
export default function Select({
  value,
  onChange,
  options,
  placeholder = '선택',
  triggerClassName = '',
  width,
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const selected = options.find((o) => o.value === value)
  const labelEl = selected ? (
    <span className={styles.label}>{selected.label}</span>
  ) : (
    <span className={`${styles.label} ${styles.placeholder}`}>{placeholder}</span>
  )

  function select(v) {
    onChange(v)
    setOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={width ? { width } : undefined}
    >
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''} ${triggerClassName}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {labelEl}
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path d="M0 0l5 6 5-6z" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div className={styles.menu} role="listbox">
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                onClick={() => select(opt.value)}
                role="option"
                aria-selected={isSelected}
              >
                {opt.label}
                {isSelected && (
                  <svg
                    className={styles.check}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2.5 7 6 10.5 11.5 4" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
