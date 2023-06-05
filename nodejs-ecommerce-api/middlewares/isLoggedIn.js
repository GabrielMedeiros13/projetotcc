import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) =>{
    // Pegando o token do header
    const token = getTokenFromHeader(req);
    //Verificando o token
    const decodedUser = verifyToken(token);
    
    if(!decodedUser){
        throw new Error('Token expired/invalid. Plase try again.')
    }else{
        //Salvando o usuario no req obj
        req.userAuthId = decodedUser?.id;
        next();
    }
    
}