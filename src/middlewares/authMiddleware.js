const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'segredo123';

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.usuario = decoded;
    next();
  });
};

module.exports = verificarToken;