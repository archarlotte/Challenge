import { Issue, getData, setData } from './dataStore';
import HTTPError from 'http-errors';

export const createIssue = (issue: Issue) => {
  const data = getData();
  const id = data.issues.length;
  const newIssue = {
    id,
    title: issue.title,
    description: issue.description,
  };
  data.issues.push(newIssue);
  setData(data);
  console.log('Created:', newIssue);
  return newIssue;
};

export const getIssue = (issueId: number) => {
  const data = getData();
  const issue = data.issues.find((item) => item.id === issueId);
  if (issue === undefined) throw HTTPError(400, 'Issue does not exist');
  console.log('Readed:', issue);
  return issue;
};

export const updateIssue = (issueId: number, updatedIssue: Issue) => {
  const data = getData();
  let issue = data.issues.find((item) => item.id === issueId);
  if (issue === undefined) throw HTTPError(400, 'Issue does not exist');
  issue = updatedIssue;
  setData(data);
  console.log('Updated:', updatedIssue);
  return updatedIssue;
};

export const deleteIssue = (issueId: number) => {
  const data = getData();
  const issue = data.issues.find((item) => item.id === issueId);
  if (issue === undefined) throw HTTPError(400, 'Issue does not exist');
  data.issues = data.issues.filter(issue => issue.id !== issueId);
  setData(data);
  console.log('Deleted issue with id:', issueId);
  return {};
};