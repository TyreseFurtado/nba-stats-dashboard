import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const api = axios.create({
    baseURL: "https://api.balldontlie.io/v1/",
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
    timeout: 10000,
  });

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setError(null);
  }


  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
        setError(`Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('Error: No response from server.');
      } else {
        console.error('Request setup error:', error.message);
        setError(`Error: ${error.message}`);
      }
      setLoading(false);
      return Promise.reject(error);
    }
  )

  const searchPlayers = async (term) => {
    setLoading(true);
    setError(null);
    if (!searchTerm.trim()) {
      setError('Please enter a player name');
      setLoading(false);
      return; 
    }
    if (searchTerm.length < 2) {
      setError('Please enter at least 2 characters;');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setPlayers([]);

    try {
      const response = await api.get('/players', {
        params: {
          search: searchTerm.trim(),
          per_page: 10,
        }
      });
      
      if (response.data.data && response.data.data.length > 0) {
        setPlayers(response.data.data);
      } else {
        setError("No players found for "+ searchTerm);
      }
    }
    
   catch (err) {
    console.error('Search error:', err);
    setError('An error occurred while searching. Please try again.');
  } finally {
    setLoading(false);
  }
  }

  return (
    <div>
       <header className="dashboard-header">
      <h1 className="dashboard-title">NBA Stats Dashboard</h1>
      <div className ="Search-container">
      <input type="text" placeholder="Search players..." value={searchTerm} className ="search-bar" onChange={handleInputChange} />
      <button className="search-button" onClick={searchPlayers} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
      </div>
      </header>
      <div className ="player-card">
      {players.map(player =>  (
        <div key={player.id} className="player-card">
          <h2>{player.first_name} {player.last_name}</h2>
          <p><strong>Team:</strong> {player.team.full_name}</p>
          <p><strong>Position:</strong> {player.position || 'N/A'}</p>
          <p><strong>Height:</strong> {player.height}</p>
          <p><strong>Weight:</strong> {player.weight}</p>
        </div>
      ))}
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading...</p>}
      {players.length === 0 && !loading && !error && <p>No players to display. Please search for a player.</p>}

      
      </div>
      
    </div>
   
  )
}


export default App