import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mysql from "mysql";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// POST

app.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { title, description, priority, status } = req.body;
    await connectDB.query(
      `INSERT INTO todos(title, description, priority, status) VALUES (?, ?, ?, ?)`,
      [title, description, priority, status],
    );
    res.json({ message: "success" });
  } catch (error) {
    console.error(`Error creating task: `, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET

app.get("/tasks/all", (_req: Request, res: Response) => {
  const sqlQuery = `SELECT id, title, description, priority, status from todos`;
  connectDB.query(sqlQuery, (error, result) => {
    if (error) throw Error;
    res.json(result);
  });
});

// DELETE

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const sqlQuery = `DELETE FROM todos WHERE id=?`;

  connectDB.query(sqlQuery, [req.params.id], (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

// PUT

app.put("/tasks/:id", (req: Request, res: Response) => {
  const sqlQuery = `UPDATE todos SET title=?, description=?, priority=?, status=? WHERE id=?`;

  connectDB.query(
    sqlQuery,
    [
      req.body.title,
      req.body.description,
      req.body.priority,
      req.body.status,
      req.params.id,
    ],
    (error, result) => {
      if (error) throw error;
      res.json(result);
    },
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
