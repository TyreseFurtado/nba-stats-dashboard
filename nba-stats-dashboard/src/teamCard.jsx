import './teamCard.css'


function TeamCard({ team, onClick }) {
    return (
        <div
            onClick={() => onClick && onClick(team)}
        >
            <h2>{team.full_name}</h2>
            <p><strong>Abbreviation:</strong>{team.abbreviation}</p>
            <p><strong>Conference:</strong>{team.conference}</p>
            <p><strong>Division:</strong>{team.division}</p>


        </div>


    )
}

export default TeamCard