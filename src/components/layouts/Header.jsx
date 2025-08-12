const Header = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <header className={`bg-white shadow-sm z-10 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
            <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center">
                    <button
                        className="text-gray-500 focus:outline-none lg:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold overflow-hidden">
                        <img src="/img/logo-tearas-kupu.jpg" alt="" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;