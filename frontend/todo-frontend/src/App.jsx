import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const API_URL = 'https://todo-backend-1r6d.vercel.app';

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/get`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      const response = await axios.post(`${API_URL}/add`, { task });
      setTodos([...todos, response.data]);
      setTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Todo App
      </Typography>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          fullWidth
          label="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          variant="outlined"
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTodo}
        >
          Add
        </Button>
      </Box>
      <TodoList todos={todos} setTodos={setTodos} />
    </Container>
  );
};

export default App;