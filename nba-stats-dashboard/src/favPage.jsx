import "./favPage.css";
import PlayerCard from './playerCard';
import './App.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import './Sidebar.css'

function FavPage({ favouritePlayers, handlePlayerClick, selectedPlayer, sidebarOpen, setSidebarOpen, handleFavouriteClick }) {

    const isFavourited = selectedPlayer ? favouritePlayers.some(
        fav => fav.id === selectedPlayer.id) : false;

    return (
        <div>
            <Header />
            <div className="fav-page">
                {favouritePlayers.length === 0 ? (
                    <p className="fav-empty"> No players have been favourited yet, go favourite one!</p>
                ) : (

                    <div className="fav-players-container">
                        {favouritePlayers.map(player => (
                            <PlayerCard
                                key={player.id}
                                player={player}
                                onClick={() => handlePlayerClick(player)}
                            />

                        ))}
                    </div>
                )}

            </div>

            {sidebarOpen && (
                <>
                    <Sidebar
                        player={selectedPlayer}
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                        isFavourited={isFavourited}
                        onFavouriteToggle={handleFavouriteClick}
                    />

                    <div
                        className="sidebar-overlay"
                        onClick={() => setSidebarOpen(false)}
                    />

                </>
            )}

        </div>
    );
}

export default FavPage;