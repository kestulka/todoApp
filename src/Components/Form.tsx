import React, { useState, ChangeEvent, FormEvent } from "react";
import { FormData, FormProps } from "../interfaces/FormInterfaces";
import styles from "../Styles/Form.module.css";

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data: FormData = { title, description, priority, status };
    onSubmit(data);
    setTitle("");
    setDescription("");
    setPriority("");
    setStatus("");
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setPriority(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setStatus(e.target.value);
  };

  return (
    <>
      <header>
        <h1>TODO APP</h1>
        <p>Get things done!</p>
      </header>
      <form className={styles["add-task-form"]} onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        <label>
          Priority:
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Status:
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </label>
        <button type="submit">Add task</button>
      </form>
    </>
  );
};

export default Form;
