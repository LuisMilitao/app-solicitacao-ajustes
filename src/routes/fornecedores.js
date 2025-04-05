const express = require('express');
const router = express.Router();
const FornecedoresController = require('../controllers/fornecedoresController');

router.get('/', FornecedoresController.getAll);
router.post('/', FornecedoresController.create);
router.get('/:id', FornecedoresController.getById);
router.put('/:id', FornecedoresController.update);
router.delete('/:id', FornecedoresController.delete);

module.exports = router;