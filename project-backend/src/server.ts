import express, { json, Request, Response } from 'express';
import cors from 'cors';
import { getData, Issue, setData } from './dataStore';

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
  const data = getData();
  data.issues.push(issue);
  setData(data);
  console.log('Created:', issue);
  res.status(201).json(issue);
});

app.get('/issues/:id', (req: Request, res: Response) => {
  console.log('id')
  const issueId = Number(req.params.id);
  const data = getData();
  const issue = data.issues.filter(item => item.id === issueId)
  res.status(200).json(issue);
});

app.put('/issues/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedIssue: Issue = req.body;
  const data = getData();

  data.issues = data.issues.map(issue => (issue.id === parseInt(id) ? updatedIssue : issue));
  setData(data);

  console.log('Updated:', updatedIssue);
  res.json(updatedIssue);
});

app.delete('/issues/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const data = getData();
  data.issues = data.issues.filter(issue => issue.id !== parseInt(id));
  setData(data);
  console.log('Deleted issue with id:', id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
