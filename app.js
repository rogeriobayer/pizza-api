require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const pizzaRoutes = require('./src/routes/pizzaRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const docsRoutes = require('./src/routes/docsRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);
app.use('/docs', docsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));