const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Добавление cors

const app = express();
const port = 4000;

const mongoURI =
	'mongodb+srv://nyazovvv:Qwe12345@cluster0.cyrgzg5.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', () => {
	console.log('Подключено к MongoDB');
});

const todoSchema = new mongoose.Schema({
	todo: {
		type: String,
		required: true // Поле todo обязательно для заполнения
	},
	status: {
		type: Boolean,
		default: false // Значение по умолчанию для поля status
	}
});

const Todo = mongoose.model('Todo', todoSchema);

app.use(express.json());
app.use(cors()); // Использование cors

// Создание новой задачи
app.post('/todos', async (req, res) => {
	try {
		const newTodo = new Todo({
			todo: req.body.todo,
			status: req.body.status
		});
		const savedTodo = await newTodo.save();
		res.json(savedTodo);
	} catch (error) {
		res.status(500).json({ error: 'Ошибка сервера' });
	}
});

// Получение списка задач
app.get('/todos', async (req, res) => {
	try {
		const todos = await Todo.find();
		res.json(todos);
	} catch (error) {
		res.status(500).json({ error: 'Ошибка сервера' });
	}
});

// Обновление задачи
app.put('/todos/:id', async (req, res) => {
	try {
		const updatedTodo = await Todo.findByIdAndUpdate(
			req.params.id,
			{ todo: req.body.todo, status: req.body.status },
			{ new: true }
		);
		res.json(updatedTodo);
	} catch (error) {
		res.status(500).json({ error: 'Ошибка сервера' });
	}
});

// Удаление задачи
app.delete('/todos/:id', async (req, res) => {
	try {
		const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
		res.json(deletedTodo);
	} catch (error) {
		res.status(500).json({ error: 'Ошибка сервера' });
	}
});

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
