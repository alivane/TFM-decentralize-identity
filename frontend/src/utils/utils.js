import { saveAs } from 'file-saver';


// Function to save data to local storage
export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const clearLocalStorage = () => {
  localStorage.clear();
}

// Function to retrieve data from local storage
export const loadFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const downloadFile = (file, content) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  // Trigger the file download
  saveAs(blob, `${file}`);
}

export const containsKeywords = () => {
  const keywords = ["hello", "world", "cat", "dog", "house", "phone", "table", "computer", 
  "paper", "rock", "door", "bed", "blanket", "pillow", "keyboard", 
  "friend", "food", "water", "cable", "stop"];
  // Generate a random index from 0 to the length of the keywords array
  const randomIndex = Math.floor(Math.random() * keywords.length);

  // Return the keyword at the random index
  return keywords[randomIndex];
}

export const isSingleWord = (text, word) => {
  const regex = new RegExp('\\b' + word + '\\b', 'i');
  return regex.test(text);
}
