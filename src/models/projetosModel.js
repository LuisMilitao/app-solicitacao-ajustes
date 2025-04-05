const db = require('../config/db');

const Projetos = {
    getAll: (callback) => {
        db.query('SELECT * FROM projetos', callback);
    },
    create: (nome, empresa_responsavel, callback) => {
        db.query(
            'INSERT INTO projetos (nome, empresa_responsavel) VALUES (?, ?)',
            [nome, empresa_responsavel],
            callback
        );
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM projetos WHERE id = ?', [id], callback);
    },
    update: (id, nome, empresa_responsavel, callback) => {
        db.query(
            'UPDATE projetos SET nome = ?, empresa_responsavel = ? WHERE id = ?',
            [nome, empresa_responsavel, id],
            callback
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM projetos WHERE id = ?', [id], callback);
    },
};

module.exports = Projetos;