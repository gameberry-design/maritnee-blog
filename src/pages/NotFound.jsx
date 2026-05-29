import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 — Martinee Blog</title>
      </Helmet>
      <main className={styles.main}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>페이지를 찾을 수 없습니다</h1>
        <Link to="/" className={styles.link}>홈으로 이동</Link>
      </main>
    </>
  )
}
