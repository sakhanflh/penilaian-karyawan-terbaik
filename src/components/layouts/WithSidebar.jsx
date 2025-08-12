import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const WithSidebar = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed lg:static z-20 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    handleLogout={handleLogout}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
                    }`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default WithSidebar;