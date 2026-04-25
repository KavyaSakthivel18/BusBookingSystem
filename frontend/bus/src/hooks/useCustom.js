import { useState, useCallback } from 'react';

export const useFormInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  const bind = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  return [value, bind, reset];
};

export const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  return { data, loading, error, execute };
};

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  setTimeout(() => {
    setDebouncedValue(value);
  }, delay);

  return debouncedValue;
};
