import express, { json, Request, Response } from 'express';
import cors from 'cors';
import { getData, Issue } from './dataStore';
import { createIssue, deleteIssue, getIssue, updateIssue } from './issue';

const app = express();
const port = 3000;

app.use(json());
app.use(cors());

app.get('/issues', (req: Request, res: Response) => {
  const data = getData();
  res.json(data);
});

app.post('/issues', (req: Request, res: Response) => {
  const issue: Issue = req.body;
  res.json(createIssue(issue));
});

app.get('/issues/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.json(getIssue(id));
});

app.put('/issues/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedIssue: Issue = req.body;
  res.json(updateIssue(id, updatedIssue));
});

app.delete('/issues/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.json(deleteIssue(id));

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
