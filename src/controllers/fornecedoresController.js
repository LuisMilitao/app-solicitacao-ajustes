const Fornecedores = require('../models/fornecedoresModel');

const FornecedoresController = {
    getAll: (req, res) => {
        Fornecedores.getAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    create: (req, res) => {
        const { empresa, contatos, email, telefone } = req.body;
        Fornecedores.create(empresa, contatos, email, telefone, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({
                message: 'Fornecedor criado com sucesso',
                id: result.insertId,
            });
        });
    },
    getById: (req, res) => {
        const { id } = req.params;
        Fornecedores.getById(id, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }
            res.json(results[0]);
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const { empresa, contatos, email, telefone } = req.body;
        Fornecedores.update(id, empresa, contatos, email, telefone, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }
            res.json({ message: 'Fornecedor atualizado com sucesso' });
        });
    },
    delete: (req, res) => {
        const { id } = req.params;
        Fornecedores.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }
            res.json({ message: 'Fornecedor excluído com sucesso' });
        });
    },
};

module.exports = FornecedoresController;