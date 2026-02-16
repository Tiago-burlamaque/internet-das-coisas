import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './index.css'

import Login from './pages/Login/Login';
import Register from './pages/Register/Register'
import { AuthProvider } from './context/AuthContext'; // <-- import aqui

import PrivateRoute from './components/PrivateRoute/PrivateRoute';  // <-- import
import Main from './layout/Main/Main';
import Home from './pages/Home/Home';
import RegisterCar from './pages/RegisterCar/RegisterCar';
import QueryCar from './pages/QueryCar/QueryCar';
import UpdateCar from './pages/QueryCar/UpdateCar';
import Historico from './pages/Histórico/Historico';
import { AuthProviderUser } from './context/AuthContextUser';

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/cadastro", element: <Register /> },

  {
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      { path: "/home", element: <Home /> },
      { path: "/registroVeiculo", element: <RegisterCar /> },
      { path: "/consultarVeiculo", element: <QueryCar /> },
      { path: "/atualizarVeiculo/:id", element: <UpdateCar /> },
      { path: "/log", element: <Historico /> }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AuthProviderUser>
        <ToastContainer />
        <RouterProvider router={router} />
      </AuthProviderUser>
    </AuthProvider>
  </StrictMode>,
)