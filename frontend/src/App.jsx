import { Chat } from './components/Chat'
import { Cart } from './components/Cart'
import { ErrorPage } from './components/ErrorPage'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Products } from './components/Products'
import Prod from './components/Prod'
import { Users } from './components/Users'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div class="max-w-6xl mx-auto min-h-screen grid grid-rows-[auto,1fr,auto]">
      <BrowserRouter>
        <Header />
        <main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/api/products' element={<Products />} />
          <Route path='/api/products/:pid' element={<Prod />} />
          <Route path='/api/users' element={<Users />} />
          <Route path='/api/session/login' element={<Login />}></Route>
          <Route path='/api/session/register' element={<Register />}></Route>
          <Route path='/api/chat' element={<Chat />}></Route>
          <Route path='/api/cart/:cid' element={<Cart />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>   
  )
}

export default App;

