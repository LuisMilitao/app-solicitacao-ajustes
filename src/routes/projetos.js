const express = require('express');
const router = express.Router();
const ProjetosController = require('../controllers/projetosController');

router.get('/', ProjetosController.getAll);
router.post('/', ProjetosController.create);
router.get('/:id', ProjetosController.getById);
router.put('/:id', ProjetosController.update);
router.delete('/:id', ProjetosController.delete);

module.exports = router;