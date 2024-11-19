import { useCallback, useState } from "react";
import axios from "axios";

const useAxios = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (url, method = "GET", payload = null, headers = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          method,
          data: payload,
          headers,
        });
        return response.data;
      } catch (err) {
        console.log(err);
        const backendMessage = err.response?.data?.message || "An error occurred. Please try again.";
        setError({ message: backendMessage, status: err.response?.status });
        throw err; // Optionally rethrow if further handling is needed
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { error, loading, fetchData };
};


export default useAxios;
