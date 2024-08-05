import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <section class="flex flex-col items-center mt-10">
            <h1 class="text-4xl mb-5">✨ Bienvenidxs ✨</h1>
            <Link class="bg-violet-500 my-2 w-auto px-4 rounded-full text-white font-bold" id="products" to='/api/products'>Ver los productos</Link>
        </section>
        
    )
}
