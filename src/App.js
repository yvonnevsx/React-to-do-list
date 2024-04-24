import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  // Function to add a new task to the list
  function addTask() {
    if (newTask.trim() !== "") {
      const newTaskItem = { id: Date.now(), text: newTask, completed: false };
      setTasks([...tasks, newTaskItem]);
      setNewTask("");
    }
  }

  // Function to toggle the completion status of a task
  function toggleCompletion(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Function to remove a task from the list
  function removeTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  // Filter the tasks based on the selected filter option
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>To Do List</h1>
      {/* Input field for adding a new task */}
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add a new task..."
      />
      {/* Button to add a new task */}
      <button onClick={addTask}>Add</button>
      {/* Display the list of tasks */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {/* complete status */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            {/* Display the task text */}
            {task.text}
            {/* Button to remove a task */}
            <span className="removeButton" onClick={() => removeTask(task.id)}>
              x
            </span>
          </li>
        ))}
      </ul>
      {/* Filter buttons for displaying tasks based on completion status */}
      <div>
        Filter:
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
    </div>
  );
}

// Export the component as the default export
export default App;
1
