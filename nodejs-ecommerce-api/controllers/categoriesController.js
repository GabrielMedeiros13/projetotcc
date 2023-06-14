import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";

// @desc Cria uma nova categoria
// @route POST /api/v1/categories
// @access Private/Admin

export const createCategoryController = asyncHandler(async(req,res)=>{
    const { name } = req.body;

    //checando se a categoria já existe
    const categoryFound = await Category.findOne({name});
    if(categoryFound){
        throw new Error('Category already exists.')
    }

    //criando
    const category = await Category.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: "success",
        message: "Category create succesfully",
        category,
    })
});


// @desc retorna todas as categorias
// @route POST /api/v1/categories
// @access Private/Admin

export const getAllCategoriesController = asyncHandler(async(req, res)=>{
    const categories = await Category.find();
    
    res.json({
        status: "success",
        message: "Categories fetched succesfully",
        categories,
    });
});

// @desc retorna uma única categoria
// @route POST /api/v1/categories
// @access Private/Admin

export const getSingleCategoriesController = asyncHandler(async(req, res)=>{
    const category = await Category.findById(req.params.id);
    
    res.json({
        status: "success",
        message: "Category fetched succesfully",
        category,
    });
});

// @desc atualizar categoria
// @route PUT /api/v1/categories
// @access Private/Admin

export const updateCategoryController = asyncHandler(async(req, res)=>{
    const { name } = req.body;

    //update

    const category = await Category.findByIdAndUpdate(
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
        message: "Category updated succesfully",
        category,
    });
});

export const deleteCategoryController = asyncHandler(async(req, res)=>{
    await Category.findByIdAndDelete(req.params.id);

    res.json({
        status: "success",
        message: "Category deleted succesfully",
    });
});
