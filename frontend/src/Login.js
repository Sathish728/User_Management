import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const navigate=useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3500/server/login", { email, password });

            
            const userToken = res.data.token;
            const userData = res.data.user;

            setToken(userToken);
            localStorage.setItem("token", userToken);
            localStorage.setItem("user", JSON.stringify(userData));

            console.log("Login Successful!");
            console.log("Token:", userToken);
            console.log("User:", userData);

           alert("Login successfully")
            navigate("/profile");

        } catch (err) {
            console.error("Login error:", err.response?.data || err);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="register1">
        <div className="register2">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="label1">
                <label htmlFor="text">Email :</label>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="label1">
                <label htmlFor="text">Password :</label>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p id="p1">Not a member ? <Link to={'/'}> <span className="spa1">Sign UP</span></Link> </p>
            
        </div>
    </div>
    );
};

export default Login;
