const fs = require('fs');
const path = require('path');

app.get('/check-uploads', (req, res) => {
  const uploadsPath = path.join(__dirname, 'uploads');
  fs.access(uploadsPath, fs.constants.W_OK, (err) => {
    if (err) {
      // Tenta criar se não existe ou não é gravável
      try {
        fs.mkdirSync(uploadsPath, { recursive: true });
        return res.send('✅ Pasta criada ou agora acessível.');
      } catch (e) {
        return res.status(500).send('❌ Erro ao criar/acessar pasta: ' + e.message);
      }
    } else {
      return res.send('✅ Pasta já existe e tem permissão de escrita.');
    }
  });
});
