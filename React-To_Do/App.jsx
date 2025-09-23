import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = { id: Date.now(), text: newTask.trim(), completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          background: "#fff",
          color: "#333",
          borderRadius: "16px",
          padding: "40px 30px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
          textAlign: "center",
          transition: "transform 0.3s"
        }}
      >
        <h1 style={{ marginBottom: "25px", color: "#2575fc" }}>To-Do List</h1>
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task"
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px 0 0 8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "16px"
            }}
          />
          <button
            onClick={addTask}
            style={{
              padding: "12px 20px",
              background: "#2575fc",
              border: "none",
              borderRadius: "0 8px 8px 0",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
              fontSize: "16px"
            }}
            onMouseOver={(e) => (e.target.style.background = "#6a11cb")}
            onMouseOut={(e) => (e.target.style.background = "#2575fc")}
          >
            Add
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                background: task.completed ? "#e0e0e0" : "#f9f9f9",
                padding: "12px 15px",
                marginBottom: "12px",
                borderRadius: "10px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "0.3s",
                cursor: "pointer"
              }}
            >
              <span
                onClick={() => toggleTask(task.id)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#888" : "#333",
                  flex: 1
                }}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  marginLeft: "10px",
                  background: "#ff4b5c",
                  border: "none",
                  color: "#fff",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => (e.target.style.background = "#ff2e3c")}
                onMouseOut={(e) => (e.target.style.background = "#ff4b5c")}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          Total tasks remaining: {tasks.filter((t) => !t.completed).length}
        </p>
      </div>
    </div>
  );
}

export default App;

