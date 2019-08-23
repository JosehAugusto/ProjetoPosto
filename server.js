const express = require('express');
const connectDB = require('./config/db')
const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.json({msg: 'Hello User'}));

// Rotas
app.use('/api/users', require('./routes/users'));
app.use('/api/postos', require('./routes/postos'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Iniciado na porta ${PORT}`));