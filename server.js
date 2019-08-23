const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({msg: 'Hello User'}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Iniciado na porta ${PORT}`));