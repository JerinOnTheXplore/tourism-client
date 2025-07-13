
import { Link, Outlet } from "react-router";
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
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, loading } = useRole();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (loading)
    return (
      <div className="text-center py-32 font-bold text-blue-800">
        Loading Dashboard...
      </div>
    );

  const menuItems = (
    <>
      {/* Shared for all logged in users */}
      <li>
        <Link to="/dashboard/profile" className="menu-link">
          <FaUser /> Manage Profile
        </Link>
      </li>

      {/* Tourist */}
      {role === "tourist" && (
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
            <Link to="/dashboard/admin/assigned-tours" className="menu-link">
              <FaSuitcase /> All Assigned Tours
            </Link>
          </li>
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
    <div className="flex min-h-screen bg-gradient-to-br from-[#e0f4ff] via-white to-[#d3edfa]">
      {/* Sidebar */}
      <aside
        className={`w-64 lg:block bg-gradient-to-br from-[#63aedc] via-[#4194cc] to-[#2a75b3] text-white p-6 transition-all ${
          drawerOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex gap-2 mt-10">
          <img className="w-10" src={logo} alt="" />
          <h1 className="text-xl font-semibold ">TOURISM FLOW</h1>
        </div>
        <div className="text-2xl font-bold mb-10 flex items-center gap-2 mt-5">
          <MdDashboard className="text-white text-3xl" />
          <span className="tracking-widest">Dashboard</span>
        </div>

        <ul className="space-y-4">{menuItems}</ul>

        {/* Footer */}
        <div className="mt-10 text-sm text-white/70 border-t pt-4">
          Logged in as: <br />
          <span className="text-white font-medium">{user?.email}</span>
        </div>

        <button
          onClick={logOut}
          className="mt-6 flex items-center gap-2 bg-white text-[#2a75b3] px-4 py-2 rounded-full shadow hover:bg-blue-100 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-5 left-5 z-50 bg-[#2a75b3] text-white p-2 rounded-full shadow-lg"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <main className="w-1/2 flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
