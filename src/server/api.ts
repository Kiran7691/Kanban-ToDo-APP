import express from 'express';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const app = express();
app.use(express.json());

app.post('/api/todos', async (req, res) => {
  try {
    const { todos } = req.body;
    await writeFile(
      join(process.cwd(), 'src/data/todos.json'),
      JSON.stringify({ todos }, null, 2)
    );
    res.status(200).json({ message: 'Todos saved successfully' });
  } catch (error) {
    console.error('Error saving todos:', error);
    res.status(500).json({ error: 'Failed to save todos' });
  }
});

export const viteNodeApp = app;