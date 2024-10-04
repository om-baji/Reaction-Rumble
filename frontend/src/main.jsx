import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Face from './pages/Face'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([{
  path : "/login",
  element : <Login />
}, {
  path : "/",
  element : <App />
}, {
  path : "/face",
  element : <Face />
}, {
  path : "/register",
  element : <Signup />
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
