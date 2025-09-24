import React, { useState } from 'react';
import { ListItem, ListItemText, Checkbox, Button, TextField, Box } from '@mui/material';
import axios from 'axios';

const TodoItem = ({ todo, setTodos, todos }) => {
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState(todo.task);
  const API_URL = 'https://todo-backend-1r6d.vercel.app';

  const markDone = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/edit/${id}`);
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.error('Error marking todo as done:', error);
    }
  };

  const updateTodo = async (id) => {
    if (!editTask.trim()) return;
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, { task: editTask });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
      setEditId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const startEditing = (id, task) => {
    setEditId(id);
    setEditTask(task);
  };

  return (
    <ListItem sx={{ borderBottom: '1px solid #e0e0e0' }}>
      {editId === todo._id ? (
        <Box sx={{ display: 'flex', width: '100%' }}>
          <TextField
            fullWidth
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateTodo(todo._id)}
            sx={{ mr: 1 }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => setEditId(null)}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <>
          <Checkbox
            checked={todo.done}
            onChange={() => markDone(todo._id)}
          />
          <ListItemText
            primary={todo.task}
            sx={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          />
          <Button
            variant="outlined"
            onClick={() => startEditing(todo._id, todo.task)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteTodo(todo._id)}
          >
            Delete
          </Button>
        </>
      )}
    </ListItem>
  );
};

export default TodoItem;