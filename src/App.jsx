import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Posts from './pages/admin/Posts.jsx'
import Authors from './pages/admin/Authors.jsx'
import Write from './pages/admin/Write.jsx'
import Edit from './pages/admin/Edit.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/write" element={<Write />} />
        <Route path="posts/edit/:id" element={<Edit />} />
        <Route path="authors" element={<Authors />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
