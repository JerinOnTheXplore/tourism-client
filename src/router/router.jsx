import { createBrowserRouter } from "react-router";
import BasicLayout from "../layout/BasicLayout";
import Home from "../pages/Home/Home";
import Trips from "../pages/Trips/Trips";
import Community from "../pages/Community/Community";
import About from "../pages/About/About";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthLayout from "../layout/AuthLayout";
import PackageDetails from "../pages/Details/PackageDetails";
import TourGuideProfile from "../pages/Details/TourGuideProfile";
import AllStories from "../pages/Home/AllStories";
import DashboardLayout from "../layout/DashboardLayout";
import ManageProfile from "../pages/Dashboard/ManageProfile";
import AssignedTours from "../pages/Dashboard/TourGuide/AssignedTours";
import AddStory from "../pages/Dashboard/Tourist/AddStory";
import ManageStories from "../pages/Dashboard/Tourist/ManageStories";
import UpdateStory from "../pages/Dashboard/TourGuide/UpdateStory";
import JoinAsTourGuide from "../pages/Dashboard/Tourist/JoinAsTourGuide";
import MyBookings from "../pages/Dashboard/Tourist/MyBookings";
import PaymentPage from "../pages/Dashboard/Tourist/PaymentPage";


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
      {
        path: 'packages/:id',
        Component: PackageDetails,
      },
      {
        path: 'guides/:id',
        Component: TourGuideProfile,
      },
      {
        path:"/stories",
        element: <AllStories></AllStories>
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
  {
    path:"/dashboard",
    element:<DashboardLayout>
    </DashboardLayout>,
    children:[
      {
        path:"profile",
        element:<ManageProfile></ManageProfile>
      },
      {
        path: "assigned-tours",
        element: <AssignedTours></AssignedTours>
      },
      {
        path: "add-story",
        element: <AddStory></AddStory>
      },
      {
        path: "manage-stories",
        element:<ManageStories></ManageStories>
      },
      {
        path: "update-story/:id",
        element:<UpdateStory></UpdateStory>
      },
      {
        path:"join-guide",
        element:<JoinAsTourGuide></JoinAsTourGuide>
      },
      {
        path:"my-bookings",
        element:<MyBookings></MyBookings>
      },
      {
        path: "payment/:bookingId",
        element:<PaymentPage></PaymentPage>
      }
    ]
  }
]);