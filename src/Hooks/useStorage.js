import { useState, useEffect } from 'react';

const useStorage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, [tasks]);

  const saveTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (taskTitle, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.title === taskTitle ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskTitle) => {
    const updatedTasks = tasks.filter((task) => task.title !== taskTitle);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return {
    tasks,
    saveTask,
    editTask,
    deleteTask,
  };
};

export default useStorage;
