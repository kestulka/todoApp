import { useEffect, useState } from "react";
import Form from "./Components/Form";
import TaskTable from "./Components/TaskTable";
import { FormData, Task, CategorizedTasks } from "./interfaces/FormInterfaces";
import "../src/Styles/main.css";

function App() {
  const [tasks, setTasks] = useState<CategorizedTasks>({
    pending: [],
    completed: [],
    canceled: [],
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/all`);
      if (response.ok) {
        const data = (await response.json()) as Task[];
        const categorizedTasks: CategorizedTasks = {
          pending: [],
          completed: [],
          canceled: [],
        };
        data.forEach((task) => {
          if (task.status in categorizedTasks) {
            // This check ensures you're only accessing known properties
            categorizedTasks[
              task.status.toLowerCase() as keyof CategorizedTasks
            ].push(task);
          }
        });
        setTasks(categorizedTasks);
      } else {
        const errMsg = await response.text();
        throw new Error(`Failed to fetch tasks: ${errMsg}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
    }
  };

  const handleSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(`Failed to create task: ${errMsg}`);
      }
      console.log("Task added successfully");
      await fetchTasks();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <div style={{ display: "inline-flex" }}>
        <TaskTable
          status="Pending"
          tasks={tasks.pending}
          fetchTasks={fetchTasks}
        />
        <TaskTable
          status="Completed"
          tasks={tasks.completed}
          fetchTasks={fetchTasks}
        />
        <TaskTable
          status="Canceled"
          tasks={tasks.canceled}
          fetchTasks={fetchTasks}
        />
      </div>
    </>
  );
}

export default App;
