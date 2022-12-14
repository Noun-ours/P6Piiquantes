const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const like = require('../controllers/like');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/', saucesCtrl.getAllSauce);
router.post('/:id/like', auth, like.likeSauce);

module.exports = router;