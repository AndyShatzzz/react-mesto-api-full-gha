import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../image/header-logo.svg';

function Header({ headerEmail, onSignOut }) {

  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <div className="header__nav-bar">
        <p className="header__email">{headerEmail}</p>
        {location.pathname === '/signin' && (<Link className='header__navigation' to={'/signup'}>Регистрация</Link>)}
        {location.pathname === '/signup' && (<Link className='header__navigation' to={'/signin'}>Войти</Link>)}
        {location.pathname === '/' && (<button type='button' className='header__navigation' to={'/signin'}
          onClick={onSignOut}>Выйти</button>)}
      </div>
    </header>
  );
}

export default Header;