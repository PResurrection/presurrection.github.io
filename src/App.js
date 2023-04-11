import React from 'react';
import {useState, useEffect} from 'react';

import Header from './components/Header';
import Login from './components/Login';
import Content from './components/Content';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

export default function App() {
    const userName = localStorage.getItem("userName");

    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
        if (userName != null) {
            fetch("/shop/get-user-data?" + new URLSearchParams({
                userName: userName
            })).then(response => response.json())
                .then(data => {
                    setUserData(data);

                    setLoading(false);
                });
        }
    }, []);
    
    const [loading, setLoading] = useState(true); // идет загрузка?

    return (
        <React.Fragment>
            <Header userData={userData} />
            
            { !userName ? (
                <Login/>
            ) : loading ? (
                <Preloader />
            ) : (
                <Content userData={userData} />
            )}

            <Footer />
        </React.Fragment>
    );
}
