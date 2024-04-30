import React from "react";
import "./App.css";
import Form from "./Components/Form";

function App() {
  const handleSubmit = (data: any) => {
    console.log("Form data;", data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
    </>
  );
}

export default App;
