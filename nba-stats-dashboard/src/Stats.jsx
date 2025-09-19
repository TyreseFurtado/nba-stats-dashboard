import Header from './Header.jsx'
import './Stats.css'

function Stats() {


    return (
        <div>
            <Header/>
            <div className="Stats-container">
                <div className="Offensive-stats">
                    <h2> Offensive Statistics</h2>
                    <p> Points</p>
                    <p> Assists</p>
                    <p> 3-Pointers Made</p>
                </div>

                <div className="Defensive-stats">

                <h2> Defensive Statistics</h2>
                <p> Blocks</p>
                <p> Steals</p>
                </div>

            </div>
        </div>
    )
}

export default Stats