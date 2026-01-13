import React from 'react';
import { Link, NavLink } from 'react-router';
import NavLogo from '../../assets/assetsImage/navLogo-black.svg';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import useIsPremium from '../../Hooks/useisPremium';

const Navbar = () => {
  const { user, singOutUser } = useAuth();
  const { isPremium, roleLoading } = useIsPremium();

  const handleSignOut = () => {
    singOutUser()
      .then(result => {
        console.log(result);
        toast.success('User Signed Out Successfully');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-semibold ${
              isActive ? 'text-[#33929d]' : 'text-black font-extrabold'
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/publicLessons"
          className={({ isActive }) =>
            `font-semibold ${
              isActive ? 'text-[#33929d]' : 'text-black font-extrabold'
            }`
          }
        >
          Public Lessons
        </NavLink>
      </li>
      {isPremium === false && (
        <li>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `font-semibold ${
                isActive ? 'text-[#33929d]' : 'text-black font-extrabold'
              }`
            }
          >
            Pricing
          </NavLink>
        </li>
      )}

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard/add-lesson"
              className={({ isActive }) =>
                `font-semibold ${
                  isActive ? 'text-[#33929d]' : 'text-black font-extrabold'
                }`
              }
            >
              Add Lesson
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-lessons"
              className={({ isActive }) =>
                `font-semibold ${
                  isActive ? 'text-[#33929d]' : 'text-black font-extrabold'
                }`
              }
            >
              My Lesson
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            `font-semibold ${
              isActive ? 'text-[#33929d]' : 'text-black font-extrabold'
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `font-semibold ${
              isActive ? 'text-[#33929d]' : 'text-black font-extrabold'
            }`
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `font-semibold ${
              isActive ? 'text-[#33929d]' : 'text-black font-extrabold'
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="pt-2.5  md:pt-5">
      <div className="navbar px-2 md:px-12 bg-base-100 rounded-lg shadow-sm ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm font-extrabold dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link>
            <img className="h-12" src={NavLogo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-extrabold px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-4">
            {/* Sign In button */}
            <div className="relative flex flex-col items-center mr-3.5 group">
              {user ? (
                <>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                      <img
                        className="h-10 w-10 rounded-full border-2 border-[#b6db3c] group-hover:scale-105 transition-transform duration-200"
                        src={user?.photoURL}
                        alt="Profile Picture"
                      />
                    </div>
                    <ul
                      tabIndex="-1"
                      className="dropdown-content gap-y-1.5 border-2 border-[#b6db3c] menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm"
                    >
                      <li className="text-black text-center text-lg font-semibold">
                        <span>
                          {user?.displayName}{' '}
                          {!roleLoading && isPremium && (
                            <span className="text-[12px] text-yellow-600">
                              Premium Member
                            </span>
                          )}
                          {isPremium === false && (
                            <span className="text-[12px] text-gray-400">
                              Free Member
                            </span>
                          )}
                        </span>
                      </li>
                      <li className="text-black text-center font-semibold mb-2">
                        {user?.email}
                      </li>

                      <li>
                        <Link
                          to="/dashboard"
                          className="px-5 py-2 rounded-lg border border-[#C8E661] text-black font-semibold hover:bg-[#C8E661] hover:text-black transition"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/profile"
                          className="px-5 py-2 rounded-lg border border-[#C8E661] text-black font-semibold hover:bg-[#C8E661] hover:text-black transition"
                        >
                          My Profile
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={handleSignOut}
                          className="btn px-5 py-2 rounded-lg border border-[#C8E661] text-black font-semibold hover:bg-[#C8E661] hover:text-black transition"
                        >
                          <IoIosLogOut />{' '}
                          <span className="max-sm:hidden">Sign Out</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  to="/auth/login"
                  className="btn px-5 py-2 rounded-lg border border-[#C8E661] text-black font-semibold hover:bg-[#C8E661] hover:text-black transition "
                >
                  <IoIosLogIn /> <span className="max-sm:hidden">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
