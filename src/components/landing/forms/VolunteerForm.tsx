import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar";
import { getCountries, getCountryCallingCode, isValidPhoneNumber, CountryCode } from "libphonenumber-js";

const VolunteerForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        lastnameP: "",
        lastnameM: "",
        email: "",
        dni: "",
        phone: "",
        callingCode: "+51",
        birthdate: "",
        area: "",
        hours: "",
        motivation: "",
    });

    const [selectedCountry, setSelectedCountry] = useState<CountryCode>("PE"); // País predeterminado (Perú)
    const [phoneValid, setPhoneValid] = useState(true);
    const [countries, setCountries] = useState<{ code: CountryCode; name: string }[]>([]);
    const [errors, setErrors] = useState({ email: "", dni: "", birthdate: "" });

    useEffect(() => {
        // Obtener la lista de países
        const countryList = getCountries().map((code) => ({
            code,
            name: new Intl.DisplayNames(["es"], { type: "region" }).of(code) || code,
        }));
        setCountries(countryList);
    }, []);

    useEffect(() => {
        // Actualizar el código del país en `callingCode` cuando cambie la selección
        setFormData((prev) => ({
            ...prev,
            callingCode: `+${getCountryCallingCode(selectedCountry)}`,
        }));
    }, [selectedCountry]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validaciones
        if (name === "email") {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: emailPattern.test(value) ? "" : "Debe tener el formato correcto",
            }));
        }

        if (name === "dni") {
            const dniPattern = /^[0-9]{8}$/;
            setErrors((prevErrors) => ({
                ...prevErrors,
                dni: dniPattern.test(value) ? "" : "Debe tener 8 dígitos numéricos",
            }));
        }

        if (name === "phone") {
            setPhoneValid(isValidPhoneNumber(value, selectedCountry));
        }

        if (name === "birthdate") {
            const birthYear = new Date(value).getFullYear();
            const currentYear = new Date().getFullYear();
            const age = currentYear - birthYear;

            if (age < 16) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    birthdate: "Debe ser mayor de 16 años",
                }));
            } else if (age > 100) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    birthdate: "La edad no puede superar los 100 años",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    birthdate: "",
                }));
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneValid) {
            alert("Número de teléfono no válido.");
            return;
        }
        if (errors.birthdate) {
            alert(errors.birthdate);
            return;
        }
        console.log("Datos enviados:", formData);
        alert("Formulario enviado con éxito (No conectado aún al backend)");
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-10">
                <div className="flex items-center mb-6">
                    <button
                        className="bg-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-pink-700 transition-all"
                        onClick={() => navigate("/home")}
                    >
                        Volver
                    </button>
                    <h2 className="text-3xl font-bold text-center flex-1">Formulario de Voluntariado</h2>
                </div>

                <form className="max-w-2xl mx-auto space-y-6 bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                    {/* Nombres */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Nombres</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombres"
                            required
                            className="border rounded-lg p-2 w-full"
                        />
                        <span className="text-gray-400 text-sm">Ej. Eduardo</span>
                    </div>

                    {/* Apellidos */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Apellido Paterno</label>
                            <input
                                type="text"
                                name="lastnameP"
                                value={formData.lastnameP}
                                onChange={handleChange}
                                placeholder="Apellido Paterno"
                                required
                                className="border rounded-lg p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Apellido Materno</label>
                            <input
                                type="text"
                                name="lastnameM"
                                value={formData.lastnameM}
                                onChange={handleChange}
                                placeholder="Apellido Materno"
                                required
                                className="border rounded-lg p-2 w-full"
                            />
                        </div>
                    </div>


                    {/* Correo y DNI */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Correo</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="usuario@hotmail.com"
                                required
                                className={`border rounded-lg p-2 w-full ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">DNI</label>
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleChange}
                                placeholder="DNI"
                                required
                                className={`border rounded-lg p-2 w-full ${errors.dni ? "border-red-500" : ""}`}
                            />
                            <span className="text-gray-400 text-sm">Ej. 11223344</span>
                            {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}
                        </div>
                    </div>

                    {/* Celular y Fecha de Nacimiento */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Celular</label>
                            <div className="flex">
                                <select
                                    name="country"
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value as CountryCode)}
                                    className="border border-gray-300 rounded-l-lg px-3 py-2 bg-gray-100 focus:outline-none"
                                >

                                    {countries.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            +{getCountryCallingCode(country.code)}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Número de celular"
                                    required
                                    className={`border border-gray-300 rounded-r-lg p-2 w-full ${
                                        phoneValid ? "border-gray-300" : "border-red-500"
                                    }`}
                                />
                            </div>
                            <span className="text-gray-400 text-sm">Ej. 111222333</span>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Nacimiento</label>
                            <input
                                type="date"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                required
                                className="border rounded-lg p-2 w-full"
                            />
                            <span className="text-gray-400 text-sm">Ej. 10 - 10 - 1990</span>
                            {errors.birthdate && <span className="text-red-500 text-sm">{errors.birthdate}</span>}
                        </div>

                    </div>

                    {/* Área y Horas disponibles */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Área */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Área</label>
                            <select
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                required
                                className="border rounded-lg p-2 w-full"
                            >
                                <option value="">Elegir Área</option>
                                <option value="Educación">Educación</option>
                                <option value="Medio Ambiente">Medio Ambiente</option>
                            </select>
                        </div>

                        {/* Horas disponibles */}
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium">Horas disponible por semana</label>
                            <select
                                name="hours"
                                value={formData.hours}
                                onChange={handleChange}
                                required
                                className="border rounded-lg p-2 w-full"
                            >
                                <option value="">Elegir horas</option>
                                <option value="5">5 horas</option>
                                <option value="10">10 horas</option>
                            </select>
                        </div>
                    </div>

                    {/* Motivación y Botones */}

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Motivación</label>
                        <textarea
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleChange}

                            required
                            className="border-2 border-pink-500 rounded-lg p-3 w-full min-h-[200px] focus:outline-none focus:ring-2 focus:ring-pink-500"
                        ></textarea>
                    </div>

                    <div className="flex justify-center gap-6 mt-6">
                        <button type="submit" className="bg-pink-600 text-white font-bold py-3 px-8 rounded-lg">
                            Enviar
                        </button>
                        <button type="button" className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VolunteerForm;
