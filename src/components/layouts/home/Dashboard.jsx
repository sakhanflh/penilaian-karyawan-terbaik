import React, { useState } from 'react';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        attendance: '',
        speed: '',
        serviceQuality: '',
        attitude: '',
        teamwork: ''
    });
    const [formErrors, setFormErrors] = useState({});

    // Fungsi Login
    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Username atau password salah');
        }
    };

    // Fungsi Logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    // Handle input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Validasi form
    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Nama karyawan wajib diisi';
        if (
            formData.attendance === '' ||
            isNaN(formData.attendance) ||
            formData.attendance < 0 ||
            formData.attendance > 100
        )
            errors.attendance = 'Nilai harus antara 0-100';
        if (
            formData.speed === '' ||
            isNaN(formData.speed) ||
            formData.speed < 0 ||
            formData.speed > 100
        )
            errors.speed = 'Nilai harus antara 0-100';
        if (
            formData.serviceQuality === '' ||
            isNaN(formData.serviceQuality) ||
            formData.serviceQuality < 0 ||
            formData.serviceQuality > 100
        )
            errors.serviceQuality = 'Nilai harus antara 0-100';
        if (
            formData.attitude === '' ||
            isNaN(formData.attitude) ||
            formData.attitude < 0 ||
            formData.attitude > 100
        )
            errors.attitude = 'Nilai harus antara 0-100';
        if (
            formData.teamwork === '' ||
            isNaN(formData.teamwork) ||
            formData.teamwork < 0 ||
            formData.teamwork > 100
        )
            errors.teamwork = 'Nilai harus antara 0-100';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Fungsi keanggotaan fuzzifikasi (Low, Medium, High)
    const muLow = (x) => {
        if (x <= 25) return 1;
        if (x > 25 && x < 50) return (50 - x) / 25;
        return 0;
    };

    const muMedium = (x) => {
        if (x <= 25) return 0;
        if (x > 25 && x <= 50) return (x - 25) / 25;
        if (x > 50 && x < 75) return (75 - x) / 25;
        return 0;
    };

    const muHigh = (x) => {
        if (x <= 50) return 0;
        if (x > 50 && x < 75) return (x - 50) / 25;
        return 1;
    };

    // Bobot kriteria
    const weights = {
        attendance: 0.10,
        speed: 0.20,
        serviceQuality: 0.35,
        attitude: 0.15,
        teamwork: 0.20
    };

    // z base untuk rule output
    const zBase = {
        low: 40,
        medium: 70,
        high: 95
    };

    // Hitung skor fuzzy Sugeno
    const calculateSugenoScore = (criteria) => {
        // Fuzzifikasi tiap kriteria
        const fuzz = {
            attendance: {
                low: muLow(criteria.attendance),
                medium: muMedium(criteria.attendance),
                high: muHigh(criteria.attendance)
            },
            speed: {
                low: muLow(criteria.speed),
                medium: muMedium(criteria.speed),
                high: muHigh(criteria.speed)
            },
            serviceQuality: {
                low: muLow(criteria.serviceQuality),
                medium: muMedium(criteria.serviceQuality),
                high: muHigh(criteria.serviceQuality)
            },
            attitude: {
                low: muLow(criteria.attitude),
                medium: muMedium(criteria.attitude),
                high: muHigh(criteria.attitude)
            },
            teamwork: {
                low: muLow(criteria.teamwork),
                medium: muMedium(criteria.teamwork),
                high: muHigh(criteria.teamwork)
            }
        };

        // Buat list aturan: tiap kriteria & label
        const parts = [];
        for (const crit of Object.keys(fuzz)) {
            for (const label of ['low', 'medium', 'high']) {
                const alpha = fuzz[crit][label];
                if (alpha > 0) {
                    parts.push({
                        crit,
                        label,
                        alpha,
                        weight: weights[crit],
                        z: zBase[label],
                        contribution: alpha * weights[crit] * zBase[label],
                        alphaWeight: alpha * weights[crit]
                    });
                }
            }
        }

        const numerator = parts.reduce((sum, p) => sum + p.contribution, 0);
        const denominator = parts.reduce((sum, p) => sum + p.alphaWeight, 0);

        return denominator === 0 ? 0 : numerator / denominator;
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const score = calculateSugenoScore({
                attendance: parseFloat(formData.attendance),
                speed: parseFloat(formData.speed),
                serviceQuality: parseFloat(formData.serviceQuality),
                attitude: parseFloat(formData.attitude),
                teamwork: parseFloat(formData.teamwork)
            });

            const newEmployee = {
                id: Date.now(),
                name: formData.name.trim(),
                attendance: parseFloat(formData.attendance),
                speed: parseFloat(formData.speed),
                serviceQuality: parseFloat(formData.serviceQuality),
                attitude: parseFloat(formData.attitude),
                teamwork: parseFloat(formData.teamwork),
                score: score.toFixed(2),
                date: new Date().toLocaleString()
            };

            setEmployees([...employees, newEmployee].sort((a, b) => b.score - a.score));
            setFormData({
                name: '',
                attendance: '',
                speed: '',
                serviceQuality: '',
                attitude: '',
                teamwork: ''
            });
            setShowModal(false);
        }
    };

    // Hapus karyawan
    const handleDelete = (id) => {
        setEmployees(employees.filter((emp) => emp.id !== id));
    };

    // Dapatkan karyawan terbaik
    const getBestEmployee = () => {
        if (employees.length === 0) return '-';
        const best = employees[0];
        return `${best.name} (${best.score})`;
    };

    // Tampilan Login
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                    {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Tampilan Dashboard
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Penilaian Karyawan</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Ringkasan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Total Karyawan</h3>
                            <p className="mt-2 text-3xl font-semibold text-gray-900">{employees.length}</p>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Karyawan Terbaik</h3>
                            <p className="mt-2 text-3xl font-semibold text-gray-900">{getBestEmployee()}</p>
                        </div>
                    </div>
                </div>

                {/* Tombol Input */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Input Penilaian
                    </button>
                </div>

                {/* Tabel Data */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal/Waktu
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama Karyawan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kehadiran
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kecepatan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kualitas
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sikap
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kerja Sama Tim
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Skor
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {employees.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                                            Belum ada data
                                        </td>
                                    </tr>
                                ) : (
                                    employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.attendance}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.speed}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.serviceQuality}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.attitude}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.teamwork}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{employee.score}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    onClick={() => handleDelete(employee.id)}
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
                </div>
            </main>

            {/* Modal Input */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">Input Penilaian Karyawan</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Nama Karyawan
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? 'border-red-500' : ''
                                            }`}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.name && <p className="text-red-500 text-xs italic mt-1">{formErrors.name}</p>}
                                </div>

                                {['attendance', 'speed', 'serviceQuality', 'attitude', 'teamwork'].map((field) => (
                                    <div key={field} className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                                            {field === 'attendance' && 'Kehadiran'}
                                            {field === 'speed' && 'Kecepatan'}
                                            {field === 'serviceQuality' && 'Kualitas Pelayanan'}
                                            {field === 'attitude' && 'Sikap'}
                                            {field === 'teamwork' && 'Kerja Sama Tim'}
                                        </label>
                                        <input
                                            id={field}
                                            type="number"
                                            name={field}
                                            min="0"
                                            max="100"
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors[field] ? 'border-red-500' : ''
                                                }`}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors[field] && (
                                            <p className="text-red-500 text-xs italic mt-1">{formErrors[field]}</p>
                                        )}
                                    </div>
                                ))}

                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
