import fs from 'fs';
export interface Issue {
  id: number;
  title: string;
  description: string;
}

export interface DataStore {
  issues: Issue[];
}

const initialData: DataStore = {
  issues: [],
};

// Use get() to access the data
export function getData(): DataStore {
  const jsonStr = fs.readFileSync('datastore.json');
  if (!String(jsonStr)) {
    setData(initialData);
    return initialData;
  }
  const data = JSON.parse(String(jsonStr));
  return data;
}

// Use set(newData) to pass in the entire data object, with modifications made
export function setData(newData: DataStore): void {
  fs.writeFileSync('datastore.json', JSON.stringify(newData));
}

export const clear = () => {
  setData(initialData);
  return {};
};
