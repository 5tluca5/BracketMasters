import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CREATE_USER from "../mutations/createUser";

const CreateUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [createUser, { loading, error }] = useMutation(CREATE_USER, {
        onCompleted: () => {

            toast.success("User created successfully!");

            navigate("/main"); // Navigate to main after showing toast
        },
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser({ variables: { username: formData.name, email: formData.email, password: formData.password, role: "Player" } });


    };

    return (
        <div className=" justify-content-center align-items-center">
            <h2 className="fw-bold text-primary mb-4">Create User</h2>
            {error && <p className="text-danger">Error: {error.message}</p>}
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success mt-3" disabled={loading}>
                    {loading ? "Creating..." : "Create User"}
                </button>
            </form>

            <button className="btn btn-secondary mt-2" onClick={() => navigate('/main')}>
                Back to Main
            </button>
        </div>
    );
};

export default CreateUser;
