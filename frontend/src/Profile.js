import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"
import { getProfile, deleteProfile } from "./api";

// const Profile = () => {
//     const token=localStorage.getItem("token")
//     const navigate = useNavigate();


//     const handleLogout=()=>{
//         localStorage.removeItem("token")
//         navigate('/login')
//     }

    const Profile = () => {
        const [user, setUser] = useState(null);
        const navigate = useNavigate();
    
        useEffect(() => {
            const fetchProfile = async () => {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
    
                try {
                    const res = await axios.get("http://localhost:3500/api/profile", {
                        headers: { Authorization: `Bearer ${token}` }, // 
                    });
    
                    setUser(res.data);
                } catch (err) {
                    console.error("Error fetching profile:", err.response?.data || err);
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            };
    
            fetchProfile();
        }, [navigate]);

const handleLogout=()=>{
    localStorage.removeItem("token")
    navigate('/login')
}

const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
        const token = localStorage.getItem("token");
        await deleteProfile(token);
        localStorage.removeItem("token");
        alert("Account deleted successfully.");
        navigate("/login");
    }
};

    

    return (
        <div className="profile">
            <h2>PROFILE</h2>
            <div className="profile1">
            {user ?(
                <div>
                <table>
                    <thead>
                        <tr>
                            <th>First_Name</th>
                            <th>Last_Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Mobile</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Created_At</th>
                            <th>Updated_At</th>

                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.dob}</td>
                            <td>{user.gender}</td>
                            <td>{user.mobile}</td>
                            <td>{user.city}</td>
                            <td>{user.state}</td>
                            <td>{user.created_at}</td>
                            <td>{user.updated_at}</td>
                        </tr>
                    </tbody>
                </table>
                    <button onClick={()=> navigate("/edit")}>Edit</button>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={handleDelete} style={{ color: "red" }}>Delete Account</button>
                </div>
            )  :(
                <p>Loading user details...</p>
            )}
        </div>
        </div>
    );
};

export default Profile;
