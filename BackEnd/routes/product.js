const express = require('express');
const { getProducts , newProduct, getSingleProduct, updateProduct, deleteProduct ,getProductsByCategory ,updateProductBidPrice} = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser} = require('../middleware/authenticate');


router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct);
router.route('/product/:id').get(getSingleProduct)
router.route('/product/:id').put(updateProduct)
router.route('/product/:id').delete(deleteProduct)
router.route('/product/:id').get(getProductsByCategory)
router.route('/product/:productId/bid').put(updateProductBidPrice);
module.exports = router;