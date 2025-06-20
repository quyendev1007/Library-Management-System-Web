import HomePage from '~/pages/HomePage'
import { Navigate, Outlet, Route, Routes } from 'react-router'
import Login from '~/pages/Login'
import Signup from '~/pages/Signup'
import ClientLayout from '~/layouts/ClientLayout'
import DetailBook from '~/pages/DetailBook'
import BorrowBook from '~/pages/BorrowBook'
import NotFound from '~/pages/NotFound'
import HistoryBorrowBook from './pages/HistoryBorrowBook'

// Admin
import AdminLayout from './layouts/AdminLayout'
import BorrowBookManager from './adminPages/borrows/BorrowBookManager'
import UserManager from './adminPages/users/UserManager'
import BookManager from './adminPages/books/BookManager'
import PublisherManager from './adminPages/publishers/PublisherManager'
import AuthorManager from './adminPages/authors/AuthorManager'
import CategoryManager from './adminPages/categories/CategoryManager'
import UserProfile from './pages/UserProfile'
import AccessDenied from './pages/AccessDenied'
import BookCart from './pages/BookCart'

const RequireRole = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return <Navigate to="/login" replace />
  }

  console.log(user)

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />
  }

  return <Outlet />
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<HomePage />} />
          <Route path="/books/details/:id" element={<DetailBook />} />
          <Route element={<RequireRole allowedRoles={['client']} />}>
            <Route path="/books/borrow/:id" element={<BorrowBook />} />
            <Route path="/books/history" element={<HistoryBorrowBook />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/carts" element={<BookCart />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<RequireRole allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<BorrowBookManager />} />
            <Route path="history" element={<BorrowBookManager />} />
            <Route path="users" element={<UserManager />} />
            <Route path="books" element={<BookManager />} />
            <Route path="authors" element={<AuthorManager />} />
            <Route path="publishers" element={<PublisherManager />} />
            <Route path="categories" element={<CategoryManager />} />
          </Route>
        </Route>

        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
