const KaryawanTable = ({ karyawan, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-scroll border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Nama
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Posisi
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {karyawan.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                Tidak ada data karyawan
                            </td>
                        </tr>
                    ) : (
                        karyawan.map((karyawan) => (
                            <tr key={karyawan.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                                                {karyawan.nama.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{karyawan.nama}</div>
                                        </div>
                                    </div>
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                        {karyawan.posisi}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(karyawan)}
                                        className="mr-3 text-blue-600 hover:text-blue-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(karyawan.id)}
                                        className="text-red-600 hover:text-red-900"
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
    );
};

export default KaryawanTable;