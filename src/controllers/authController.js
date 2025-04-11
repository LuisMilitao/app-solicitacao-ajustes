const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET || 'segredo123';

exports.login = (req, res) => {
  const { usuario, senha } = req.body;

  db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Erro interno' });
    if (results.length === 0) return res.status(401).json({ message: 'Usuário não encontrado' });

    const usuarioEncontrado = results[0];
    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);

    if (!senhaValida) return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario }, secret, { expiresIn: '8h' });

    res.json({ token });
  });
};

exports.registrar = async (req, res) => {
  const { usuario, senha } = req.body;

  const hash = await bcrypt.hash(senha, 10);

  db.query('INSERT INTO usuarios (usuario, senha) VALUES (?, ?)', [usuario, hash], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erro ao registrar' });
    res.json({ message: 'Usuário registrado com sucesso' });
  });
};
