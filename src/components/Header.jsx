import { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from "../providers/AuthProvider";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        const theme = darkMode ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('theme', theme);
    }, [darkMode]);

    const handleSignOut = () => {
        logOut().then().catch();
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const activeLinkStyle = ({ isActive }) =>
        isActive ? "rounded-none border-t-2 border-[#6CBF40] text-[#6CBF40] font-bold" : "";

    const navLinks = (
        <>
            <li><NavLink to='/' className={activeLinkStyle}>Home</NavLink></li>
            <li><NavLink to='/alltouristspot' className={activeLinkStyle}>All Tourists Spot</NavLink></li>
            {user && <li><NavLink to='/addtouristspot' className={activeLinkStyle}> Add Tourists Spot</NavLink></li>}
            {user && <li><NavLink to='/mylist' className={activeLinkStyle}>My List</NavLink></li>}
        </>
    );

    return (
        <div className="sticky top-0 bg-white dark:bg-gray-800 text-black dark:text-white z-10">
            <div className="navbar bg-transparent rounded-md flex flex-col md:flex-row md:justify-center lg:flex-row">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white text-black mt-3 z-[1] p-2 shadow rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className='flex '>
                        <img className='w-12 ml-2 rounded-full border border-[#6CBF40]' src="/favicon.jpg" alt="" />
                        <Link to={'/'} className="btn btn-ghost text-lg lg:text-3xl font-bold">Roamify</Link>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex gap-2 font-semibold text-gray-400">
                        {navLinks}
                    </ul>
                </div>
                <div className="lg:navbar-end flex gap-4 items-center">
                    <label htmlFor="Toggle3" className="inline-flex items-center p-2 rounded-md cursor-pointer">
                        <input id="Toggle3" type="checkbox" className="hidden peer" checked={darkMode} onChange={toggleTheme} />
                        <span className={`px-4 py-2 rounded-l-md font-semibold ${darkMode ? 'bg-gray-300' : 'bg-[#6CBF40]'}`}>Light</span>
                        <span className={`px-4 py-2 rounded-r-md font-semibold ${darkMode ? 'bg-[#6CBF40]' : 'bg-gray-300'}`}>Dark</span>
                    </label>

                    {user ? (
                        <>
                            <div className="relative border-2 rounded-full border-red-400 group">
                                <img
                                    src={user.photoURL || "/user.png"}
                                    alt="User"
                                    className="w-10 h-10 mx-auto rounded-full"
                                    data-tooltip-content={user.displayName}
                                    data-tooltip-id="my-tooltip"
                                />
                                <Tooltip id="my-tooltip" />
                            </div>
                            <button onClick={handleSignOut} className="btn bg-[#6CBF40] text-white font-semibold lg:w-[116px] border-none">Log Out</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn bg-[#6CBF40] text-white font-semibold lg:w-[116px] border-none">Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
