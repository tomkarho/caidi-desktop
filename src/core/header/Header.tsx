import './Header.scss';
import React from 'react';
import {NavLink} from 'react-router-dom';

export function Header() {
    return (
        <header className="flex flex--center-h">
            <nav>
                <NavLink to="/">Extract</NavLink>
                <NavLink to="/settings">Settings</NavLink>
            </nav>
        </header>
    );
}