const router = require("express").Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const authValidation = require('../middleware/validation');


router.post("/",authMiddleware.verifyToken, productController.product_create);
router.get("/",authValidation.validation, authMiddleware.verifyToken, productController.product_all);
router.get("/:productId",authMiddleware.verifyToken, productController.product_details);
router.put("/:productId",authMiddleware.verifyToken, productController.product_update);
router.delete("/:productId",authMiddleware.verifyToken, productController.product_delete);

module.exports = router;
