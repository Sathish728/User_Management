import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile1 = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Unauthorized! Please log in.");
                navigate("/login");
                return;
            }

            try {
                const res = await axios.get("http://localhost:3500/server/profile", {
                    headers: { Authorization: token }
                });
                setUser(res.data.user);
            } catch (err) {
                alert("Session expired! Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h2>Profile Page</h2>
            {user ? (
                <div>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default Profile1;
