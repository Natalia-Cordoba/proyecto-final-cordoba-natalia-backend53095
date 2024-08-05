import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { auth, setAuth } = useAuth();
    const { setCartId } = useCart(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate('/api/products');
        }
    }, [auth, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch('http://localhost:8080/api/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json();
    
            if (!response.ok) {
                setError(data.message)
            } else {
                console.log('Login Response Data:', data);
                if (data.token && data.cartId) {
                    localStorage.setItem('token', data.token);
                    setAuth(true);
                    setCartId(data.cartId); 
                    navigate('/api/products');
                } else {
                    setError("No se recibió el token de autenticación o el cartId.");
                }
            }
        } catch (error) {
            setError("Error al iniciar sesión")
        }
    }

    return (
        <section  class="flex flex-col items-center mt-10">
            <h1>Iniciar sessión</h1>
            <form class="flex flex-col" onSubmit={handleSubmit}>
                <input id="email" 
                    class="border-2 my-2" 
                    type="email" 
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    id="password" 
                    class="border-2 my-2" 
                    type="password" 
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button class="bg-violet-500 my-2 text-white font-bold text-center" type="submit">
                    Iniciar sessión
                </button>
                <div id="error" class="text-red-700">{error}</div>
                <label htmlFor="register">¿Aún no tienes creada una cuenta?</label>
                <Link class="bg-violet-500 my-2 text-white font-bold text-center" id="register" to='register'>Registrarse</Link>
            </form>
        </section>
    )
}