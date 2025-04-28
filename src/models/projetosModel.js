const db = require('../config/db');

const Projetos = {
    getByName: (nome, callback) => {
        const query = `
            SELECT p.*, f.contatos 
            FROM projetos p
            JOIN fornecedores f ON p.empresa_id = f.id
            WHERE p.nome = ?
        `;
        db.query(query, [nome], callback);
    },
    getAll: (callback) => {
        const query = `
            SELECT projetos.id, projetos.nome, fornecedores.empresa AS empresa
            FROM projetos
            LEFT JOIN fornecedores ON projetos.empresa_id = fornecedores.id
        `;
        db.query(query, callback);
    },
    getById: (id, callback) => {
        const query = `
            SELECT 
                projetos.id, 
                projetos.nome AS nome, 
                projetos.empresa_id,
                fornecedores.empresa AS empresa
            FROM projetos
            LEFT JOIN fornecedores ON projetos.empresa_id = fornecedores.id
            WHERE projetos.id = ?
        `;
        db.query(query, [id], callback);
    },

    create: (nome, empresa_id, callback) => {
        const query = 'INSERT INTO projetos (nome, empresa_id) VALUES (?, ?)';
        db.query(query, [nome, empresa_id], callback);
    },

    update: (id, nome, empresa_id, callback) => {
        const query = 'UPDATE projetos SET nome = ?, empresa_id = ? WHERE id = ?';
        db.query(query, [nome, empresa_id, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM projetos WHERE id = ?';
        db.query(query, [id], callback);
    }
};
module.exports = Projetos;