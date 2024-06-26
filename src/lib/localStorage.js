export const getLocalStorage = (key) => {
  const localData = localStorage.getItem(key);

  if (!localData) return null;

  return JSON.parse(localData);
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => localStorage.clear();
