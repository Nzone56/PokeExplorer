import { useEffect, useState } from "react";

type FetchFunction<T> = () => Promise<T>;
type FetchInput<T> = string | FetchFunction<T>;
type UseFetchInput<T> = FetchInput<T> | FetchInput<T>[];

export const useFetch = <T>(input: UseFetchInput<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const toPromise = (item: FetchInput<T>) => {
        if (typeof item === "string") {
          return fetch(item).then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          });
        }
        return item();
      };

      const inputs = Array.isArray(input) ? input : [input];

      try {
        const results = await Promise.all(inputs.map(toPromise));
        setData(Array.isArray(input) ? results : results[0]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [input]);

  return { data, loading, error };
};
