import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import GET_PLAYERS from '../mutations/getPlayers';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const PlayerList = () => {
    const { loading, error, data } = useQuery(GET_PLAYERS);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && error) {
          console.error("❌ GraphQL query error:", error);
        }
      }, [data, loading, error]);

    if (loading) return <p className="text-center text-muted">Loading...</p>;
    if (error) return <p className="text-center text-danger">Error: {error.message}</p>;

    return (
        <>
            <h2 className="fw-bold text-dark mb-4">Player List</h2>
            {/* <Card className="shadow-sm border-1"> */}
                <ListGroup className="shadow-sm border-1">
                    {data.players.map((player) => (
                        <ListGroup.Item key={player.id} className="py-3">
                            <h5 className="fw-bold text-dark">{player.username}</h5>
                            <p className="text-muted mb-1">
                                <strong>ID:</strong> {player.id}
                            </p>
                            <p className="text-muted mb-0">
                                <strong>Ranking:</strong> {player.ranking ? player.ranking : "N/A"}
                            </p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            {/* </Card> */}

            <button className="btn btn-primary mt-4" onClick={() => navigate('/main')}>
                Back to Main
            </button>
        </>

    );
};

export default PlayerList;
