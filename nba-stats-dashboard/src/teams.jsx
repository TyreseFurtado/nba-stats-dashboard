import './teams.css'
import Header from './Header.jsx'
import TeamCard from './teamCard.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ACTIVE_TEAMS from './ActiveTeams';

function Teams() {
    const apiKey = import.meta.env.VITE_API_KEY;

    const api = axios.create({
        baseURL: "https://api.balldontlie.io/v1/",
        headers: {
            'Authorization': `Bearer ${apiKey}`
        },
        timeout: 10000,
    });

    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)

    const handleTeamClick = (team) => {
        console.log('Team clicked:', team);
    }

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true)
                const response = await api.get('/teams')

                const activeOnly = response.data.data.filter(team =>
                    ACTIVE_TEAMS.some(activeTeam => activeTeam.id === team.id)
                )

                setTeams(activeOnly)
            } catch (error) {
                console.error("Error fetching teams:", error)
            } finally {
                setLoading(false)
            }

        }
        fetchTeams()
    }, [])

    const groupedTeams = teams.reduce((acc, team) => {
        const conference = team.conference;
        if (!acc[conference]) {
            acc[conference] = [];
        }
        acc[conference].push(team);
        return acc;
    }, {});

    Object.keys(groupedTeams).forEach(conference => {
        groupedTeams[conference].sort((a, b) => a.full_name.localeCompare(b.full_name));
    });

    if (loading) return <div className="teams-main-container">Loading Teams...</div>

    return (
        <div>
            <Header />
            <div className="teams-main-container">
                {teams.length === 0 ? (
                    <div>No teams found</div>
                ) : (
                    <div className="conferences-container">

                        {groupedTeams.West && (
                            <div className="conference-section">
                                <div className="conference-header west">
                                    <h1 className="conference-title">Western Conference</h1>
                                    <p className="conference-subtitle">{groupedTeams.West.length} Teams</p>
                                </div>
                                <div className="conference-teams">
                                    {groupedTeams.West.map(team => (
                                        <div key={team.id} className="team-card west">
                                            <TeamCard team={team} onClick={handleTeamClick} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {groupedTeams.East && (
                            <div className="conference-section">
                                <div className="conference-header east">
                                    <h1 className="conference-title">Eastern Conference</h1>
                                    <p className="conference-subtitle">{groupedTeams.East.length} Teams</p>
                                </div>
                                <div className="conference-teams">
                                    {groupedTeams.East.map(team => (
                                        <div key={team.id} className="team-card east">
                                            <TeamCard team={team} onClick={handleTeamClick} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    )
}


export default Teams;