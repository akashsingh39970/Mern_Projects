import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})




    // Function to fetch products (dummy data for now)
    const fetchProducts = () => {
        setProducts(dummyProducts)
    }

    useEffect(() => {
        console.log("AppContextProvider mounted");
        fetchProducts();

    }, [])

    // Function to add item to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {

            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('Item added to cart successfully!');
    }

    //update cart items quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Cart updated successfully!');
    }

    //Remove item from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }

        }
        toast.success('Item removed from cart successfully!');
        setCartItems(cartData);


    }

    //Get total items in cart
    const getTotalItems = () => {
        let totalItmes = 0;
        for (const item in cartItems) {
           
            totalItmes += cartItems[item];
        }
        return totalItmes;
    }

    //Get Total Price of cart items
    const getTotalItemsPrice = () => {
        let totalPrice = 0;
        for (const item in cartItems) {
            // console.log(item);
            let itemInfo = products.find((product) => product._id === item);
            if (cartItems[item] > 0) {
                totalPrice += itemInfo.offerPrice * cartItems[item];
            }

        }
         return Math.floor(totalPrice * 100) / 100; // Round to 2 decimal places
    }

    // Function to navigate to a different page
    const value = {
        navigate, user, isSeller, setIsSeller, setUser, showUserLogin,
        setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart,
        cartItems, getTotalItems, getTotalItemsPrice, searchQuery, setSearchQuery
    }


    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}


export const useAppContext = () => {
    return useContext(AppContext)
}