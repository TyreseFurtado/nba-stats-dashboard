import { FaStar } from 'react-icons/fa';
import './Sidebar.css'

function Sidebar({ player, isOpen, onClose, isFavourited, onFavouriteToggle }) {

    if (!player) return null;

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-content">
                <button className="close-button" onClick={onClose}>Close</button>

                <div className="player-details">
                    <h2>{player.first_name} {player.last_name}</h2>
                    <FaStar className={`favourite-symbol ${isFavourited ? 'favourited' : ''}`} onClick={() => onFavouriteToggle(player)} />

                    <div className="detail-section">
                        <h3>Basic Information</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="label">Position:</span>
                                <span className="value">{player.position || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Jersey No:</span>
                                <span className="value">{player.jersey_number || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Height:</span>
                                <span className="value">{player.height || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Weight:</span>
                                <span className="value">{player.weight || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Team Information</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="label">Team:</span>
                                <span className="value">{player.team.full_name}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Conference:</span>
                                <span className="value">{player.team.conference}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Division:</span>
                                <span className="value">{player.team.division}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Career Information</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="label">College:</span>
                                <span className="value">{player.college || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Country:</span>
                                <span className="value">{player.country || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Draft Year:</span>
                                <span className="value">{player.draft_year || 'Undrafted'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Draft Round:</span>
                                <span className="value">{player.draft_round || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Draft Pick:</span>
                                <span className="value">{player.draft_number || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;