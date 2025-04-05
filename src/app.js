const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const formularioRoutes = require('./routes/formulario');
const fornecedoresRoutes = require('./routes/fornecedores');
const projetosRoutes = require('./routes/projetos');

if (!process.env.DB_HOST) {
    throw new Error('Variável de ambiente DB_HOST não está definida.');
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/formulario', formularioRoutes);
app.use('/api/fornecedores', fornecedoresRoutes);
app.use('/api/projetos', projetosRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}).on('error', (err) => {
    console.error('Erro ao iniciar o servidor:', err);
});

