import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Search.css'
import {backendip} from '../../../utils/const'

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(backendip + '/search', {
          params: { query }
        });
        setResults(response.data);
        console.log(results)
      } catch (error) {
        console.error('Error fetching search results', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleItemClick = (id) => {
    navigate(`/b/${id}` ); // Navigate to /b/:id
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search forms..."
        className="search-input"
      />
      {loading && <p>Loading...</p>}
      <ul className="search-results">
        {results.map((result) => (
          <li 
            key={result.id} 
            className="search-result-item"
            onClick={() => handleItemClick(result._id)} // Handle item click
          >
            <h3>{result.formname}</h3>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
