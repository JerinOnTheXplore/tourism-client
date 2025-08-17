
import { Link, Outlet, useNavigate } from "react-router";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import logo from "../assets/logoImg.jpg";
import {
  FaUser,
  FaSuitcase,
  FaPlus,
  FaClipboardList,
  FaUserShield,
  FaBars,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Loading from "../pages/loading/Loading";
import Navbar from "../components/Navbar/Navbar";
import { useTheme } from "../context/ThemeProvider";
import { FileBarChart2 } from "lucide-react";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { role, loading } = useRole();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (loading)
    return (
      <div className="text-center py-32 font-bold text-blue-800">
        <Loading/>
      </div>
    );

  const menuItems = (
    <>
      {/* Shared for all logged in users */}
      <li>
        <Link to="/dashboard/profile" className="menu-link ">
          <FaUser /> Manage Profile
        </Link>
        <Link to="/dashboard/overview" className="menu-link">
          <FileBarChart2 /> Dashboard Overview
        </Link>
      </li>

      {/* Tourist */}
      {user && role === "tourist" && (
        <>
          <li>
            <Link to="/dashboard/my-bookings" className="menu-link">
              <FaSuitcase /> My Bookings
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-story" className="menu-link">
              <FaPlus /> Add Story
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-stories" className="menu-link">
              <FaClipboardList /> Manage Stories
            </Link>
          </li>
          <li>
            <Link to="/dashboard/join-guide" className="menu-link">
              <FaUserShield /> Join as Tour Guide
            </Link>
          </li>
        </>
      )}

      {/* Tour Guide */}
      {role === "tourGuide" && (
        <>
          <li>
            <Link to="/dashboard/assigned-tours" className="menu-link">
              <FaSuitcase /> My Assigned Tours
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-story" className="menu-link">
              <FaPlus /> Add Story
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-stories" className="menu-link">
              <FaClipboardList /> Manage Stories
            </Link>
          </li>
        </>
      )}

      {/* Admin */}
      {role === "admin" && (
        <>
          <li>
            <Link to="/dashboard/add-package" className="menu-link">
              <FaPlus /> Add Package
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-users" className="menu-link">
              <FaClipboardList /> Manage Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-candidates" className="menu-link">
              <FaClipboardList /> Manage Candidates
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="flex min-h-screen bg-base-300">
      {/* Sidebar */}
      <aside
        className={`w-4/9 md:w-64 lg:block bg-[#2a75b3]/60 dark:bg-[#1a4f73]/60 p-6 transition-all ${
          drawerOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex gap-2 mt-10">
          <img className="w-10" src={logo} alt="" />
          <h1 className="text-lg md:text-xl font-semibold ">TOURISM FLOW</h1>
        </div>
        <div className="text-xl md:text-2xl font-bold mb-10 flex items-center gap-2 mt-5">
          <MdDashboard className=" text-3xl" />
          <span className="tracking-widest">Dashboard</span>
        </div>
          <Link to="/"
              className="  font-medium   transition"
            >
              ← Go Home
            </Link>
        <ul className="space-y-5">{menuItems}</ul>
        <div className="mt-5">
            <button
          onClick={toggleTheme}
          className="p-2 rounded-full  transition"
          aria-label="Toggle theme"
        >
          {darkMode ? <FaSun className="text-yellow-300" size={24} /> : <FaMoon className="text-yellow-300" size={24} />}
        </button>
          </div>

        {/* Footer */}
        <div className="mt-36   backdrop-blur-md rounded-xl p-4 text-center  shadow-inner border-t border-white/30">
  <div className="flex flex-col items-center gap-2">
    <img
      src={user?.photoURL || logo}
      alt="User"
      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
    />
    <div className="text-sm leading-tight">
      <p className="font-semibold">{user?.displayName || "Tourist User"}</p>
      <p className="">{user?.email}</p>
    </div>
  </div>
</div>
      </aside>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-5 left-5 z-50 bg-[#2a75b3] text-white p-2 rounded-full shadow-lg"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <main className="w-5/9 md:w-full flex-1 px-10 py-10">
      
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
