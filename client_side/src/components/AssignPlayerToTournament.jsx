import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ASSIGN_PLAYER_TO_TOURNAMENT from "../mutations/joinTournament"
const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      id
      username
    }
  }
`;

const GET_TOURNAMENTS = gql`
  query GetTournaments {
    tournaments {
      id
      name
    }
  }
`;

const AssignPlayerToTournament = () => {
    const navigate = useNavigate();
    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [selectedTournament, setSelectedTournament] = useState("");

    const { loading: playersLoading, data: playersData } = useQuery(GET_PLAYERS);
    const { loading: tournamentsLoading, data: tournamentsData } = useQuery(GET_TOURNAMENTS);
    const [assignPlayer] = useMutation(ASSIGN_PLAYER_TO_TOURNAMENT, {
        onCompleted: () => toast.success("Player assigned successfully!"),
        onError: (error) => toast.error(error.message),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedPlayer || !selectedTournament) {
            toast.error("Please select both player and tournament.");
            return;
        }
        assignPlayer({ variables: { tournamentId: selectedTournament, playerId: selectedPlayer } });
    };

    return (
        <div className=" justify-content-center align-items-center">
            <h2 className="fw-bold text-primary">Assign Player to Tournament</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Select Player</label>
                    <div className="input-group">
                        <select
                            className="form-select"
                            value={selectedPlayer}
                            onChange={(e) => setSelectedPlayer(e.target.value)}
                            disabled={playersLoading}
                        >
                            <option value="">-- Choose Player --</option>
                            {playersData?.players.map((player) => (
                                <option key={player.id} value={player.id}>{player.username}</option>
                            ))}
                        </select>
                        <span className="input-group-text bg-light">
                            <i className="bi bi-caret-down-fill"></i>
                        </span>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Select Tournament</label>
                    <div className="input-group">
                        <select
                            className="form-select"
                            value={selectedTournament}
                            onChange={(e) => setSelectedTournament(e.target.value)}
                            disabled={tournamentsLoading}
                        >
                            <option value="">-- Choose Tournament --</option>
                            {tournamentsData?.tournaments.map((tournament) => (
                                <option key={tournament.id} value={tournament.id}>{tournament.name}</option>
                            ))}
                        </select>
                        <span className="input-group-text bg-light">
                            <i className="bi bi-caret-down-fill"></i>
                        </span>
                    </div>
                </div>

                <button type="submit" className="btn btn-success mt-3">Assign Player</button>
            </form>

            <button className="btn btn-secondary mt-2" onClick={() => navigate('/main')}>
                Back to Main
            </button>
        </div>
    );
};

export default AssignPlayerToTournament;
