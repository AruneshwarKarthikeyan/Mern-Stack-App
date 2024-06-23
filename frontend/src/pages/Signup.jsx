import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

// file imports
import Header from "../components/Header";
import Footer from "../components/Footer";
import Themes from "../components/Themes";

function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
    });
    const navigate = useNavigate();

    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setUser((prevUser) => ({ ...prevUser, [name]: value }));
        },
        []
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/user/signup", user);
            if (data.error) {
                toast.error(data.error);
            } else {
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    confirmpassword: "",
                });
                navigate("/login");
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <Themes />
            <div id="signup-page">
                <div id="signup-wrapper">
                    <section id="signup-sec1">
                        <h1 id="signup-title">Sign Up</h1>
                        <form id="signup-form" onSubmit={(e) => handleSubmit(e)}>

                            <div id="signup-input-field">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="name">Name</label>
                            </div>

                            <div id="signup-input-field">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div id="signup-input-field">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            <div id="signup-input-field">

                                <input
                                    type="password"
                                    id="conpassword"
                                    name="confirmpassword"
                                    value={user.confirmpassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="conpassword">Confirm Password</label>
                            </div>

                            <div id="signup-submit">
                                <input
                                    type="submit"
                                    value="Sign Up"
                                    id="btn"
                                />
                            </div>

                        </form>
                    </section>
                    <section id="signup-sec2">
                        <p>Already had an account ?</p>
                        <Link to="/login" id="hyperlink"> Log In </Link>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signup
