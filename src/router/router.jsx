import { createBrowserRouter } from "react-router";
import BasicLayout from "../layout/BasicLayout";
import Home from "../pages/Home/Home";
import Trips from "../pages/Trips/Trips";
import Community from "../pages/Community/Community";
import About from "../pages/About/About";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthLayout from "../layout/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: BasicLayout,
    children: [
      { index: true,
       Component: Home 
      },
      {path: 'trips', 
       Component: Trips
      },
      {
        path:'community',
        Component: Community 
      },
      {
        path: 'about',
        Component: About
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login',
      Component: Login
      },
      { path: 'register', 
       Component: Register
      },
    ],
  },
]);