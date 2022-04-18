import { useEffect, useState } from "react";

const PREFIX = "list-users-";

const usePersistData = (key: string, initialValue: any) => {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const fromLocalStorage = localStorage.getItem(prefixedKey);

    if (fromLocalStorage !== null) {
      return JSON.parse(fromLocalStorage);
    }
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
};

export default usePersistData;
