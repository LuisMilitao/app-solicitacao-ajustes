const Formulario = require('../models/formularioModel');
const multer = require('multer');
const path = require('path');

// Configuração do Multer para uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const FormularioController = {
    getAll: (req, res) => {
        Formulario.getAll((err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    },

    create: (req, res) => {
        upload.single('midia')(req, res, (err) => {
            if (err) return res.status(500).send(err);

            const {
                numero_chamado, nome_projeto, versao, empresa_responsavel, contatos,
                resumo_ajuste, ambiente, tipo_usuario, rota_para_tela, o_que_esta_acontecendo,
                justificacao, solucao_a_ser_tomada, sugestao, resolvido_por
            } = req.body;

            const midia_url = req.file ? `/uploads/${req.file.filename}` : null;

            Formulario.create(
                numero_chamado, nome_projeto, versao, empresa_responsavel, contatos,
                resumo_ajuste, ambiente, tipo_usuario, rota_para_tela, o_que_esta_acontecendo,
                midia_url, justificacao, solucao_a_ser_tomada, sugestao, resolvido_por,
                (err, result) => {
                    if (err) return res.status(500).send(err);
                    res.status(201).json({ message: 'Formulário criado com sucesso', id: result.insertId });
                }
            );
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        Formulario.getById(id, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) return res.status(404).json({ message: 'Formulário não encontrado' });
            res.json(results[0]);
        });
    },

    update: (req, res) => {
        upload.single('midia')(req, res, (err) => {
            if (err) return res.status(500).send(err);

            const { id } = req.params;
            const {
                numero_chamado, nome_projeto, versao, empresa_responsavel, contatos,
                resumo_ajuste, ambiente, tipo_usuario, rota_para_tela, o_que_esta_acontecendo,
                justificacao, solucao_a_ser_tomada, sugestao, resolvido_por
            } = req.body;

            const midia_url = req.file ? `/uploads/${req.file.filename}` : null;

            Formulario.update(
                id, numero_chamado, nome_projeto, versao, empresa_responsavel, contatos,
                resumo_ajuste, ambiente, tipo_usuario, rota_para_tela, o_que_esta_acontecendo,
                midia_url, justificacao, solucao_a_ser_tomada, sugestao, resolvido_por,
                (err, result) => {
                    if (err) return res.status(500).send(err);
                    if (result.affectedRows === 0) return res.status(404).json({ message: 'Formulário não encontrado' });
                    res.json({ message: 'Formulário atualizado com sucesso' });
                }
            );
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Formulario.delete(id, (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Formulário não encontrado' });
            res.json({ message: 'Formulário excluído com sucesso' });
        });
    },
};

module.exports = FormularioController;
