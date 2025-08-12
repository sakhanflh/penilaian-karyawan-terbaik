import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
    return (
        <div className="bg-white shadow-md w-64 h-full">
            <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-blue-600">Tearas Kupu</h1>
                {/* Hamburger button for mobile - only visible when sidebar is open */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-500 focus:outline-none lg:hidden"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <nav className="mt-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                        }`
                    }
                    onClick={() => setSidebarOpen(false)}
                >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                </NavLink>
                <NavLink
                    to="/data-karyawan"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                        }`
                    }
                    onClick={() => setSidebarOpen(false)}
                >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Data Karyawan
                </NavLink>
                <NavLink
                    to="/penilaian"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                        }`
                    }
                    onClick={() => setSidebarOpen(false)}
                >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Penilaian & Hasil
                </NavLink>
                <button
                    onClick={() => {
                        handleLogout();
                        setSidebarOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;