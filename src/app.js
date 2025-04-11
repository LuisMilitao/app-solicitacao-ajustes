const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const formularioRoutes = require('./routes/formulario');
const fornecedoresRoutes = require('./routes/fornecedores');
const projetosRoutes = require('./routes/projetos');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const authRoutes = require('./routes/authRoutes');


// Login sem proteção
router.post('/auth/login', authController.login);

// Protegidas:
router.use('/formulario', verificarToken, require('./formularioRoutes'));
router.use('/fornecedores', verificarToken, require('./fornecedoresRoutes'));
router.use('/projetos', verificarToken, require('./projetosRoutes'));
router.post('/auth/login', authController.login);

module.exports = router;


if (!process.env.DB_HOST) {
    throw new Error('Variável de ambiente DB_HOST não está definida.');
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/formulario', verificarToken, require('./routes/formulario'));
app.use('/api/fornecedores', verificarToken, require('./routes/fornecedores'));
app.use('/api/projetos', verificarToken, require('./routes/projetos'));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}).on('error', (err) => {
    console.error('Erro ao iniciar o servidor:', err);
});

