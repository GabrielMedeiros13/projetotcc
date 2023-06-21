import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";
import Color from "../model/Color.js";


// @desc Cria uma nova cor
// @route POST /api/v1/colors
// @access Private/Admin

export const createColorController = asyncHandler(async(req,res)=>{
    const { name } = req.body;

    //checando se a cor já existe
    const colorFound = await Color.findOne({name});
    if(colorFound){
        throw new Error('Color already exists.')
    }

    //criando
    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: "success",
        message: "Color create succesfully",
        color,
    })
});


// @desc retorna todas as cores
// @route POST /api/v1/colors
// @access Private/Admin

export const getAllColorsController = asyncHandler(async(req, res)=>{
    const colors = await Color.find();
    
    res.json({
        status: "success",
        message: "Colors fetched succesfully",
        colors,
    });
});

// @desc retorna uma única cor
// @route POST /api/v1/colors/:id
// @access Private/Admin

export const getSingleColorController = asyncHandler(async(req, res)=>{
    const color = await Color.findById(req.params.id);
    
    res.json({
        status: "success",
        message: "Color fetched succesfully",
        color,
    });
});

// @desc atualizar uma cor
// @route PUT /api/v1/colors/:id
// @access Private/Admin

export const updateColorController = asyncHandler(async(req, res)=>{
    const { name } = req.body;

    //update

    const color = await Color.findByIdAndUpdate(
        req.params.id,
        {
            name,
        },
        {
            new: true,
        }
    );
    res.json({
        status: "success",
        message: "Color updated succesfully",
        color,
    });
});

export const deleteColorController = asyncHandler(async(req, res)=>{
    await Color.findByIdAndDelete(req.params.id);

    res.json({
        status: "success",
        message: "Color deleted succesfully",
    });
});
