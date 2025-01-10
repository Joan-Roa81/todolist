const Task = require('../models/task');

// Obtener todas las tareas
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
  try {
    const { titulo, estado } = req.body;
    console.log('Datos recibidos para crear tarea:', req.body)
    console.log(titulo)
    console.log(estado)
    const newTask = await Task.create({ titulo, estado });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { titulo, estado } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.titulo = titulo || task.titulo;
    task.estado = estado !== undefined ? estado : task.estado;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
