import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";


// @desc Registrar usuarios
// @route POST /api/v1/users/register
// @access Private/Admin

export const registerUserController = asyncHandler(async(req, res) =>{
    const {fullname, email, password} = req.body
    //Verificar se o usuario existe
    const userExists = await User.findOne({email});

    if(userExists){
        //throw
        throw new Error("User already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //criar o usuario
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    });
    res.status(201).json({
        status: 'success',
        message: 'User Registred Successfully',
        data: user,
    })

});

// @desc Logar usuario
// @route POST /api/v1/users/login
// @access Public

export const loginUserController = asyncHandler(async(req,res) => {
    const {email, password} = req.body;

    // Encontrar o usuario no BD usando o email

    const userFound = await User.findOne({
        email,
    });
    if(userFound && await bcrypt.compare(password, userFound.password)){
        res.json({
            status: 'Success',
            message: 'User logged in successfully',
            userFound,
            token: generateToken(userFound?._id),
        })
    }else{
        throw new Error('Invalid Login Credentials')
    }
});

// @desc Deletar usuario
// @route POST /api/v1/users/delete
// @access Public

export const deleteUserController = async(req,res) => {
    const { email } = req.body;

    // Encontrar o usuario no BD usando o email

    const userFound = await User.findOne({
        email,
    });
    if(!userFound){
        return res.json({
            msg: 'Invalid details'
        })
    }
    const user = await User.deleteOne({
        email,
    });
    res.status(201).json({
        status: 'success',
        message: 'User Deleted Successfully',
        data: user,
    })
};

// @desc Retornar perfil usuario
// @route POST /api/v1/users/profile
// @access Public

export const getUserProfileController = asyncHandler(async(req,res)=>{
    const token = getTokenFromHeader(req);
    //verificando token
    const verified = verifyToken(token);

    res.json({
        msg: ' Welcome to profile page'
    })
})
