import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Auth from "./Auth";

function Register({ onRegisterSubmit, loggedIn }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (loggedIn) {
            navigate('/signin', { replace: true });
        }
    }, [loggedIn, navigate])

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegisterSubmit({
            password: password,
            email: email,
        });
    }

    return (
        <>
            <Header
                nav={location.pathname === 'signin' && (<Link className='header__navigation' to={'signup'}>Регистрация</Link>)}

            />
            <Auth
                title={'Регистрация'}
                onSubmit={handleSubmit}
                children={
                    <>
                        <input type="email" className="login__input" placeholder="Email" name="email-registration"
                            id="email-input-registration" required value={email} onChange={handleEmailChange} ></input>
                        <input type="password" className="login__input" placeholder="Пароль" name="password-registration"
                            id="password-input-registration" minLength='6' maxLength='40'
                            required value={password} onChange={handlePasswordChange} ></input>
                        <button type="submit" className="login__button-submit">Зарегистрироваться</button>
                    </>
                }
            />
        </>
    )
}

export default Register;