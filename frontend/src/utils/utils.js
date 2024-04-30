import { saveAs } from 'file-saver';


// Function to save data to local storage
export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

// Function to retrieve data from local storage
export const loadFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const downloadFile = (file, content) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  // Trigger the file download
  saveAs(blob, `${file}`);
}