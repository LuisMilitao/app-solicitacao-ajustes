const db = require('../config/db');

const Formulario = {
    getAll: (callback) => {
        db.query('SELECT * FROM formulario', callback);
    },
    create: (
        numero_chamado, nome_projeto, versao, empresa_responsavel, contatos,
        resumo_ajuste, ambiente, tipo_usuario, rota_para_tela, o_que_esta_acontecendo,
        midia_url, justificacao, solucao_a_ser_tomada, sugestao, resolvido_por, callback
    ) => {
        db.query(
            'INSERT INTO formulario (numero_chamado, nome_projeto, versao, empresa_responsavel, contatos, resumo_ajuste, ambiente, tipo_usuario, rota_para_tela, o_que_esta_acontecendo, midia_url, justificacao, solucao_a_ser_tomada, sugestao, resolvido_por) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                numero_chamado, nome_projeto, versao, empresa_responsavel, contatos,
                resumo_ajuste, ambiente, tipo_usuario, rota_para_tela, o_que_esta_acontecendo,
                midia_url, justificacao, solucao_a_ser_tomada, sugestao, resolvido_por
            ],
            callback
        );
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM formulario WHERE id = ?', [id], callback);
    },
    update: (
        id, numero_chamado, nome_projeto, versao, empresa_responsavel, contatos,
        resumo_ajuste, ambiente, tipo_usuario, rota_para_tela, o_que_esta_acontecendo,
        midia_url, justificacao, solucao_a_ser_tomada, sugestao, resolvido_por, callback
    ) => {
        db.query(
            'UPDATE formulario SET numero_chamado = ?, nome_projeto = ?, versao = ?, empresa_responsavel = ?, contatos = ?, resumo_ajuste = ?, ambiente = ?, tipo_usuario = ?, rota_para_tela = ?, o_que_esta_acontecendo = ?, midia_url = ?, justificacao = ?, solucao_a_ser_tomada = ?, sugestao = ?, resolvido_por = ? WHERE id = ?',
            [
                numero_chamado, nome_projeto, versao, empresa_responsavel, contatos,
                resumo_ajuste, ambiente, tipo_usuario, rota_para_tela, o_que_esta_acontecendo,
                midia_url, justificacao, solucao_a_ser_tomada, sugestao, resolvido_por, id
            ],
            callback
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM formulario WHERE id = ?', [id], callback);
    },
};

module.exports = Formulario;