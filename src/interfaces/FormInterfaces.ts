export interface FormData {
  title: string;
  description: string;
  priority: string;
  status: string;
}

export interface FormProps {
  onSubmit: (data: FormData) => void;
}
