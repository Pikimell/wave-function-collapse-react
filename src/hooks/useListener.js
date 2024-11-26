import { useEffect } from 'react';

export const useListener = (
  { element = window, event, callback },
  arr = [],
) => {
  useEffect(() => {
    if (!element || !event || typeof callback !== 'function') {
      console.warn('Invalid parameters passed to useListener');
      return;
    }
    element.addEventListener(event, callback);
    return () => {
      element.removeEventListener(event, callback);
    };
  }, [element, event, callback, ...arr]);
};
