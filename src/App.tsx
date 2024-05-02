import React, { useEffect, useState } from "react";
import Form from "./Components/Form";
import { FormData, Task } from "./interfaces/FormInterfaces";
import TaskTable from "./Components/TaskTable";
import "./App.css";

function App() {
  // GET TASKS FROM DB

  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/all`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        throw new Error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // POST TO DB
  const handleSubmit = async (data: FormData) => {
    // kad veiktu vanilla fetchas, butina naudoti async funkcija
    const response = await fetch(`http://localhost:3000/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      fetchTasks();
    }
    if (!response.ok) {
      const message = await response.text();
      console.error(`Failed to create task: `, message);
    } else {
      console.log("Task added sucessfully");
      const result = await response.json();
      console.log(result);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <TaskTable tasks={tasks} fetchTasks={fetchTasks} />
    </>
  );
}

export default App;
