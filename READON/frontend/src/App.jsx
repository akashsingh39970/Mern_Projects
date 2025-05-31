
import Navbar from './components/navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './page/home/Home'



const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  console.log(useLocation().pathname);
  return (
    <div>
      
      {isSellerPath ? null :  <Navbar/>}
        <div className={`${isSellerPath ? "" : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}> 
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </div>
 
    </div>
  )
}

export default App
