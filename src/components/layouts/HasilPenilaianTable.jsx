const HasilPenilaianTable = ({ data }) => {
    // Sort data by skorAkhir descending and add ranking
    const sortedData = [...data]
        .sort((a, b) => b.skorAkhir - a.skorAkhir)
        .map((item, index) => ({
            ...item,
            peringkat: index + 1,
        }));

    return (
        <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Peringkat
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Nama Karyawan
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Kehadiran
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Kecepatan Kerja
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Kualitas
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Sikap
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Kerjasama
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Skor Akhir
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Tanggal
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData.length === 0 ? (
                        <tr>
                            <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                                Tidak ada data penilaian
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.peringkat === 1 ? 'bg-yellow-100 text-yellow-800' :
                                            item.peringkat === 2 ? 'bg-gray-100 text-gray-800' :
                                                item.peringkat === 3 ? 'bg-amber-100 text-amber-800' :
                                                    'bg-blue-100 text-blue-800'
                                        }`}>
                                        #{item.peringkat}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{item.nama}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{item.kehadiran}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{item.kecepatanKerja}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{item.kualitasPelayanan}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{item.sikapEtika}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{item.kerjaSamaTim}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-semibold text-gray-900">{item.skorAkhir.toFixed(2)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{item.tanggal}</div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HasilPenilaianTable;