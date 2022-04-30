import './Header.scss';
import React from 'react';
import {NavLink} from 'react-router-dom';

export function Header() {
    return (
        <header className="flex flex--center-h">
            <nav>
                <NavLink title="Navigate to extraction view" to="/">Extract</NavLink>
                <NavLink title="Navigate to settings view" to="/settings">Settings</NavLink>
            </nav>
        </header>
    );
}