import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";


// @desc Criar um novo produto
// @route POST /api/v1/products
// @access Private/Admin
export const createProductController = asyncHandler(async(req, res)=>{
    const {name, description, category, sizes, colors, user, price, totalQty, brand } = req.body;

    //Produto já existe ?
    const productExists = await Product.findOne({ name });
    if(productExists){
        throw new Error("Product already exists.");
    }

    //Criando o produto
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
        brand,
    });
    // push the product into category
    //send a response
    res.json({
        status: "success",
        message: "Product created successfully",
        product,
    });
});

// @desc Retorna todos os produtos 
// @route POST /api/v1/products
// @access Publico

export const getProductsController = asyncHandler(async(req,res)=>{
    //query
    let productQuery = Product.find();

    //procurar o produto por nome
    if(req.query.name){
        productQuery = productQuery.find({
            name: {$regex: req.query.name, $options:'i'},
        });
    }

    //filtrar o produto por marca("brand") /products?brand=nike
    if(req.query.brand){
        productQuery = productQuery.find({
            brand: {$regex: req.query.brand, $options:'i'},
        });
    }

    //filtrar o produto por categoria
    if(req.query.category){
        productQuery = productQuery.find({
            category: {$regex: req.query.category, $options:'i'},
        });
    }

    //filtrar o produto por color
    if(req.query.color){
        productQuery = productQuery.find({
            colors: {$regex: req.query.color, $options:'i'},
        });
    }

    //filtrar o produto por size
    if(req.query.size){
        productQuery = productQuery.find({
            sizes: {$regex: req.query.size, $options:'i'},
        });
    }

    //filtrando por price range
    if(req.query.price){
        const priceRange = req.query.price.split('-');
        //gte: greater or equal
        //lte: less than or equal
        productQuery = productQuery.find({
            price: {$gte: priceRange[0], $lte: priceRange[1]},
            // vamos supor que vou pesquisar um preco entre 100-400
            // estamos armazenando o 100 no gte(primeiro index)
            // e o 400 no lte com index 1
        });
    }

    //paginação
    //page - Se o usuario fornecer uma pagina, usa ela, do contrario usar a pagina 1
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;

    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

    const startIndex = (page -1) * limit;

    const endIndex = page * limit;

    const total = await Product.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limit);

    //pagination results
    const pagination = {}
    if(endIndex< total){
        pagination.next = {
            page: page + 1,
            limit,
        };
    }

    if(startIndex>0){
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    // await the query
    const products = await productQuery;

    res.json({
        status: "success",
        total,
        results: products.length,
        pagination,
        message: 'Product fetched successfully',
        products,
    });
});

// @desc Retorna um único produto
// @route POST /api/v1/products/:id
// @access Publico

export const getProductController = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        throw new Error('Product not found')
    }else{
        res.json({
            status: 'success',
            message: 'Product fetched successfully',
            product,
        })
    }
});

// @desc Atualiza um produto
// @route POST /api/v1/products/:id/update
// @access Private/Admin

export const updateProductController = asyncHandler(async(req,res)=>{
    const {
        name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand,
    } = req.body;

    //update
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand,
    },
    {
        new: true,
    });
    res.json({
        status: 'success',
        message: "Product updated successfully",
        product,
    });
});

// @desc ADeleta um produto
// @route POST /api/v1/products/:id/delete
// @access Private/Admin


export const deleteProductController = asyncHandler(async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: 'Product deleted successfully',
    });

});