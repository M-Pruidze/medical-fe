import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo1 from '../../images/logo1.png';
import './style.css';
import CreateVisit from './Visit';
import List from './List';
import Logout from './Logout';
require('dotenv').config();

const userId = JSON.parse(localStorage.getItem('userId'));
let jwt;

const MedApp = () => {
    const history = useHistory();
    // const checkUser = async () => {
    //     try {
    //         const URL = `${process.env.REACT_APP_URL}user/${userId}/profile`;
    //         const resp = await axios.get(URL,{
    //             headers:{
    //                 Authorization: `Bearer ${jwt}`
    //             }
    //         }
    //         );
    //         console.log(`resp medapp`, resp)
    //     } catch (error) {
    //         if (error.response.status == '401') history.push('/login');
    //     }
    // };
    useEffect(() => {
        // await checkUser();
        jwt = JSON.parse(localStorage.getItem('token'));
        !jwt && history.push('/login');
    }, []);



    const [visitsList, setVisitsList] = useState([]);

    // get visits
    const getVisits = async () => {
        try {
            const jwt = JSON.parse(localStorage.getItem('token'));

            const URL = `${process.env.REACT_APP_URL}visit`;
            console.log(`URL`, URL)
            console.log(`jwt`, jwt)
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setVisitsList(response.data);
        } catch (error) {
            console.log(`error.response`, error.response)
        }
    }
    useEffect( async () => {
        await getVisits();
    }, []);

    return (
        <div className='container'>
            <header>
                <div className='imgContainer'>
                    <img src={logo1} alt='logo' />
                </div>
                <h1 className='headerOne'>Приемы</h1>
                <Logout />
            </header>
            <CreateVisit  setVisitsList={setVisitsList} visitsList={visitsList} />
            <List visitsList={visitsList} setVisitsList={setVisitsList} />
        </div>
    )
}

export default MedApp
