import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/session/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                localStorage.removeItem('token'); 
                setAuth(false)
                navigate('/')
            } else {
                const result = await response.text();
                console.error('Error al cerrar sesión:', result);
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <button onClick={handleLogout} className="text-white font-bold">
            Cerrar sesión
        </button>
    ) 
};