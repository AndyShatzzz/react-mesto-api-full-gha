import React from "react";
import {Link, useLocation} from "react-router-dom";

function Auth ({ title, children, onSubmit }){
    const location = useLocation();
    return (
        <div className="login">
            <form className="login__form" onSubmit={onSubmit}>
                <fieldset className="login__set">
                    <h1 className="login__title">{title}</h1>
                    {children}
                    {location.pathname === '/signup' && (<Link className='login__button-sign-up' to={'/signin'}>Уже зарегистрированы? Войти</Link>)}
                </fieldset>
            </form>

        </div>

    )
}

export default Auth;