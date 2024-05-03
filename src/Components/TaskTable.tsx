import React, { useState } from "react";
import { Task, TaskTableProps } from "../interfaces/FormInterfaces";
import UpdateTaskModal from "../Components/UpdateTaskModal";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

const TaskTable: React.FC<TaskTableProps> = ({ tasks, fetchTasks, status }) => {
  const handleMarkAsCompleted = async (id: number) => {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "completed" }),
    });
    if (response.ok) {
      fetchTasks();
    }
  };

  const [updateTask, setUpdateTask] = useState<Task | null>(null);

  const handleOpenModal = (task: Task) => {
    setUpdateTask(task);
  };

  const handleCloseModal = () => {
    setUpdateTask(null);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Task deleted sucessfully!");
        fetchTasks();
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <h2>{status} Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              // jei completed braukia eilutes
              style={{
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
              }}
            >
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleMarkAsCompleted(task.id)}>
                  <FaCheck />
                </button>
                <button onClick={() => handleDelete(task.id)}>
                  <FaTrash />
                </button>
                <button onClick={() => handleOpenModal(task)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updateTask && (
        <UpdateTaskModal
          task={updateTask}
          onClose={handleCloseModal}
          onUpdate={fetchTasks}
        />
      )}
    </div>
  );
};

export default TaskTable;
