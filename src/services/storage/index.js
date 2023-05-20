export const setStorage = ({ key, val }) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const getStorage = key => {
  const stored = localStorage.getItem(key);
  return stored === null ? undefined : JSON.parse(stored);
};

export const removeStorage = key => {
  localStorage.removeItem(key);
};
