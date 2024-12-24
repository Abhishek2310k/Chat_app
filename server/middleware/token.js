import jwt from "jsonwebtoken";

export function tokenVerification (req,res,next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({error:true,message:"please sent the token"});
        }
        const verification = jwt.verify(token,process.env.SERVER_SECRET);
        if (verification) next();
        else {
            return res.status(400).json({error:true
                ,message:"token is not valid please login again"});
        }

    } catch (err) {
        return res.status(500).json({error:true,
            message:"omething wrong during token verificatin"});
    }
}