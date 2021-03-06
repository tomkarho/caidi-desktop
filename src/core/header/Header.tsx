import './Header.scss';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../hooks';

export function Header() {
    const darkMode = useAppSelector(state => state.settings.darkMode);
    const extractionActive = useAppSelector(state => state.extractions.active);

    return (
        <header className={`flex flex--center-h ${darkMode ? 'dark' : ''}`}>
            <nav>
                <NavLink title="Navigate to extraction view" to="/">
                    <button disabled={extractionActive}>Extract</button>
                </NavLink>
                <NavLink title="Navigate to settings view" to="/settings">
                    <button disabled={extractionActive}>Settings</button>
                </NavLink>
            </nav>
        </header>
    );
}