const router = require('express').Router();
const cart = require('../Controllers/cartController');

router.get('/', cart.getCart);
router.post('/', cart.postCart);

module.exports = router;
