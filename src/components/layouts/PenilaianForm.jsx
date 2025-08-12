import { useState } from 'react';

const PenilaianForm = ({ karyawan, onSelectKaryawan, onSubmit, onCancel, selectedKaryawan }) => {
    const [nilai, setNilai] = useState({
        kehadiran: '',
        kecepatanKerja: '',
        kualitasPelayanan: '',
        sikapEtika: '',
        kerjaSamaTim: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validate input is between 0-100
        if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
            setNilai({
                ...nilai,
                [name]: value,
            });
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Check all fields are filled
        for (const key in nilai) {
            if (nilai[key] === '') {
                newErrors[key] = 'Nilai harus diisi';
                isValid = false;
            } else if (Number(nilai[key]) < 0 || Number(nilai[key]) > 100) {
                newErrors[key] = 'Nilai harus antara 0-100';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(nilai);
        }
    };

    return (
        <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-900">Form Penilaian Karyawan</h2>

            {!selectedKaryawan ? (
                <div className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="karyawan" className="block text-sm font-medium text-gray-700">
                            Pilih Karyawan
                        </label>
                        <select
                            id="karyawan"
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => {
                                const selected = karyawan.find(k => k.id === parseInt(e.target.value));
                                onSelectKaryawan(selected);
                            }}
                        >
                            <option value="">Pilih Karyawan</option>
                            {karyawan.map((k) => (
                                <option key={k.id} value={k.id}>
                                    {k.nama} - {k.jabatan}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            ) : (
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <div className="p-4 bg-gray-50 rounded-md">
                        <h3 className="text-sm font-medium text-gray-700">Karyawan yang dinilai</h3>
                        <p className="mt-1 text-sm text-gray-900">
                            {selectedKaryawan.nama} - {selectedKaryawan.jabatan} ({selectedKaryawan.departemen})
                        </p>
                    </div>

                    <div>
                        <label htmlFor="kehadiran" className="block text-sm font-medium text-gray-700">
                            Kehadiran (0-100)
                        </label>
                        <input
                            type="number"
                            id="kehadiran"
                            name="kehadiran"
                            min="0"
                            max="100"
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={nilai.kehadiran}
                            onChange={handleChange}
                        />
                        {errors.kehadiran && <p className="mt-1 text-sm text-red-600">{errors.kehadiran}</p>}
                    </div>

                    <div>
                        <label htmlFor="kecepatanKerja" className="block text-sm font-medium text-gray-700">
                            Kecepatan dan Ketepatan Kerja (0-100)
                        </label>
                        <input
                            type="number"
                            id="kecepatanKerja"
                            name="kecepatanKerja"
                            min="0"
                            max="100"
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={nilai.kecepatanKerja}
                            onChange={handleChange}
                        />
                        {errors.kecepatanKerja && <p className="mt-1 text-sm text-red-600">{errors.kecepatanKerja}</p>}
                    </div>

                    <div>
                        <label htmlFor="kualitasPelayanan" className="block text-sm font-medium text-gray-700">
                            Kualitas Pelayanan (0-100)
                        </label>
                        <input
                            type="number"
                            id="kualitasPelayanan"
                            name="kualitasPelayanan"
                            min="0"
                            max="100"
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={nilai.kualitasPelayanan}
                            onChange={handleChange}
                        />
                        {errors.kualitasPelayanan && <p className="mt-1 text-sm text-red-600">{errors.kualitasPelayanan}</p>}
                    </div>

                    <div>
                        <label htmlFor="sikapEtika" className="block text-sm font-medium text-gray-700">
                            Sikap dan Etika (0-100)
                        </label>
                        <input
                            type="number"
                            id="sikapEtika"
                            name="sikapEtika"
                            min="0"
                            max="100"
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={nilai.sikapEtika}
                            onChange={handleChange}
                        />
                        {errors.sikapEtika && <p className="mt-1 text-sm text-red-600">{errors.sikapEtika}</p>}
                    </div>

                    <div>
                        <label htmlFor="kerjaSamaTim" className="block text-sm font-medium text-gray-700">
                            Kerja Sama Tim (0-100)
                        </label>
                        <input
                            type="number"
                            id="kerjaSamaTim"
                            name="kerjaSamaTim"
                            min="0"
                            max="100"
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={nilai.kerjaSamaTim}
                            onChange={handleChange}
                        />
                        {errors.kerjaSamaTim && <p className="mt-1 text-sm text-red-600">{errors.kerjaSamaTim}</p>}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Simpan Penilaian
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default PenilaianForm;