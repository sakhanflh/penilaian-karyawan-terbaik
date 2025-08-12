import { useState, useEffect } from 'react';

const KaryawanForm = ({ onAdd, onEdit, editData, onCancel }) => {
    const [formData, setFormData] = useState({
        nama: '',
        posisi: '',
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                nama: editData.nama,
                posisi: editData.posisi,
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData) {
            onEdit({ ...formData, id: editData.id });
        } else {
            onAdd(formData);
        }
    };

    return (
        <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-900">
                {editData ? 'Edit Karyawan' : 'Tambah Karyawan'}
            </h2>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                        Nama
                    </label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        required
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.nama}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="posisi" className="block text-sm font-medium text-gray-700">
                        Posisi
                    </label>
                    <select
                        id="posisi"
                        name="posisi"
                        required
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.posisi}
                        onChange={handleChange}
                    >
                        <option value="">Pilih Posisi</option>
                        <option value="Barista">Barista</option>
                        <option value="Kasir">Kasir</option>
                        <option value="Waiter">Waiter</option>
                        <option value="Helper">Helper</option>
                        <option value="Kitchen">Kitchen</option>
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
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {editData ? 'Simpan Perubahan' : 'Tambah'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default KaryawanForm;