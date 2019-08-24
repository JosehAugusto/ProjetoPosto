const express = require('express');
const connectDB = require('./config/db')
const app = express();
var cron = require('node-cron');
 



// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.json({msg: 'Hello User'}));

// Rotas
app.use('/api/users', require('./routes/users'));
app.use('/api/postos', require('./routes/postos'));
app.use('/api/auth', require('./routes/auth'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Iniciado na porta ${PORT}`));