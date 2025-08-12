import { useState, useEffect } from 'react';
import KaryawanForm from '../components/layouts/KaryawanForm';
import KaryawanTable from '../components/layouts/KaryawanTable';

const DataKaryawan = () => {
    const [karyawan, setKaryawan] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        // Mock data
        const mockKaryawan = [
            { id: 1, nama: 'John Doe', posisi: 'Barista' },
            { id: 2, nama: 'Jane Smith', posisi: 'Kitchen' },
            { id: 3, nama: 'Bob Johnson', posisi: 'Waiter' },
            { id: 4, nama: 'Alice Williams', posisi: 'Helper' },
        ];
        setKaryawan(mockKaryawan);
    }, []);

    const handleAdd = (newKaryawan) => {
        setKaryawan([...karyawan, { ...newKaryawan, id: karyawan.length + 1 }]);
        setShowForm(false);
    };

    const handleEdit = (updatedKaryawan) => {
        setKaryawan(karyawan.map(k => k.id === updatedKaryawan.id ? updatedKaryawan : k));
        setEditData(null);
        setShowForm(false);
    };

    const handleDelete = (id) => {
        setKaryawan(karyawan.filter(k => k.id !== id));
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Data Karyawan</h1>
                    <p className="mt-2 text-gray-600">Kelola data karyawan perusahaan</p>
                </div>
                <button
                    onClick={() => {
                        setEditData(null);
                        setShowForm(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Tambah Karyawan
                </button>
            </div>

            {showForm && (
                <KaryawanForm
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    editData={editData}
                    onCancel={() => {
                        setShowForm(false);
                        setEditData(null);
                    }}
                />
            )}

            <div className="mt-6">
                <KaryawanTable
                    karyawan={karyawan}
                    onEdit={(karyawan) => {
                        setEditData(karyawan);
                        setShowForm(true);
                    }}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default DataKaryawan;