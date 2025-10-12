import App from './App.jsx'
import './playerCard.css'


function PlayerCard({player, onClick}) {

    return (
        <div
            key={player.id}
            className="player-card"
            onClick={() => onClick(player)}
        >
            <h2>{player.first_name} {player.last_name}</h2>
            <p><strong>Team:</strong> {player.team.full_name}</p>
            <p><strong>Position:</strong> {player.position || 'N/A'}</p>
            <p><strong>Height:</strong> {player.height || 'N/A'}</p>
            <p><strong>Weight:</strong> {player.weight || 'N/A'}</p>


        </div>

    )
}

export default PlayerCard