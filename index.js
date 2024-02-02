require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./components/todoRoutes');

const app = express();
const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', () => {
	console.log('Подключено к MongoDB');
});

app.use(express.json());
app.use(cors());
app.use('/todos', todoRoutes);

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
