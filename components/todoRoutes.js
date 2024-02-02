const express = require('express');
const Todo = require('./todoModel');

const router = express.Router();

router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
	try {
		const todos = await Todo.find();
		res.json(todos);
	} catch (error) {
		res.status(500).json({ error: 'Ошибка сервера' });
	}
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
	try {
		const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
		res.json(deletedTodo);
	} catch (error) {
		res.status(500).json({ error: 'Ошибка сервера' });
	}
});

module.exports = router;
