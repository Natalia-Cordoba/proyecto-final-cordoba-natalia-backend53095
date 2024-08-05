import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (age < 18) {
            alert('Debes ser mayor de 18 para registrarte');
            return;
        }

        const userData = {
            first_name,
            last_name,
            age,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/api/session/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            if (response.ok) {
                const Data = await response.json()
                alert("Registro exitoso");
                // window.location.href = '/api/session/login'
                navigate('/api/session/login')              
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Error al registrar el usuario. Inténtalo de nuevo más tarde.')
        }
    };

    return (
        <section  class="flex flex-col items-center mt-10">
            <h1>Registrarse</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input
                    className="w-96 border-2 my-2"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                />
                <input
                    className="w-96 border-2 my-2"
                    type="text"
                    placeholder="Ingresa tu apellido"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                />
                <input
                    className="w-96 border-2 my-2"
                    type="number"
                    placeholder="Ingresa tu edad"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <input
                    className="w-96 border-2 my-2"
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-96 border-2 my-2"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-violet-500 my-2 text-white font-bold text-center"
                    type="submit"
                >
                    Crear usuario
                </button>
                <label class="text-center" htmlFor="login">¿Ya tienes creada una cuenta?</label>
                <Link
                    className="bg-violet-500 my-2 text-white font-bold text-center"
                    id="login"
                    to="/api/session/login"
                >
                    Iniciar sesión
                </Link>
            </form>
        </section>
    );
};

