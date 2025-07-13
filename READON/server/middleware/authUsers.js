    import jwt from 'jsonwebtoken'; 

    const authUser = async (req, res, next) =>{
        const {token} = req.cookies;

        if(!token){
            
            return res.status(401).json({ success: false, message: 'Not Authorized' });    }
             console.log("🔥 Auth middleware hit");

        try{
           
            const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
            
                if(tokenDecode.id){
                    req.user = tokenDecode.id;   
                   

                }
                else{
                return res.status(403).json({ success: false, message: 'Invalid Token' });            }
                
                next();
            
        }
        catch (error){  
                return res.status(403).json({ success: false, message: 'Invalid or expired token' });    }

    }

    export default authUser;