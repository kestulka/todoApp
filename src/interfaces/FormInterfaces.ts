// Submiting a form

export interface FormData {
  title: string;
  description: string;
  priority: string;
  status: string;
}

export interface FormProps {
  onSubmit: (data: FormData) => void;
}

// Single task

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
}

// Task table

export interface TaskTableProps {
  tasks: Task[];
  fetchTasks: () => void;
  status: string;
}

// Update task

export interface UpdateTaskProps {
  task: Task;
  onUpdate: (data: FormData) => void;
}

// Update modal

export interface UpdateTaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: () => void;
}

// Tasks categories

export interface CategorizedTasks {
  pending: Task[];
  completed: Task[];
  canceled: Task[];
}
