import { Link } from 'react-router-dom'
import './App.css'


function Header() {

    return (
        <header className="dashboard-header">
            <h1 className="dashboard-title">NBA Stats Dashboard</h1>
            <div className="header-actions">
                <Link to="/" className="header-link">Search</Link>
                <Link to="/favourites" className="header-link">Favourites</Link>
            </div>
        </header>
    )
}

export default Header