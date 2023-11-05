import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { login, getUserLoggedIn } from './utils/fetch';
import Header from './components/Header';
import MyTeamPage from './pages/MyTeamPage';
import JoinRequestPage from './pages/JoinRequestPage';

function App() {
    const [user, setUser] = React.useState(null);
    const [intialization, setInitialization] = React.useState(false);

    React.useEffect(() => {
        getUserLoggedIn().then((data) => {
            setUser(data);
            setInitialization(false);
        });
    }, []);

    async function onLogin(user) {
        const response = await login(user);
        if (response) {
            getUserLoggedIn().then((data) => {
                setUser(data);
            });
        }
    }

    return (
        <div className="app-container">
            <Header />
            <Routes>
                <Route path="/myteam" element={<MyTeamPage />} />
                <Route path="/joinrequest" element={<JoinRequestPage />} />
            </Routes>
        </div>
    );
}

export default App;
