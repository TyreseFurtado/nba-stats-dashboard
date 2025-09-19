import "./favPage.css";
import PlayerCard from './playerCard';
import './App.css'
import Header from './Header.jsx'

function FavPage({favouritePlayers, handlePlayerClick}) {




    return (
        <div>
           <Header/>
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