import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './component/Root/Root.jsx';
import Login from './component/Login/Login.jsx';
import Home from './component/Home/Home.jsx';
import Heroregister from './component/HeroRegister/Heroregister.jsx';
import SingIn from './component/SingIn/SingIn.jsx';
import SingUp from './component/SingUp/SingUp.jsx';
import Singin2 from './component/Singin2/Singin2.jsx';
import Singup2 from './component/singup2/singup2.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/heroregister',
        element: <Heroregister></Heroregister>
      },
      {
        path: '/singin',
        element: <SingIn></SingIn>
      },
      {
        path: '/singup',
        element: <SingUp></SingUp>
      },
      {
        path: '/signin2',
        element: <Singin2></Singin2>
      },
      {
        path: '/signup2',
        element: <Singup2></Singup2>
      }

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
