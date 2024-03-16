const Product =  require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');

//get products 
exports.getProducts = async(req,res,next)=>{
    const resPerPage = 10;
    const apiFeatures=new APIFeatures(Product.find(),req.query).search().filter().paginate(resPerPage);
    const products =await apiFeatures.query;
    res.status(200).json({
        success : true,
        count: products.length,
        products
    })
}
//create product
exports.newProduct = catchAsyncError(async(req,res,next) =>{
    //req.body.user = req.user.id;
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})


//get single product
exports.getSingleProduct = async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler('product not found', 400));

    }
    res.status(201).json({
        success:true,
        product
    })
}


//update product
exports.updateProduct = async(req,res,next) =>{
    const product = await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(404).json({
            success:false,
            message:"Product not found"
        });

    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
  });
  

    res.status(200).json({
        success :true,
        product
    })
}


//delete product
exports.deleteProduct =async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(404).json({
            success:false,
            message:"Product not found"
        });

    }
    await product.deleteOne();

    res.status(200).json({
        success : true,
        message: "deleted successfully"
    })
    
}

// Get products by category
exports.getProductsByCategory = async (req, res, next) => {
    try {
      const { category } = req.query;
      let products;
  
      if (category) {
        products = await Product.find({ category });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json({
        success: true,
        count: products.length,
        products
      });
    } catch (error) {
      next(error);
    }
  };
  


//Update product bid price
exports.updateProductBidPrice = catchAsyncError(async (req, res, next) => {
  const { productId } = req.params;
  const { bidPrice } = req.body;

  // Find the product by its ID
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Check if the bid price is greater than the current price
  if (bidPrice <= product.price) {
    return next(new ErrorHandler('Bid price must be greater than the current price', 400));
  }

  // Update the product price with the new bid price
  product.price = bidPrice;
  await product.save();

  res.status(200).json({
    success: true,
    message: 'Bid price updated successfully',
    product: product,
  });
});