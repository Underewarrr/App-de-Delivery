import { useState, useEffect } from 'react';

const useStorage = (key, defaultValue) => {
  const getValue = () => {
    const savedValue = localStorage.getItem(key);
    const initialValue = JSON.parse(savedValue);
    return initialValue || defaultValue;
  };

  const [value, setValue] = useState(() => getValue());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useStorage;
