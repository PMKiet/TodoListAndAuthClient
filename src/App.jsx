import Auth from './components/auth'
import './index.css'
import { createBrowserRouter } from "react-router-dom"
import Login from './pages/auth/LoginScreen'
import Register from './pages/auth/Register'
import Home from './pages/Home/Home.jsx'
import EditTodo from './components/EditTodo.jsx'

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      }
    ]
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'todo/update/:id',
        element: <EditTodo />
      }
    ]
  }
])

export default router
