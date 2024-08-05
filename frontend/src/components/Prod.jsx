import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Prod = () => {
    const { pid } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${pid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud')
                }
                return response.json()
            })
            .then(data => {
                setProduct(data)
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error)
            })
    }, [pid])

    return (
        <section>
            <h1 class='text-center font-semibold text-xl'>Nuestros libros</h1>
            {product ? (
                <article class="flex flex-wrap">
                    <ul class="mx-auto justify-around">
                        <li class="w-80 p-4 mb-4 border rounded-lg" key={product._id}>
                            <h2 class="font-semibold text-center">{product.title}</h2>
                            <img src={product.image} alt="imagen del libro" />
                            <p>Descripción: {product.description}</p>
                            <p>Stock disponible: {product.stock}</p>
                            <h3 class="font-semibold">Precio: ${product.price}</h3>
                            <button class="bg-violet-500 my-2 w-auto px-4 rounded-full text-white font-bold">Añadir al carrito</button>
                        </li>
                    </ul>
                </article>
            ) : (
                <p>Producto no encontrado</p>
            )}
        </section>
    )
}

export default Prod;

