import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

// redux reducers imports
import { loginFailed, loginStart, loginSuccess } from '../redux/user/userSlice'

// file imports
import Header from '../components/Header'
import Themes from '../components/Themes'
import Footer from '../components/Footer'

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            dispatch(loginStart());
            const { data } = await axios.post('/api/user/login', user);
            if (data.error) {
                dispatch(loginFailed());
                toast.error(data.error);
            } else {
                dispatch(loginSuccess(data));
                setUser({
                    email: "",
                    password: "",
                });
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            <Themes />
            <div id='login-page'>
                <div id='login-wrapper'>
                    <section id='login-sec1' >
                        <h1 id='login-title'>Log In</h1>
                        <form id="login-form" onSubmit={(e) => handleSubmit(e)} >

                            <div id='login-input-field'>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor='email'>Email</label>
                            </div>

                            <div id='login-input-field'>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor='password'>Password</label>
                            </div>

                            <div id='login-submit'>
                                <input
                                    type='submit'
                                    value='Log In'
                                    id='btn'
                                />
                            </div>

                        </form>
                    </section>
                    <section id='login-sec2' >
                        <p>Don't have an account ?</p>
                        <Link to='/' id='hyperlink' >Register</Link>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Login;


