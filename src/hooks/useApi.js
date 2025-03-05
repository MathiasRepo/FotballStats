import { useState, useEffect } from 'react';

/**
 * Custom hook for making API calls with loading and error states
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {Array} params - Parameters to pass to the API function
 * @param {boolean} useMockData - Whether to use mock data if API call fails
 * @returns {Object} - Object containing data, loading state, error, and refetch function
 */
function useApi(apiFunction, dependencies = [], params = [], useMockData = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // If useMockData is true and we're in development, use mock data directly
      if (useMockData && import.meta.env.DEV && apiFunction.mockData) {
        console.log('Using mock data directly in development mode');
        setData(apiFunction.mockData);
        setLoading(false);
        return;
      }
      
      console.log(`Calling API function with params:`, params);
      const response = await apiFunction(...params);
      console.log('API response:', response);
      setData(response);
      setLoading(false);
    } catch (err) {
      console.error(`Error fetching data:`, err);
      setError(err);
      
      // If useMockData is true and the API function has a mockData property,
      // use the mock data as a fallback
      if (useMockData && apiFunction.mockData) {
        console.log('Using mock data as fallback due to error');
        setData(apiFunction.mockData);
      }
      
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

export default useApi;
