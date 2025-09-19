import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
import PlayerCard from './playerCard.jsx'
import {Link} from 'react-router-dom'
import TeamsDropdown from './TeamsDropdown.jsx'
import Header from './Header.jsx'

function App({ favouritePlayers, onFavouriteToggle}) {
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [positionFilter, setPositionFilter] = useState('');
  const [selectedTeam, setSelectedTeam] = useState("");


  const handlePlayerClick = (player) => {
    setSidebarOpen(true);
    setSelectedPlayer(player);
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setError(null);
  }

  const handleFavouriteClick = (player) => {
    onFavouriteToggle(player);

  }

  const handlePositionFilterChange = (e) => {
    setPositionFilter(e.target.value);
  }

  const isFavourited = selectedPlayer ? favouritePlayers.some(
    fav => fav.id === selectedPlayer.id) : false;

  
  const filteredPlayers = players.filter(player => {
    let passesPosition = true;
    let passesTeam = true;
    
    if (positionFilter){
      const playerPosition = player.position || '';
      if(playerPosition.includes('-')){
        const positions = playerPosition.split('-');
        passesPosition = positions.includes(positionFilter);
      } else {
        passesPosition = player.position === positionFilter;
      }
    }
    
    if(selectedTeam) {
      passesTeam = player.team.id.toString() === selectedTeam;
    }

    return passesPosition && passesTeam;
  });
  



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
      <Header/>
      <div className ="Search-container">
      <input type="text" placeholder="Search players..." value={searchTerm} className ="search-bar" 
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if(e.key === 'Enter' && !loading) {
            searchPlayers();
          }
        }} />
      <button className="search-button" onClick={searchPlayers} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
      <div className="filter-container">
        <select value={positionFilter} onChange={handlePositionFilterChange}>
          {["Any Position","G","F","C"].map(pos => (
            <option key={pos} value={pos === "Any Position" ? "" : pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>

      <div className="team-filter">
        <TeamsDropdown onTeamSelect={setSelectedTeam}/>
      </div>
      </div>
      <div className ="players-container">
      {filteredPlayers.map(player =>  (
        <PlayerCard
        key={player.id}
        player={player}
        onClick={handlePlayerClick}

        />
      ))}
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading...</p>}
      {players.length === 0 && !loading && !error && <p>No players to display. Please search for a player.</p>}

      
      </div>

      <div className ={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <button className="close-button" onClick={() => setSidebarOpen(false)}>Close</button>

          {selectedPlayer && (
            <div className ="player-details">
              <h2>{selectedPlayer.first_name} {selectedPlayer.last_name}</h2>
              <FaStar className={`favourite-symbol ${isFavourited ? 'favourited' : ''}`}  onClick={() => handleFavouriteClick(selectedPlayer)}/>
              
              <div className="detail-section">
                <h3>Basic Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Position:</span>
                    <span className="value">{selectedPlayer.position || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Jersey No:</span>
                    <span className="value">{selectedPlayer.jersey_number || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Height:</span>
                    <span className="value">{selectedPlayer.height || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Weight:</span>
                    <span className="value">{selectedPlayer.weight || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Team Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Team:</span>
                    <span className="value">{selectedPlayer.team.full_name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Conference:</span>
                    <span className="value">{selectedPlayer.team.conference}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Division:</span>
                    <span className="value">{selectedPlayer.team.division}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Career Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">College:</span>
                    <span className="value">{selectedPlayer.college || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Country:</span>
                    <span className="value">{selectedPlayer.country || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Draft Year:</span>
                    <span className="value">{selectedPlayer.draft_year || 'Undrafted'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Draft Round:</span>
                    <span className="value">{selectedPlayer.draft_round || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Draft Pick:</span>
                    <span className="value">{selectedPlayer.draft_number || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
            </div>

          
          
      </div>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
   
  )
}


export default App