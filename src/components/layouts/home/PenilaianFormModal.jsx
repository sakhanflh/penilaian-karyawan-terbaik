import { useState } from 'react';

const PenilaianFormModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        nama: '',
        kehadiran: '',
        kecepatan: '',
        kualitasPelayanan: '',
        sikap: '',
        kerjaSamaTim: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Validasi nama
        if (!formData.nama.trim()) {
            newErrors.nama = 'Nama tidak boleh kosong';
        }

        // Validasi kriteria penilaian
        const fields = ['kehadiran', 'kecepatan', 'kualitasPelayanan', 'sikap', 'kerjaSamaTim'];
        fields.forEach(field => {
            const value = formData[field];
            if (value === '') {
                newErrors[field] = 'Nilai tidak boleh kosong';
            } else if (isNaN(value) || value < 0 || value > 100) {
                newErrors[field] = 'Nilai harus antara 0 dan 100';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Input Penilaian</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Tutup modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Input Nama */}
                            <div>
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                                    Nama Karyawan
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full rounded-md border ${errors.nama ? 'border-red-500' : 'border-gray-300'
                                        } shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                                    aria-invalid={!!errors.nama}
                                    aria-describedby="nama-error"
                                />
                                {errors.nama && (
                                    <p id="nama-error" className="mt-1 text-sm text-red-600">
                                        {errors.nama}
                                    </p>
                                )}
                            </div>

                            {/* Input Kriteria Penilaian */}
                            {['kehadiran', 'kecepatan', 'kualitasPelayanan', 'sikap', 'kerjaSamaTim'].map((field) => (
                                <div key={field}>
                                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                                        {field.replace(/([A-Z])/g, ' $1')}
                                    </label>
                                    <input
                                        type="number"
                                        id={field}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="100"
                                        className={`mt-1 block w-full rounded-md border ${errors[field] ? 'border-red-500' : 'border-gray-300'
                                            } shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                                        aria-invalid={!!errors[field]}
                                        aria-describedby={`${field}-error`}
                                    />
                                    {errors[field] && (
                                        <p id={`${field}-error`} className="mt-1 text-sm text-red-600">
                                            {errors[field]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PenilaianFormModal;