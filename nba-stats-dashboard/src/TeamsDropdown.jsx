import { useEffect, useState } from "react";
import { ACTIVE_TEAMS } from "./ActiveTeams";
import "./TeamsDropdown.css"

function TeamsDropdown({ onTeamSelect }) {

    return (
        <div className="team-dropdown">
            <select onChange={e => onTeamSelect(e.target.value)}>
                <option value=""> Any Team</option>
                {ACTIVE_TEAMS.map(team => (
                    <option key={team.id} value={team.id}>
                        {team.full_name}
                    </option>
                ))}
            </select>
        </div>
    )
}


export default TeamsDropdown;