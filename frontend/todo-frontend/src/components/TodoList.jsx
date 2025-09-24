import React from 'react';
import { List } from '@mui/material';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} setTodos={setTodos} todos={todos} />
      ))}
    </List>
  );
};

export default TodoList;