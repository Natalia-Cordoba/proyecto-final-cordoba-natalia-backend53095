import { Link } from "react-router-dom"
import { Logout } from "./Logout"
import { useAuth } from '../context/AuthContext'
import { useCart } from "../context/CartContext";


export const Header = () => {
    const { auth } = useAuth()
    const { cartId }  = useCart()

    console.log('Cart ID in Header:', cartId);
    return (

        <header class="flex bg-violet-500 p-4 justify-between">
            <Link class="text-white font-bold" id="home" to='/'>TIENDA DE LIBROS</Link>
            {auth ? (
                <>
                    <Link class="text-white font-bold" id="cart" to={`/api/cart/${cartId}`}>Carrito</Link>
                    <Logout />
                </>
            ) : (
                <>
                    <Link class="text-white font-bold" id="login" to="/api/session/login">Iniciar sesión</Link>
                    <Link class="text-white font-bold" id="register" to="/api/session/register">Registrarse</Link>
                </>
            )}
        </header>
    )
}