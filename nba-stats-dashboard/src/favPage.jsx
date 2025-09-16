import "./favPage.css";
import PlayerCard from './playerCard';
import './App.css'

function FavPage({favouritePlayers, handlePlayerClick}) {




    return (
        <div>
            <header className="dashboard-header">
                <h1 className="dashboard-title">Favourite Players</h1>
            </header>
            <div className="players-container">
               {favouritePlayers.length === 0 ? ( 
               <p> No players have been favourited yet, go favourite one!</p>
                   )    :   (

                favouritePlayers.map(player => (
                    <PlayerCard
                        key={player.id}
                        player={player}
                        onClick={handlePlayerClick}
                    />
                
                ))
               
               
               )}

        </div>
    </div>
    )
}

export default FavPage;