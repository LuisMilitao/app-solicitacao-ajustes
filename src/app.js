const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');

const formularioRoutes = require('./routes/formulario');
const fornecedoresRoutes = require('./routes/fornecedores');
const projetosRoutes = require('./routes/projetos');
const authRoutes = require('./routes/authRoutes');
const verificarToken = require('./middlewares/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// ✅ Correta configuração de CORS
const allowedOrigins = [
  'https://solicitacaoajustes.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Middlewares do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Rotas públicas e protegidas
app.use('/api/auth', authRoutes); // login e register
app.use('/api/formulario', verificarToken, formularioRoutes);
app.use('/api/fornecedores', verificarToken, fornecedoresRoutes);
app.use('/api/projetos', verificarToken, projetosRoutes);


// ✅ Inicialização
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}).on('error', (err) => {
  console.error('Erro ao iniciar o servidor:', err);
});
