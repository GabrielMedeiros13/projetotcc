import asyncHandler from "express-async-handler"
import Review from "../model/Review.js";
import Product from "../model/Product.js";

// @desc Cria uma nova review
// @route POST /api/v1/reviews
// @access Private/Admin

export const createReviewController = asyncHandler(async(req, res)=>{
    const {product, message, rating} = req.body;
    // Achar o produto que queremos fazer um review
    const { productID } = req.params;
    const productFound = await Product.findById(productID).populate('reviews');

    if(!productFound){
        throw new Error('Product not found');
    }

    // Verificando se o usuario já fez um review desse produto
    const hasReviewed = productFound?.reviews?.find((review)=>{
        return review?.user?.toString() === req?.userAuthId?.toString();
    });
    if(hasReviewed){
        throw new Error('You already reviewed this product ');
    }
    //Criando o review
    const review = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user: req.userAuthId,
    });
    //Push review into productFound
    productFound.reviews.push(review?._id);

    //resave
    await productFound.save();
    res.status(201).json({
        success: true,
        message: "Review created successfully",
    });
});