import React, {FC, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar";
import environment from "../../../enviroment.ts";
import CountrySelect from "../../common/CountrySelect.tsx";
import {CountryCode, getCountries, getCountryCallingCode} from "libphonenumber-js";

// Areas
interface Area {
    areaId: number;
    name: string;
    color: string;
}

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
    areaId: string;
}

const VolunteerForm: FC = () => {
    const navigate = useNavigate();
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
        areaId: "",
    });

    const [areas, setAreas] = useState<Area[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>("PE");
    const [countries, setCountries] = useState<{ code: CountryCode; name: string }[]>([]);

    useEffect(() => {
        const countryList = getCountries().map((code) => ({
            code,
            name: new Intl.DisplayNames(["es"], {type: "region"}).of(code) || code,
        }));
        setCountries(countryList);
    }, []);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            codeNumber: `+${getCountryCallingCode(selectedCountry)}`,
        }));
    }, [selectedCountry]);

    // Función para obtener las áreas disponibles
    const fetchAreas = async () => {
        try {
            const response = await fetch(`${environment.API_URL}/areas/public/all`);
            if (!response.ok) throw new Error("Error al obtener áreas");

            const data: Area[] = await response.json();
            setAreas(data);
        } catch (error) {
            console.error("Error obteniendo áreas:", error);
        }
    };

    // Llamar a fetchAreas cuando se monte el componente
    useEffect(() => {
        fetchAreas();
    }, []);

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
            setServerResponse(data.message || "Operación exitosa");// "Solicitud de voluntariado enviada correctamente." o similar
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
                areaId: "",
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrió un error desconocido.");
            }
        }
    };

    // Maneja el reseteo del formulario (Revision )
    const handleReset = () => {
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
            areaId: "",
        });
        setError("");
        setServerResponse("");
    };

    return (
        <div className="min-h-screen bg-light flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/*
              Barra rosa debajo del navbar
              Botón "Volver" a la izquierda, título centrado
            */}
            <div className="w-full bg-pink-100 relative flex items-center justify-center py-4 mb-4 px-4 sm:px-6">
                <button
                    onClick={() => navigate("/home")}
                    className="absolute left-4 bg-pink-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-pink-700 transition-colors text-sm sm:text-base flex items-center"
                    aria-label="Volver a la página principal"
                >
                    <span className="hidden sm:inline">Volver</span>
                    <span className="sm:hidden">←</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-semibold text-black">
                    Formulario de Voluntariado
                </h1>
            </div>

            {/* Contenedor principal (tarjeta blanca con el formulario) */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 w-full">
                <div className="w-full max-w-4xl bg-white shadow-md rounded-md p-3 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            {/* Nombres */}
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
                                    placeholder="Nombres"
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    required
                                />
                                <span id="name-hint" className="text-gray-400 text-xs sm:text-sm mt-1">Ej. Eduardo</span>
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
                                    placeholder="Apellido Paterno"
                                    className="border border-gray-300 rounded-md p-2"
                                    required
                                />
                                <span className="text-gray-400 text-sm">Ej. Martínez</span>
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
                                    placeholder="Apellido Materno"
                                    className="border border-gray-300 rounded-md p-2"
                                    required
                                />
                                <span className="text-gray-400 text-sm">Ej. García</span>
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
                                    placeholder="Correo"
                                    className="border border-gray-300 rounded-md p-2"
                                    required
                                />
                                <span className="text-gray-400 text-sm">Ej. nombres@dominio.tld</span>
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
                                    placeholder="DNI"
                                    className="border border-gray-300 rounded-md p-2"
                                    required
                                />
                                <span className="text-gray-400 text-sm">Ej. 11223344</span>
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
                                <span className="text-gray-400 text-sm">Ej. 10 - 10 - 1990</span>
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
                                    placeholder="Numero de Celular"
                                    className="border border-gray-300 rounded-md p-2"
                                    required
                                />
                                <span className="text-gray-400 text-sm">Ej. 111222333 </span>
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
                                    placeholder="País"
                                    className="border border-gray-300 rounded-md p-2"
                                    required
                                />
                                <span className="text-gray-400 text-sm">Ej. Perù</span>
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
                                    placeholder="Regíon"
                                    className="border border-gray-300 rounded-md p-2"
                                    required
                                />
                                <span className="text-gray-400 text-sm">Ej. La Libertad</span>
                            </div>

                            {/* Horas estimadas */}
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-medium mb-1" htmlFor="estimatedHours">
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
                                    <option value="" disabled>
                                        Seleccionar
                                    </option>
                                    {estimatedHoursOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-medium mb-1" htmlFor="areaId">
                                    Área de Voluntariado
                                </label>
                                <select
                                    id="areaId"
                                    name="areaId"
                                    value={formData.areaId}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2"
                                    required
                                >
                                    <option value="" disabled>Selecciona un área</option>
                                    {areas.map((area) => (
                                        <option key={area.areaId} value={area.areaId}>
                                            {area.name}
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
                                    <p className="text-green-600 font-medium mb-2">
                                        {typeof serverResponse === "string" ? serverResponse : JSON.stringify(serverResponse)}
                                    </p>
                                )}
                                {error && (
                                    <p className="text-red-600 font-medium mb-2">
                                        {typeof error === "string" ? error : JSON.stringify(error)}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Botones (Enviar / Cancelar) */}
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                type="submit"
                                className="
                                    bg-pink-500
                                    text-white
                                    px-6
                                    py-2
                                    rounded-md
                                    hover:bg-pink-600
                                    transition-colors
                                "
                            >
                                Enviar
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="
                                    bg-teal-500
                                    text-white
                                    px-6
                                    py-2
                                    rounded-md
                                    hover:bg-teal-600
                                    transition-colors
                                "
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VolunteerForm;
