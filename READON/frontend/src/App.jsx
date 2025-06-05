
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './page/Home'
import {Toaster} from 'react-hot-toast' 
import Footer from './components/Footer'
import { useAppContext } from './components/AppContext'
import Login from './components/Login'
import AllProducts from './page/AllProducts'
import ProductCategory from './page/ProductCategory'
import ProductDetails from './page/ProductDetails'



const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  const {showUserLogin} = useAppContext();

  return (
    <div>
      
      {isSellerPath ? null :  <Navbar/>}
      {showUserLogin ? <Login/> : null}
        <Toaster/>
        <div className={`${isSellerPath ? "" : 'px-6 md:px-16 lg:px-24 xl:px-30'}`}> 
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<AllProducts/>}/>
            <Route path='/products/:category' element={<ProductCategory/>}/>
            <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          </Routes>
        </div>
        {!isSellerPath && <Footer/>}
 
    </div>
  )
}

export default App
