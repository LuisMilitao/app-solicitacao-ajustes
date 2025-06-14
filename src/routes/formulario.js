const express = require('express');
const router = express.Router();
const FormularioController = require('../controllers/formularioController');

router.get('/', FormularioController.getAll);
router.post('/', FormularioController.create);
router.get('/:id', FormularioController.getById);
router.put('/:id', FormularioController.updateJson);         // JSON puro
const upload = require('../controllers/formularioController').upload;
router.put('/:id/midia', upload.single('midia'), FormularioController.updateMultipart);
router.delete('/:id', FormularioController.delete);

module.exports = router;
