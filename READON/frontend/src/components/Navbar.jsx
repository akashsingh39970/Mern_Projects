import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { assets } from "../assets/assets";
import { useAppContext } from "./AppContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery } = useAppContext();

    const handleLogout = () => {
        setUser(null);
        setShowUserLogin(false);
        navigate("/"); // Redirect to home page after logout
        // Optionally, you can also redirect the user to the home page or login page
    };

    useEffect(()=>{
        if(searchQuery.length > 0){
            navigate('/products')
        }
    }, [searchQuery])

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24
         xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to="/">
                <img onClick={()=> setOpen(false)} className="h-9" src={assets.logos} alt="dummyLogoColored" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=> setSearchQuery(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                    <img src={assets.search_icon} alt="search" className=" w-4 h-4" />
                   
                </div>

                <div className="relative cursor-pointer">
                    <img onClick={()=>navigate("cart")} src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80"/>
                  
                    <button 
                    className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        3
                    </button>
                </div>

                {!user ? (<button onClick={(e) => {
                    setOpen(false);
                     setShowUserLogin(true);}}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition
                         text-white rounded-full">
                        Login   
                    </button>
                ) : (
                    <>
                    <div  className='relative cursor-pointer group'>
                        <img src={assets.profile_icon} alt="profile_icon" className="w-10" 
                         onClick={()=> navigate('myProfile')}/>
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-md 
                        rounded-lg w-48 text-sm text-gray-700">
                              
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={()=>navigate('myOrders')}>My Orders</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleLogout}>Logout</li>
                            
                        </ul>
                    
                    
                    </div>
                    </>
                    
                )}
            </div>

            <button onClick={() => (open ? setOpen(false) : setOpen(true))} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="menu" />
             
            </button>

            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <NavLink to="/" className="block">Home</NavLink>
                    <NavLink to="/products" className="block" onClick={() => setOpen(false)}>
                        Products
                    </NavLink>
                    {user && (
                        <NavLink to="/myOrders" className="block" onClick={() => setOpen(false)}>
                            My Orders
                        </NavLink>
                    )}
                    <NavLink to="/" className="block">
                        Contact
                    </NavLink>

                    {/* <a href="#" className="block">Home</a>  
                <a href="#" className="block">About</a>
                <a href="#" className="block">Contact</a> */}
                    {!user ? (
                        <button onClick={() => { setOpen(false); setShowUserLogin(true);}}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>
                    ) : (
                        <button onClick={handleLogout}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
