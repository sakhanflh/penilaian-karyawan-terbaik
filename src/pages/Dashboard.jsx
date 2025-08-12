import { useState, useEffect } from 'react';
import DashboardCards from '../components/layouts/DashboardCards';

const Dashboard = () => {
    const [karyawan, setKaryawan] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data
        const mockKaryawan = [
            { id: 1, nama: 'John Doe', jabatan: 'Developer', departemen: 'IT' },
            { id: 2, nama: 'Jane Smith', jabatan: 'Designer', departemen: 'Creative' },
            { id: 3, nama: 'Bob Johnson', jabatan: 'Manager', departemen: 'Marketing' },
            { id: 4, nama: 'Alice Williams', jabatan: 'Analyst', departemen: 'Finance' },
        ];
        setKaryawan(mockKaryawan);
        setLoading(false);
    }, []);

    const topKaryawan = [...karyawan].sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="mt-2 text-gray-600">Ringkasan data karyawan dan penilaian</p>

            <DashboardCards totalKaryawan={karyawan.length} />

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800">Top Karyawan</h2>
                <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        topKaryawan.map((karyawan, index) => (
                            <div key={karyawan.id} className="p-6 bg-white rounded-lg shadow">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                                        {karyawan.nama.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-medium text-gray-800">{karyawan.nama}</h3>
                                        <p className="text-sm text-gray-600">{karyawan.jabatan}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                                        #{index + 1} Top Performer
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;