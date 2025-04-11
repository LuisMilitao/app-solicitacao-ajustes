const bcrypt = require('bcrypt');

bcrypt.hash('minhasenha123', 10).then(hash => {
    console.log('Hash gerado:', hash);
});
