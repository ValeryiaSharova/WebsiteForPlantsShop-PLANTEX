/* eslint-disable import/no-named-as-default-member */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getUserRole } from '../services/localStorage.service';
import { getIsLoggedIn, logOut } from '../store/user';

const Header = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState({ status: false, style: 'nav__menu' });
  const [iconTheme, setIconTheme] = useState('ri-moon-line');
  const clickToShowMenu = () => {
    if (showMenu.status) {
      setShowMenu({ status: false, style: 'nav__menu' });
    } else {
      setShowMenu({ status: true, style: 'nav__menu show-menu' });
    }
  };

  const changeTheme = () => {
    const darkTheme = 'dark-theme';

    const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light');
    const getCurrentIcon = () => (iconTheme === 'ri-sun-line' ? 'ri-moon-line' : 'ri-sun-line');

    document.body.classList.toggle(darkTheme);
    setIconTheme(getCurrentIcon());
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  };

  const isLoggedIn = useSelector(getIsLoggedIn());
  const isAdmin = getUserRole();

  return (
    <header className="header scroll-header" id="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          <i className="ri-leaf-line nav__logo-icon" /> Plantex
        </Link>

        <div className={showMenu.style} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                exact
                to="/"
                className="nav__link"
                activeClassName="active-link"
                onClick={clickToShowMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/products"
                className="nav__link"
                activeClassName="active-link"
                onClick={clickToShowMenu}
              >
                Products
              </NavLink>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav__item">
                  <NavLink
                    to="/cart"
                    className="nav__link"
                    activeClassName="active-link"
                    onClick={clickToShowMenu}
                  >
                    Cart
                  </NavLink>
                </li>
                {isAdmin === 'admin' ? (
                  <li className="nav__item">
                    <NavLink
                      to="/admin"
                      className="nav__link"
                      activeClassName="active-link"
                      onClick={clickToShowMenu}
                    >
                      Admin
                    </NavLink>
                  </li>
                ) : null}

                <li className="nav__item">
                  <span className="nav__link" onClick={() => dispatch(logOut())}>
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <li className="nav__item">
                <NavLink
                  to="/login"
                  className="nav__link"
                  activeClassName="active-link"
                  onClick={clickToShowMenu}
                >
                  LogIn
                </NavLink>
              </li>
            )}
          </ul>

          <div className="nav__close" id="nav-close" onClick={clickToShowMenu}>
            <i className="ri-close-line" />
          </div>
        </div>

        <div className="nav__btns">
          <i className={`${iconTheme} change-theme`} id="theme-button" onClick={changeTheme} />
          <div className="nav__toggle" id="nav-toggle" onClick={clickToShowMenu}>
            <i className="ri-menu-line" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
