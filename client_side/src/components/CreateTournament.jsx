import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CREATE_TOURNAMENT from "../mutations/createTournament";

const CreateTournament = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        game: "",
        date: "",
        status: "Upcoming", // Default status
    });
    

    const [createTournament, { loading, error }] = useMutation(CREATE_TOURNAMENT, {
        onCompleted: () => {
            toast.success("Tournament created successfully!");
            navigate("/main"); // Navigate to main after showing toast
        },
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.name, formData.game, formData.date, formData.status);
        await createTournament({
            variables: {
                name: formData.name,
                game: formData.game,
                date: formData.date,
                status: formData.status,
            }
        });
    };

    return (
        <div className="justify-content-center align-items-center">
            <h2 className="fw-bold text-primary mb-4">Create Tournament</h2>
            {error && <p className="text-danger">Error: {error.message}</p>}
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Tournament Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Game</label>
                    <input type="text" name="game" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" name="date" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className={`form-control text-white bg-${getStatusColor(formData.status)}`}
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Upcoming" className="text-primary">Upcoming</option>
                        <option value="Ongoing" className="text-success">Ongoing</option>
                        <option value="Completed" className="text-secondary">Completed</option>
                    </select>
                    
                </div>
                <button type="submit" className="btn btn-success mt-3" disabled={loading}>
                    {loading ? "Creating..." : "Create Tournament"}
                </button>
            </form>

            <button className="btn btn-secondary mt-2" onClick={() => navigate('/main')}>
                Back to Main
            </button>
        </div>
    );
};

// Function to color-code tournament status
const getStatusColor = (status) => {
    switch (status) {
        case "Upcoming": return "primary";
        case "Ongoing": return "success";
        case "Completed": return "secondary";
        default: return "dark";
    }
};

export default CreateTournament;
