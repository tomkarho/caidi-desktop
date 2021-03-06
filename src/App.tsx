import React, {useEffect} from 'react';
import './App.scss';
import {Header} from './core/header/Header';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ExtractPage from './features/extract/ExtractPage';
import SettingsPage from './features/settings/SettingsPage';

declare global {
    interface Window {
        electron: any;
    }
}

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<ExtractPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
