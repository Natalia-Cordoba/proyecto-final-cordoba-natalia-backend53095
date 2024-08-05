import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import { Link } from 'react-router-dom'

export const Cart = () => {
    const [products, setProducts] = useState([]);
    const { cartId } = useCart()

    useEffect(() => {
        if (!cartId) return

        const token = localStorage.getItem('token');

        fetch(`http://localhost:8080/api/cart/${cartId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud')
                }
                return response.json()
            })
            .then(data => {
                console.log('Cart Data:', data);
                setProducts(data.products || [])
            })
            .catch(error => {
                console.error('Error al obtener el carrito:', error)
            })
    }, [cartId])

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/cart/${cid}/product/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto del carrito');
            }
            const updatedCart = await response.json();
            setProducts(updatedCart.products || []);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleUpdateQuantity = async (productId, quantity) => {
        try {
            const response = await fetch(`http://localhost:8080/api/cart/${cid}/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la cantidad del producto');
            }
            const updatedCart = await response.json();
            setProducts(updatedCart.products || []);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section>
            <h1>Carrito</h1>
            <article>
                {products.length === 0 ? (
                    <>
                        <p>No se han agregado productos al carrito</p>
                        <Link
                            class="bg-violet-500 my-2 w-1/5 text-white font-bold text-center"
                            id="products"
                            to='/api/products'>Volver a productos
                        </Link>
                    </>
                ) : (
                    products.map((product) => (
                        <div class="flex m-4 justify-between" key={product.id_prod._id}>
                            <h3>Producto: {product.id_prod.title}</h3>
                            <p>Cantidad: {product.quantity}</p>
                            <button
                                class="bg-violet-500 m-auto px-2 text-white font-bold text-center"
                                onClick={() => handleDeleteProduct(product.id_prod._id)}>
                                    Eliminar del carrito
                            </button>
                            <Link
                                class="bg-violet-500 my-2 w-1/5 text-white font-bold text-center"
                                id="products"
                                to='/api/products'>Seguir comprando
                            </Link>
                            <button class="bg-violet-500 my-2 w-1/5 text-white font-bold text-center">
                                Finalizar compra
                            </button>
                        </div>
                    ))
                )}
            </article>

        </section>
    )
}
