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
import AddPackage from "../pages/Dashboard/Admin/AddPackage";
import ManageCandidates from "../pages/Dashboard/Admin/ManageCandidates";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import OfferAnnouncements from "../pages/OfferAnnouncement/OfferAnnouncements";
import QuizLanding from "../pages/QuizLanding/QuizLanding";
import PrivateRoute from "../routes/PrivateRoute";


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
        element:<PrivateRoute>
          <PackageDetails></PackageDetails>
        </PrivateRoute>
      },
      {
        path: 'guides/:id',
        element:<PrivateRoute>
          <TourGuideProfile></TourGuideProfile>
        </PrivateRoute>
      },
      {
        path:"stories",
        element: <AllStories></AllStories>
      },
      {
        path:"offers",
        element: <OfferAnnouncements></OfferAnnouncements>
      },
      {
        path:"quiz",
        element:<QuizLanding></QuizLanding>
      }
      
      

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
    element:<PrivateRoute>
      <DashboardLayout>
    </DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        path:"profile",
        element:<PrivateRoute>
          <ManageProfile></ManageProfile>
        </PrivateRoute>
      },
      {
        path: "assigned-tours",
        element: <PrivateRoute>
          <AssignedTours></AssignedTours>
        </PrivateRoute>
      },
      {
        path: "add-story",
        element: <PrivateRoute>
          <AddStory></AddStory>
        </PrivateRoute>
      },
      {
        path: "manage-stories",
        element:<PrivateRoute>
          <ManageStories></ManageStories>
        </PrivateRoute>
      },
      {
        path: "update-story/:id",
        element:<PrivateRoute>
          <UpdateStory></UpdateStory>
        </PrivateRoute>
      },
      {
        path:"join-guide",
        element:<PrivateRoute>
          <JoinAsTourGuide></JoinAsTourGuide>
        </PrivateRoute>
      },
      {
        path:"my-bookings",
        element:<PrivateRoute>
          <MyBookings></MyBookings>
        </PrivateRoute>
      },
      {
        path: "payment/:bookingId",
        element:<PrivateRoute>
          <PaymentPage></PaymentPage>
        </PrivateRoute>
      },
      {
        path:"add-package",
        element: <PrivateRoute>
          <AddPackage></AddPackage>
        </PrivateRoute>
      },
      {
        path: "manage-candidates",
        element: <PrivateRoute>
          <ManageCandidates></ManageCandidates>
        </PrivateRoute>
      },
      {
        path: "manage-users",
        element: <PrivateRoute>
          <ManageUsers></ManageUsers>
        </PrivateRoute>
      },
      
    ]
  }
]);