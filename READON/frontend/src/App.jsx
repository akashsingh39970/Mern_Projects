
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
import CartPage from './page/CartPage'
import AddAddress from './page/AddAddress'
import MyOrders from './page/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './page/seller/SellerLayout'
import AddProduct from './page/seller/AddProduct'
import ProductList from './page/seller/ProductList'
import Orders from './page/seller/Orders'



const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  const {showUserLogin, isSeller} = useAppContext();
  return (
    
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      
      {isSellerPath ? null :  <Navbar/>}
      {showUserLogin ? <Login/> : null}
        <Toaster/>
        <div className={`${isSellerPath ? "" : 'px-6 md:px-16 lg:px-24 xl:px-30'}`}> 
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<AllProducts/>}/>
            <Route path='/products/:category' element={<ProductCategory/>}/>
            <Route path='/products/:category/:id' element={<ProductDetails/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/addAddress' element={<AddAddress/>}/>
            <Route path='/myorders' element={<MyOrders/>}/>
            <Route path='/seller' element={isSeller ? <SellerLayout/>  : <SellerLogin/>}>
              <Route index element={isSeller ? <AddProduct/> : null}/>
              <Route path='productlist' element={<ProductList/>}/>
              <Route path='orders' element={<Orders/>}/>
                

            </Route>
        
          </Routes>
        </div>
        {!isSellerPath && <Footer/>}
 
    </div>
  )
}

export default App
