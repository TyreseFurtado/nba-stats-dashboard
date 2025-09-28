import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import FavPage from './favPage.jsx'

function AppRouter() {
    const [favouritePlayers, setFavouritePlayers] = useState(() => {
        const savedFavourites = localStorage.getItem('favouritePlayers');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        localStorage.setItem('favouritePlayers', JSON.stringify(favouritePlayers));

    }, [favouritePlayers]);

    const handlePlayerClick = (player) => {
        setSidebarOpen(true);
        setSelectedPlayer(player);
    }

    const handleFavouriteToggle = (player) => {
        setFavouritePlayers((prevFavourites) => {
            if (prevFavourites.some(fav => fav.id === player.id)) {
                return prevFavourites.filter(fav => fav.id !== player.id);
            } else {
                return [...prevFavourites, player];
            }
        })
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<App
                        favouritePlayers={favouritePlayers}
                        onFavouriteToggle={handleFavouriteToggle}
                        handlePlayerClick={handlePlayerClick}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        selectedPlayer={selectedPlayer}
                    />
                    }
                />
                <Route
                    path="/favourites"
                    element={<FavPage
                        favouritePlayers={favouritePlayers}
                        handlePlayerClick={handlePlayerClick}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleFavouriteClick={handleFavouriteToggle}
                        selectedPlayer={selectedPlayer}
                    />
                    }
                />
            </Routes>
        </BrowserRouter>
    )


}

export default AppRouter