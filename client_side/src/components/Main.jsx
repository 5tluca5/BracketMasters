import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import GET_PLAYERDATA from '../mutations/getPlayerData'
import LOG_OUT from '../mutations/logout'

function View({ user }) {

  console.log("User in Main:", user); // Check if user data is passed

  let navigate = useNavigate();
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  const { data: authData, loading: authLoading, error: authError } = useQuery(GET_PLAYERDATA, {
    variables: { userId: user?.id },
    fetchPolicy: "network-only",
    skip: !user || user.role === "Admin"
  });

  const [logout] = useMutation(LOG_OUT, {
    onCompleted: () => {
      console.log("Logged out successfully");
      toast.success("Logged out successfully");
      navigate('/');
    },
    onError: (err) => {
      console.error("Logout failed:", err.message);
    },
  });

  // User
  const joinTournaments = () => {
    navigate('/joinTournaments');
  };

  //Admin
  const createUser = () => {
    navigate('/createuser');
  };
  const createTournament = () => {
    navigate('/createTournament');
  };
  const assignPlayerToTournament = () => {
    navigate('/assignPlayerToTournament');
  };
  const viewPlayerList = () => {
    navigate('/playerlist');
  };
  const viewTournamentList = () => {
    navigate('/tournamentlist');
  };
  const assignPlayer = () =>
  {
    navigate('/assignPlayer');
  };

  useEffect(() => {
    if (user?.role === "Admin") return;

    console.log("🔄 Loading:", authLoading);
    console.log("⚠ Error:", authError);
    console.log("📦 Data:", authData);

    if (!authLoading && authError) {
      console.error("❌ GraphQL query error:", authError);
    }

    if (!authLoading && authData?.playerByUserId) {
      console.log("✅ User is logged in, redirecting...");
      console.log("Player id:", authData.playerByUserId.id)
    } else if (!authLoading) {
      console.log("🚫 User didn't log in");
      navigate('/');
    }
  }, [authData, authLoading, authError]);

  //
  return (
    <div className=" justify-content-center align-items-center">
      <h1 className="fw-bold text-dark display-7">
        Welcome, {user?.username || "Guest"}!
      </h1>
      {user?.role === "Admin" ? (
        <div className="d-grid gap-2">
          <button type="button" className="btn btn-primary" onClick={createUser}>Create User</button>
          <button type="button" className="btn btn-primary" onClick={createTournament}>Create Tournament</button>
          <button type="button" className="btn btn-warning" onClick={assignPlayer}>Assign Player To Tournament</button>
          <button type="button" className="btn btn-info" onClick={viewPlayerList}>View All Players</button>
          <button type="button" className="btn btn-info" onClick={viewTournamentList}>View All Tournamnets</button>
          <button type="button" className="btn btn-outline-secondary" onClick={logout}>Log out</button>
        </div>
      ) : (
        <div>
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-success" onClick={viewTournamentList}>Join a tournaments</button>
            <button type="button" class="btn btn-outline-secondary" onClick={logout}>Log out</button>
          </div>
          <hr className="my-4" />

          <p className="text-muted fs-5 fw-bold">
            Your tournaments:
          </p>

          {authData?.playerByUserId?.tournaments?.length > 0 ? (
            <table className="table table-striped shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Game</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {authData.playerByUserId.tournaments.map((tournament) => (
                  <tr key={tournament.id}>
                    <td>{tournament.name}</td>
                    <td>{tournament.game}</td>
                    <td>{new Date(parseInt(tournament.date)).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge bg-${getStatusColor(tournament.status)}`}>
                        {tournament.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">You haven't joined any tournaments yet.</p>
          )}


        </div>
      )}
    </div>
  );
}

// Function to color-code tournament status
const getStatusColor = (status) => {
  switch (status) {
    case "Upcoming": return "primary";
    case "Ongoing": return "success";
    case "Completed": return "secondary";
    default: return "dark";
  }
};

export default View;