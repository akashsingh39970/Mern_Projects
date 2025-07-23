import User from "../models/users.js";


//update user cartdata: /api/cart/update
export const updateCart = async (req, res) =>{
    try {
        const { userId, cartData } = req.body;
        await User.findByIdAndUpdate(userId, { cartItems: cartData });
        res.json({ success: true, message: 'Cart updated' });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}