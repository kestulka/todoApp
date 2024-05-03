import React, { useState } from "react";
import { UpdateTaskModalProps } from "../interfaces/FormInterfaces";

const updateTaskModal: React.FC<UpdateTaskModalProps> = ({
  task,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = async () => {
    const updatedTask = {
      title,
      description,
      priority: task.priority,
      status: task.status,
    };
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    if (response.ok) {
      onClose();
      onUpdate();
    }
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Task</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default updateTaskModal;
