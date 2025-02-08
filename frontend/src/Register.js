import { useState } from "react";
import axios from "axios";
import './Register.css'
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const [first_name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate()
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3500/server/register", {first_name,  email, password });
            alert("Registration successful!");
            navigate('/login')
        } catch (err) {
            alert("Error registering user");
        }
    };

    

    return (
    <div className="register1">
        <div className="register2">
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
            <div className="label1">
                <label htmlFor="text">Nmae :</label>
                <input type="name" placeholder="Email" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="label1">
                <label htmlFor="text">Email :</label>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="label1">
                <label htmlFor="text">Password :</label>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p id="p1">Already have an account ? <Link to={'/login'}> <span className="spa1">Login</span></Link> </p>
            
        </div>
    </div>
    );
};

export default Register;
