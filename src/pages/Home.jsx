import { Helmet } from 'react-helmet-async'
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Martinee Blog</title>
        <meta name="description" content="마티니 블로그 — 마케팅 인사이트와 솔루션" />
      </Helmet>
      <main className={styles.main}>
        <h1 className={styles.title}>Martinee Blog</h1>
        <p className={styles.sub}>React + Vite 프로젝트가 정상적으로 부팅되었습니다.</p>
      </main>
    </>
  )
}
