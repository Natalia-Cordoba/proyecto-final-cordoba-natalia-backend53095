import { Link } from 'react-router-dom'
import Error from '../assets/images/error.svg'

export const ErrorPage = () => {
    return (
        <article class="flex flex-col items-center mt-10">
            <h1 class="text-3xl font-bold">404 NOT FOUND</h1>
            <img src={Error} alt="ErrorImg" class="w-96 jus" />
            <Link class="bg-violet-500 my-2 w-auto px-4 rounded-full text-white font-bold" to='/'>Volver</Link>
        </article>
    )
}