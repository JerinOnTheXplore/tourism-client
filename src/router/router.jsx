import { createBrowserRouter } from "react-router";
import BasicLayout from "../layout/BasicLayout";
import Home from "../pages/Home/Home";
import Trips from "../pages/Trips/Trips";
import Community from "../pages/Community/Community";
import About from "../pages/About/About";

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
]);