const db = require('../config/db');

const Fornecedores = {
    getAll: (callback) => {
        db.query('SELECT * FROM fornecedores', callback);
    },
    create: (empresa, contatos, email, telefone, callback) => {
        db.query(
            'INSERT INTO fornecedores (empresa, contatos, email, telefone) VALUES (?, ?, ?, ?)',
            [empresa, contatos, email, telefone],
            callback
        );
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM fornecedores WHERE id = ?', [id], callback);
    },
    update: (id, empresa, contatos, email, telefone, callback) => {
        db.query(
            'UPDATE fornecedores SET empresa = ?, contatos = ?, email = ?, telefone = ? WHERE id = ?',
            [empresa, contatos, email, telefone, id],
            callback
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM fornecedores WHERE id = ?', [id], callback);
    },
};

module.exports = Fornecedores;