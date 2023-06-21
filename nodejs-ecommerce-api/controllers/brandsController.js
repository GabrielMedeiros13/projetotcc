import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";


// @desc Cria uma nova marca
// @route POST /api/v1/brands
// @access Private/Admin

export const createBrandController = asyncHandler(async(req,res)=>{
    const { name } = req.body;

    //checando se a marca já existe
    const brandFound = await Brand.findOne({name});
    if(brandFound){
        throw new Error('Brand already exists.')
    }

    //criando
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: "success",
        message: "Brand create succesfully",
        brand,
    })
});


// @desc retorna todas as marcas
// @route POST /api/v1/brands
// @access Private/Admin

export const getAllBrandsController = asyncHandler(async(req, res)=>{
    const brands = await Brand.find();
    
    res.json({
        status: "success",
        message: "Brands fetched succesfully",
        brands,
    });
});

// @desc retorna uma única marca
// @route POST /api/v1/brands/:id
// @access Private/Admin

export const getSingleBrandController = asyncHandler(async(req, res)=>{
    const brand = await Brand.findById(req.params.id);
    
    res.json({
        status: "success",
        message: "Brand fetched succesfully",
        brand,
    });
});

// @desc atualizar marca
// @route PUT /api/v1/brands/:id
// @access Private/Admin

export const updateBrandController = asyncHandler(async(req, res)=>{
    const { name } = req.body;

    //update

    const brand = await Brand.findByIdAndUpdate(
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
        message: "Brand updated succesfully",
        brand,
    });
});

export const deleteBrandController = asyncHandler(async(req, res)=>{
    await Brand.findByIdAndDelete(req.params.id);

    res.json({
        status: "success",
        message: "Brand deleted succesfully",
    });
});
