import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar";
import { getCountries, getCountryCallingCode, isValidPhoneNumber, CountryCode } from "libphonenumber-js";

const VolunteerForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        paternalSurname: "",
        maternalSurname: "",
        email: "",
        dni: "",
        birthdate: "",
        phoneNumber: "",
        codeNumber: "+51",
        area: "",
        estimatedHours: "",
        motivation: "",
        country: "Peru",
        region: "",
    });

    const [selectedCountry, setSelectedCountry] = useState<CountryCode>("PE"); // País predeterminado (Perú)
    const [phoneValid, setPhoneValid] = useState(true);
    const [countries, setCountries] = useState<{ code: CountryCode; name: string }[]>([]);
    const [errors, setErrors] = useState({ email: "", dni: "", birthdate: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false); // Control de la modal




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
            codeNumber: `+${getCountryCallingCode(selectedCountry)}`,
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

        if (name === "phoneNumber") {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!phoneValid) {
            alert("Número de teléfono no válido.");
            return;
        }
        if (errors.birthdate) {
            alert(errors.birthdate);
            return;
        }

        setIsSubmitting(true); // Deshabilitar botón de envío mientras se procesa

        try {
            const response = await fetch("http://localhost:8080/api/v1/volunteers/form", { // Cambia la URL aquí
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowModal(true); // Muestra modal de éxito
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Hubo un error en el envío.");
            }
        } catch (error) {
            console.error("Error en el envío del formulario:", error);
            alert("Error al conectar con el servidor."); // Mensaje de error
        }
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
                                name="paternalSurname"
                                value={formData.paternalSurname}
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
                                name="maternalSurname"
                                value={formData.maternalSurname}
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
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
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
                                name="estimatedHours"
                                value={formData.estimatedHours}
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
                        <button
                            type="submit"
                            className="bg-pink-600 text-white font-bold py-3 px-8 rounded-lg"
                            disabled={isSubmitting} // Se desactiva mientras envía
                        >
                            {isSubmitting ? "Enviando..." : "Enviar"}
                        </button>
                        <button type="button" className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal de confirmación */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800">Solicitud Enviada</h2>
                        <p className="text-gray-600 mt-2">Su solicitud ha sido procesada y está en espera de validación.</p>
                        <button
                            className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
                            onClick={() => setShowModal(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default VolunteerForm;
