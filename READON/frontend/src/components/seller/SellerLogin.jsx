import { useState } from 'react';
import {useAppContext} from '../../components/AppContext'

const SellerLogin = () => {
    const {isSeller, setIsSeller, navigate} = useAppContext()
    cosnt [email, setEmail] = useState(" ")
    const [password, setPassword] = useState(" ");
  return (
    <div>
    
    </div>
  )
}

export default SellerLogin
