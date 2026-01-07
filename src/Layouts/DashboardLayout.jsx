import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router';
import {
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiMenu,
  FiBell,
  FiHome,
} from 'react-icons/fi';
import logo from '../assets/assetsImage/navLogo-black.svg';
import useAuth from '../Hooks/useAuth';
import { MdAddTask } from 'react-icons/md';
import toast from 'react-hot-toast';
import { FaTasks } from 'react-icons/fa';

const DashboardLayout = () => {
  const { user, singOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    singOutUser()
      .then(result => {
        console.log(result);
        toast.success('User Signed Out Successfully');
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const Menu = () => (
    <nav className="flex flex-col px-4 py-6 space-y-1 text-[#03373d]">
      <span className="text-xs font-bold text-gray-600 px-3">MENU</span>

      <>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
              isActive ? 'bg-gray-100 text-[#03373d]' : 'text-gray-600'
            }`
          }
        >
          <FiHome /> Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/add-lesson"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
              isActive ? 'bg-[#caeb66] text-[#03373d]' : 'text-gray-600'
            }`
          }
        >
          <MdAddTask /> Add lesson
        </NavLink>

        <NavLink
          to="/dashboard/my-lessons"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
              isActive ? 'bg-[#caeb66] text-[#03373d]' : 'text-gray-600'
            }`
          }
        >
          <FaTasks /> My lessons
        </NavLink>
      </>

      <span className="text-xs font-bold text-gray-400 px-3 mt-6">GENERAL</span>

      <NavLink
        // to="/dashboard/settings"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
            isActive ? ' text-[#03373d]' : 'text-gray-600'
          }`
        }
      >
        <FiSettings /> Settings
      </NavLink>

      <NavLink
        // to="/dashboard/help"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg font-medium ${
            isActive ? ' text-[#03373d]' : 'text-gray-600'
          }`
        }
      >
        <FiHelpCircle /> Help
      </NavLink>

      <NavLink
        onClick={handleSignOut}
        className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-red-500"
      >
        <FiLogOut /> Logout
      </NavLink>
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/*DESKTOP */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r shadow-sm">
        <Link to="/" className="p-6">
          <img src={logo} alt="ZapShift" className="h-12 object-contain" />
        </Link>

        <Menu />
      </aside>

      {/*NAV */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-4 py-3">
        <label htmlFor="mobile-drawer" className="cursor-pointer">
          <FiMenu size={22} />
        </label>

        <Link>
          <img src={logo} className="h-9" />
        </Link>
        <FiBell size={22} />
      </div>

      <input type="checkbox" id="mobile-drawer" className="peer hidden" />

      {/* ============ MOBILE ====== */}
      <div className="fixed inset-0 z-40 transition-all duration-300 peer-checked:translate-x-0 -translate-x-full bg-black/40 lg:hidden">
        <label htmlFor="mobile-drawer" className="absolute inset-0"></label>

        <aside className="w-64 bg-white h-full shadow-xl p-4 absolute left-0 top-0">
          <Link>
            <img src={logo} className="h-12 mx-auto mb-6" />
          </Link>
          <Menu />
        </aside>
      </div>

      {/* ============ CONTENT  ============ */}
      <main className="flex-1 lg:ml-0 mt-16 lg:mt-0">
        {/*  nav */}
        <header className="hidden lg:flex justify-between items-center bg-white px-6 h-16 shadow-sm">
          <div></div>

          <div className="flex items-center gap-6">
            <FiBell size={20} className="text-gray-600 cursor-pointer" />
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL}
                alt="Avatar"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="font-semibold">{user?.displayName}</p>
                <p className="text-gray-400 text-sm font-bold">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
