import { format } from 'date-fns';

const PenilaianTable = ({ penilaianList, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kehadiran</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kecepatan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kualitas</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sikap</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kerja Sama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rata-rata</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuzzy Score</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {penilaianList.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                                    Belum ada data penilaian
                                </td>
                            </tr>
                        ) : (
                            penilaianList.map((penilaian) => (
                                <tr key={penilaian.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {penilaian.nama}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(penilaian.tanggal, 'dd/MM/yyyy HH:mm')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penilaian.kehadiran}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penilaian.kecepatan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penilaian.kualitasPelayanan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penilaian.sikap}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penilaian.kerjaSamaTim}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penilaian.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{penilaian.rataRata}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <span className={`px-2 py-1 rounded-full text-xs ${penilaian.fuzzyScore >= 80 ? 'bg-green-100 text-green-800' :
                                            penilaian.fuzzyScore >= 60 ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {penilaian.fuzzyScore}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => onDelete(penilaian.id)}
                                            className="text-red-600 hover:text-red-900"
                                            aria-label="Hapus penilaian"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PenilaianTable;