import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from 'react-toastify';
import Produtos from './components/Produtos/Produtos.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/produto",
    element: <Produtos />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>,
)
