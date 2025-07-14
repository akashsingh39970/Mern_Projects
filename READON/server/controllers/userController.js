import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register User using .api/user/register

export const register = async (req, res) =>{
    try {
        const {name, email, password} = req.body; //This line extracts the user's form data from the HTTP request.
        if(!name || !email || !password ){
            return res.json({success: false, message: 'Missing Details'})
        }
        const existingUser = await User.findOne({email})  //This looks for a user in MongoDB with the email alice@example.com.  // 

        if(existingUser)
             return res.json({success: false, message: 'User already existed'}) //If found → it sends back: "User already exists".



        //If not found → continues to registration.

        const hassedPassword = await bcrypt.hash(password, 10) // hashes the password using 10 salt rounds/ sal rounds is the radnaom data importing in your password for more security

        const user = await User.create({name, email, password: hassedPassword}) // store user in MongoDB 
        // this create mongodb data like {
        //   "_id": "507f191e810c19729de860ea",
        //   "name": "Alice",
        //   "email": "alice@example.com",
        //   "password": "$2a$10$........."
        // }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        // JWT = JSON Web Token, like a digital key to identify the user.
        // It encodes the user’s ID.
        // JWT_SECRET is a secret used to "sign" the token so it can't be faked.
        // Expires in 7 days.

        res.cookie('token', token, {
            httpOnly: true,  // prevent js to access the cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expry time   
        })
        
             return res.json({success: true, user: { email: user.email, name: user.name}})


    }
    catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message });
    }
}


//Login user :/api/user/login
export const login = async (req, res) =>{
    try{
        const {email, password} = req.body;
        
        //checking credentials
        if(!email || !password)
            return res.json({success: false, message: 'Email and Password are required'});

        const user = await User.findOne({email});
        if(!user){
            return res.json({success: false, message: "Invalid Eamilid or Password!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message:"Invalid emalid or Password!"})
        }

        //genreateing token if credentials are valid
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
           res.cookie('token', token, {
            httpOnly: true,  // prevent js to access the cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expry time   
        })
        
             return res.json({success: true, user: { email: user.email, name: user.name}})

    }
    catch (error){

         console.log(error.message);
        res.json({success: false, message: error.message });
    
    }
}


// check Authoriziation : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
       

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


//logout User: /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.json({ success: true, message: "Logged out" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};