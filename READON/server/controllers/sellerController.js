import jwt from 'jsonwebtoken';

// seller login: /api/seller/login
export const sellerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('sellerToken', token, {
                httpOnly: true,  // prevent js to access the cookie
                secure: process.env.NODE_ENV === 'production', // use secure cookie in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
                maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expry time   
            });

            return res.json({ success: true, message: 'Logged in successfully' });

        }
        else {
            return res.json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (error) {
            console.log(error.message);
            res.json({success: false, message: error.message});

    }

}

// check seller Authoriziation : /api/seller/is-auth
export const isSellerAuth = async (req, res) => { 
    try {
         return res.json({success: true})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

//logout seller: /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.json({ success: true, message: "Seller Logged out" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
