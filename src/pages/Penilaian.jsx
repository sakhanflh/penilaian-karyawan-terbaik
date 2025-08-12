import { useState, useEffect } from 'react';
import PenilaianForm from '../components/layouts/PenilaianForm';
import HasilPenilaianTable from '../components/layouts/HasilPenilaianTable';
import { calculateSugeno } from '../components/utils/fuzzySugeno';

const Penilaian = () => {
    const [karyawan, setKaryawan] = useState([]);
    const [penilaian, setPenilaian] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedKaryawan, setSelectedKaryawan] = useState(null);

    useEffect(() => {
        // Mock data
        const mockKaryawan = [
            { id: 1, nama: 'John Doe', jabatan: 'Developer', departemen: 'IT' },
            { id: 2, nama: 'Jane Smith', jabatan: 'Designer', departemen: 'Creative' },
            { id: 3, nama: 'Bob Johnson', jabatan: 'Manager', departemen: 'Marketing' },
            { id: 4, nama: 'Alice Williams', jabatan: 'Analyst', departemen: 'Finance' },
        ];
        setKaryawan(mockKaryawan);
    }, []);

    const handleSubmitPenilaian = (nilai) => {
        const skorAkhir = calculateSugeno(nilai);
        const newPenilaian = {
            id: penilaian.length + 1,
            karyawanId: selectedKaryawan.id,
            nama: selectedKaryawan.nama,
            ...nilai,
            skorAkhir,
            tanggal: new Date().toLocaleDateString(),
        };
        setPenilaian([...penilaian, newPenilaian]);
        setShowForm(false);
        setSelectedKaryawan(null);
    };

    const hasilPenilaian = penilaian.map(item => {
        return {
            ...item,
            peringkat: 0, // Will be calculated in the table component
        };
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Penilaian Karyawan</h1>
                    <p className="mt-2 text-gray-600">Input penilaian dan lihat hasil ranking karyawan</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={karyawan.length === 0}
                >
                    Input Penilaian
                </button>
            </div>

            {showForm && (
                <PenilaianForm
                    karyawan={karyawan}
                    onCancel={() => {
                        setShowForm(false);
                        setSelectedKaryawan(null);
                    }}
                    onSelectKaryawan={setSelectedKaryawan}
                    onSubmit={handleSubmitPenilaian}
                    selectedKaryawan={selectedKaryawan}
                />
            )}

            <div className="mt-6">
                <HasilPenilaianTable data={hasilPenilaian} />
            </div>
        </div>
    );
};

export default Penilaian;