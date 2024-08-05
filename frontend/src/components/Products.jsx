import { useEffect, useState } from 'react';

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  return (
    <section>
      <h1 className='text-center font-semibold text-xl my-4'>Nuestros libros</h1>
      {products.length > 0 ? (
        <div className="flex flex-wrap justify-around">
          {products.map(product => (
            <div className="w-80 p-4 mb-4 border rounded-lg" key={product._id}>
              <h2 className="font-semibold text-center">{product.title}</h2>
              <img src={product.image} alt="imagen del libro" /> 
              <p>Descripción: {product.description}</p>
              <p>Stock disponible: {product.stock}</p>
              <h3 className="font-semibold">Precio: ${product.price}</h3>
              <button className="bg-violet-500 my-2 w-auto px-4 rounded-full text-white font-bold">Añadir al carrito</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </section>
  )
}

