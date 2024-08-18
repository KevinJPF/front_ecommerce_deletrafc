import React, { useState, useEffect } from "react";

export const useFetchData = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApiData = async () => {
    try {
      const query = new URLSearchParams(params).toString();
      const url = `http://localhost:8080/livraria/${endpoint}?${query}`;

      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Network response was not ok: " + errorMessage);
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return { fetchApiData, data, loading, error };
};
