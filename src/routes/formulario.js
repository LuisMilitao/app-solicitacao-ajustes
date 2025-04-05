const express = require('express');
const router = express.Router();
const FormularioController = require('../controllers/formularioController');

router.get('/', FormularioController.getAll);
router.post('/', FormularioController.create);
router.get('/:id', FormularioController.getById);
router.put('/:id', FormularioController.update);
router.delete('/:id', FormularioController.delete);

module.exports = router;