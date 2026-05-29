import { useParams, Navigate } from 'react-router-dom'
import PostFormPage from './PostFormPage.jsx'
import { POSTS } from '../../lib/mockData.js'

// mock 데이터를 PostFormPage가 기대하는 형태로 변환.
function adapt(post) {
  return {
    title: post.title,
    sub: post.sub,
    content: `<h2>${post.title}</h2><p>이 부분은 mock 데이터입니다. 실 게시글 본문은 Phase 03(Supabase 연동) 후 DB에서 불러옵니다.</p>`,
    slug: `post-${post.id}`,
    pubDate: post.date,
    videoLink: '',
    cats: [post.cat],
    mainCat: post.cat,
    tags: [],
    featured: {
      home: post.featured,
      growth: post.cat === 'Growth',
      crm: post.cat === 'CRM',
      event: post.cat === '이벤트',
    },
    status: post.status,
    modified: post.modified,
  }
}

export default function Edit() {
  const { id } = useParams()
  const post = POSTS.find((p) => String(p.id) === id)

  if (!post) return <Navigate to="/admin/posts" replace />

  return <PostFormPage mode="edit" initial={adapt(post)} />
}
