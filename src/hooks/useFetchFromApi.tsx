import { useEffect, useState } from "react";

function useFetchFromApi<T>(url: string, toFetch: boolean) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (toFetch) {
      setIsPending(true);
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }
  }, [toFetch, url]);
  return { data, isPending, error };
}
export default useFetchFromApi;
