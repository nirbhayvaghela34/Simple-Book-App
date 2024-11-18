import { useCallback, useState } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (url, method = 'GET', payload = null, headers = {}) => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios({
          url,
          method,
          data: payload,
          headers,
        });      
        return response.data; // Return data if you need it
      } catch (err) { 
        setError(err); // Set error state
        console.error(err); // Log error for debugging
        throw err; // Rethrow error if needed for further handling
      } finally {
        setLoading(false); // Stop the loading state
      }
    },[]);
  

  return { error, loading, fetchData };
};

export default useAxios;
