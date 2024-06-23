import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/issues';

interface Issue {
  id: number;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');

  useEffect(() => {
    axios.get(API_URL).then(response => setIssues(response.data.issues));
  }, []);

  const createIssue = () => {
    const newIssue: Issue = { id: issues.length + 1, title, description };
    axios.post(API_URL, newIssue).then(response => {
      setIssues([...issues, response.data]);
      setTitle('');
      setDescription('');
    });
  };

  const readIssue = (id: number) => {
    console.log(`${API_URL}/${id}`);
    axios.get(`${API_URL}/${id}`).then(response => console.log(response.data));
  }

  const startEdit = (issue: Issue) => {
    setEditId(issue.id);
    setEditTitle(issue.title);
    setEditDescription(issue.description);
  };

  const updateIssue = () => {
    if (editId !== null) {
      const updatedIssue: Issue = { id: editId, title: editTitle, description: editDescription };
      axios.put(`${API_URL}/${editId}`, updatedIssue).then(response => {
        setIssues(issues.map(issue => (issue.id === editId ? response.data : issue)));
        setEditId(null);
        setEditTitle('');
        setEditDescription('');
      });
    }
  };

  const deleteIssue = (id: number) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setIssues(issues.filter(issue => issue.id !== id));
    });
  };

  return (
    <div>
      <h1>Issue Tracker</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createIssue}>Create Issue</button>
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>
            {editId === issue.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={updateIssue}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>{issue.title}</h2>
                <p>{issue.description}</p>
                <button onClick={() => readIssue(issue.id)}>Read</button>
                <button onClick={() => startEdit(issue)}>Update</button>
                <button onClick={() => deleteIssue(issue.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
