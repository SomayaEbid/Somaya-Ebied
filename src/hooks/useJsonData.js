import { useState, useEffect } from 'react';

export function useJsonData(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const basePath = import.meta.env.BASE_URL;
        const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
        const fullPath = `${basePath}${normalizedPath}`;
        
        const response = await fetch(fullPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${fullPath}: ${response.status} ${response.statusText}`);
        }
        let json = await response.json();
        
        const fixPaths = (obj) => {
          if (typeof obj === 'string') {
            if (obj.startsWith('/images/') || obj.startsWith('/files/') || obj.startsWith('/data/')) {
              return `${basePath}${obj.slice(1)}`;
            }
            return obj;
          }
          if (Array.isArray(obj)) {
            return obj.map(fixPaths);
          }
          if (obj !== null && typeof obj === 'object') {
            const newObj = {};
            for (const key in obj) {
              newObj[key] = fixPaths(obj[key]);
            }
            return newObj;
          }
          return obj;
        };
        
        json = fixPaths(json);

        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, loading, error };
}
