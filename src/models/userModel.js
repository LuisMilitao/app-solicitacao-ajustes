const Usuario = {
  findByUsername: (usuario, callback) => {
    db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], callback);
  }
};

module.exports = Usuario;
