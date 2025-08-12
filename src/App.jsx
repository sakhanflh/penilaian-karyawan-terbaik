import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layouts/Sidebar';
import Header from './components/layouts/Header';
import PrivateRoute from './components/layouts/PrivateRoute';
import Dashboard from './pages/Dashboard';
import DataKaryawan from './pages/DataKaryawan';
import Penilaian from './pages/Penilaian';
import Login from './pages/Login';
import WithSidebar from './components/layouts/WithSidebar';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`fixed lg:static z-20 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
          }`}>
          <Routes>
            {/* Route untuk login (tanpa sidebar) */}
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />

            {/* Route dengan sidebar */}
            <Route element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <WithSidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  handleLogout={handleLogout}
                />
              </PrivateRoute>
            }>
              <Route path="/" element={<Dashboard />} />
              <Route path="/data-karyawan" element={<DataKaryawan />} />
              <Route path="/penilaian" element={<Penilaian />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;