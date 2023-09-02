import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import Header from "./Header";

function Login({ onLoginSubmit, loggedIn }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();

    React.useEffect(() => {
        if (loggedIn) {
            navigate('/', { replace: true });
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
        onLoginSubmit({
            password: password,
            email: email,
        });
    }


    return (
        <>
            <Header
                nav={<Link to="signin" className="header__navigation">Регистрация</Link>}
            />
            <Auth
                title={'Вход'}
                onSubmit={handleSubmit}
                children={
                    <>
                        <input type="email" className="login__input" placeholder="Email" name="email-registration"
                            id="email-input-registration-login" required value={email} onChange={handleEmailChange}></input>
                        <input type="password" className="login__input" placeholder="Пароль" name="password-registration"
                            id="password-input-registration-login"
                            required value={password} onChange={handlePasswordChange}></input>
                        <button type="submit" className="login__button-submit">Войти</button>

                    </>
                }
            />
        </>
    )
}

export default Login;