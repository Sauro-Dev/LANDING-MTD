import { useState } from "react";
import Navbar from "../../common/Navbar.tsx";

const VolunteerForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        dni: "",
        phone: "",
        birthdate: "",
        area: "",
        hours: "",
        motivation: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        alert("Formulario enviado con éxito (No conectado aún al backend)");
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto py-10">
                <h2 className="text-3xl font-bold text-center mb-6">Formulario de Voluntariado</h2>
                <form className="max-w-2xl mx-auto space-y-4 bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="name" placeholder="Nombres" required className="input" onChange={handleChange} />
                        <input type="text" name="lastname" placeholder="Apellidos" required className="input" onChange={handleChange} />
                    </div>
                    <input type="email" name="email" placeholder="Correo" required className="input w-full" onChange={handleChange} />
                    <input type="text" name="dni" placeholder="DNI" required className="input w-full" onChange={handleChange} />
                    <input type="tel" name="phone" placeholder="Número de celular" required className="input w-full" onChange={handleChange} />
                    <input type="date" name="birthdate" required className="input w-full" onChange={handleChange} />
                    <select name="area" required className="input w-full" onChange={handleChange}>
                        <option value="">Elegir Área</option>
                        <option value="Educación">Educación</option>
                        <option value="Medio Ambiente">Medio Ambiente</option>
                    </select>
                    <input type="text" name="hours" placeholder="Horas disponibles por semana" required className="input w-full" onChange={handleChange} />
                    <textarea name="motivation" placeholder="Motivación" required className="input w-full" rows={3} onChange={handleChange}></textarea>
                    <div className="flex justify-between">
                        <button type="submit" className="btn-primary">Enviar</button>
                        <button type="button" className="btn-secondary">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VolunteerForm;
