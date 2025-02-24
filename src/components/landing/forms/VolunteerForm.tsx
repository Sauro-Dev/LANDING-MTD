import React, {FC, useEffect, useState} from "react";
import Navbar from "../../common/Navbar";
import environment from "../../../enviroment.ts";
import CountrySelect from "../../common/CountrySelect.tsx";
import {CountryCode, getCountries, getCountryCallingCode} from "libphonenumber-js";


type estimatedHours =
    | "THREE"
    | "FOUR"
    | "FIVE"
    | "SIX"
    | "SEVEN"
    | "EIGHT"
    | "NINE"
    | "PLUS_TEN";

interface  HoursOption {
    value: estimatedHours;
    label: string;
}

const estimatedHoursOptions: HoursOption[] = [
    { value: "THREE", label: "3 horas" },
    { value: "FOUR", label: "4 horas" },
    { value: "FIVE", label: "5 horas" },
    { value: "SIX", label: "6 horas" },
    { value: "SEVEN", label: "7 horas" },
    { value: "EIGHT", label: "8 horas" },
    { value: "NINE", label: "9 horas" },
    { value: "PLUS_TEN", label: "+10 horas" },
];

interface VolunteerFormData {
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    email: string;
    dni: string;
    birthdate: string;
    phoneNumber: string;
    codeNumber: string;
    country: string;
    region: string;
    motivation: string;
    estimatedHours: estimatedHours;
}

const VolunteerForm: FC = () => {
    const [formData, setFormData] = useState<VolunteerFormData>({
        name: "",
        paternalSurname: "",
        maternalSurname: "",
        email: "",
        dni: "",
        birthdate: "",
        phoneNumber: "",
        codeNumber: "+51",
        country: "",
        region: "",
        motivation: "",
        estimatedHours: "THREE",
    });

    const [selectedCountry, setSelectedCountry] = useState<CountryCode>("PE");
    const [countries, setCountries] = useState<{ code: CountryCode; name: string }[]>([]);

    useEffect(() => {
        const countryList = getCountries().map((code) => ({
            code,
            name: new Intl.DisplayNames(["es"], { type: "region" }).of(code) || code,
        }));
        setCountries(countryList);
    }, []);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            codeNumber: `+${getCountryCallingCode(selectedCountry)}`,
        }));
    }, [selectedCountry]);

    // Para mostrar mensajes de éxito o error
    const [serverResponse, setServerResponse] = useState("");
    const [error, setError] = useState("");

    // Maneja el cambio en los inputs
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerResponse("");
        setError("");

        try {
            // Ajusta la URL a la de tu backend (según tu Controller)
            const response = await fetch(`${environment.API_URL}/volunteers/form`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Error al enviar el formulario.");
            }

            const data = await response.json();
            setServerResponse(data); // "Solicitud de voluntariado enviada correctamente." o similar
            // Limpiar campos si lo deseas
            setFormData({
                name: "",
                paternalSurname: "",
                maternalSurname: "",
                email: "",
                dni: "",
                birthdate: "",
                phoneNumber: "",
                codeNumber: "+51",
                country: "",
                region: "",
                motivation: "",
                estimatedHours: "THREE",
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrió un error desconocido.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-light flex flex-col items-center justify-center p-4">
            <Navbar />
            <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-6">
                <h1 className="text-2xl font-semibold mb-6 text-center text-primary">
                    Formulario de Voluntariado
                </h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="name">
                            Nombres
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            maxLength={25}
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Apellido Paterno */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="paternalSurname">
                            Apellido Paterno
                        </label>
                        <input
                            type="text"
                            id="paternalSurname"
                            name="paternalSurname"
                            maxLength={25}
                            value={formData.paternalSurname}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Apellido Materno */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="maternalSurname">
                            Apellido Materno
                        </label>
                        <input
                            type="text"
                            id="maternalSurname"
                            name="maternalSurname"
                            maxLength={25}
                            value={formData.maternalSurname}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="email">
                            Correo
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            maxLength={50}
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* DNI */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="dni">
                            DNI
                        </label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            pattern="^[0-9]{8}$"
                            value={formData.dni}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Fecha de nacimiento */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="birthdate">
                            Fecha de Nacimiento
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Teléfono */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="phoneNumber">
                            Número de celular
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            pattern="^[0-9]{9}$"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Codigo de Telefono */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="countrySelect">
                            Código de País
                        </label>
                        <CountrySelect
                            countries={countries}
                            selectedCountry={selectedCountry}
                            onChange={(value) => setSelectedCountry(value)}
                        />
                    </div>

                    {/* País */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="country">
                            País
                        </label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Región */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="region">
                            Región
                        </label>
                        <input
                            type="text"
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Horas estimadas */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="estimateHours">
                            Horas Estimadas
                        </label>
                        <select
                            id="estimatedHours"
                            name="estimatedHours"
                            value={formData.estimatedHours}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            required
                        >
                            {/* Opción por defecto si deseas que aparezca algo como "Selecciona horas" */}
                            <option >
                                Seleccionar
                            </option>

                            {estimatedHoursOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Motivación */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-gray-700 font-medium mb-1" htmlFor="motivation">
                            Motivación
                        </label>
                        <textarea
                            id="motivation"
                            name="motivation"
                            maxLength={200}
                            value={formData.motivation}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2"
                            rows={4}
                            required
                        />
                    </div>

                    {/* Mensajes de respuesta o error */}
                    <div className="md:col-span-2 flex flex-col items-center">
                        {serverResponse && (
                            <p className="text-green-600 font-medium mb-2">{serverResponse}</p>
                        )}
                        {error && <p className="text-red-600 font-medium mb-2">{error}</p>}
                    </div>

                    {/* Botones */}
                    <div className="md:col-span-2 flex justify-center space-x-4 mt-4">
                        <button
                            type="submit"
                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
                        >
                            Enviar
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                // Si deseas resetear el formulario manualmente
                                setFormData({
                                    name: "",
                                    paternalSurname: "",
                                    maternalSurname: "",
                                    email: "",
                                    dni: "",
                                    birthdate: "",
                                    phoneNumber: "",
                                    codeNumber: "+51",
                                    country: "",
                                    region: "",
                                    motivation: "",
                                    estimatedHours: "THREE",
                                });
                                setError("");
                                setServerResponse("");
                            }}
                            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VolunteerForm;
