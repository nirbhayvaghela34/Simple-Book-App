import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import AddBook from './pages/AddBook.jsx'
import AboutUs from './pages/AboutUs.jsx'
import BookUpdate from './pages/BookUpdate.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/add-book',
        element: <AddBook />
      },
      {
        path: 'about-us',
        element: <AboutUs />
      },
      {
        path:'/books/:id',
        element: <BookUpdate />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
