const Projetos = require('../models/projetosModel');

const ProjetosController = {
    getAll: (req, res) => {
        Projetos.getAll((err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    },

    create: (req, res) => {
        const { nome, empresa_id } = req.body;
        Projetos.create(nome, empresa_id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ message: 'Projeto criado com sucesso', id: result.insertId });
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        Projetos.getById(id, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) return res.status(404).json({ message: 'Projeto não encontrado' });
            res.json(results[0]);
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { nome, empresa_id } = req.body;
        Projetos.update(id, nome, empresa_id, (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Projeto não encontrado' });
            res.json({ message: 'Projeto atualizado com sucesso' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Projetos.delete(id, (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Projeto não encontrado' });
            res.json({ message: 'Projeto excluído com sucesso' });
        });
    },
};

module.exports = ProjetosController;
