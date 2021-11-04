import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import CreateVisit from './Visit';
import List from './List';
import Logout from './Logout';
import config from '../../config';

const userId = JSON.parse(localStorage.getItem('userId'));
let jwt;

const MedApp = () => {
    const [doctors, setDoctors] = useState([]);
    const [visitsList, setVisitsList] = useState([]);
    const history = useHistory();

    useEffect(async () => {
        jwt = JSON.parse(localStorage.getItem('token'));
        !jwt && history.push('/login');
        await getDoctors();
        await getVisits();
    }, []);

    // get doctors
    const getDoctors = async () => {
        try {
            const URL = `${config.url}doctor`;
            const data = await axios.get(URL, {
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            });

            setDoctors([...data.data]);
        } catch (error) {
            console.log(`error.response`, error.response)
        }
    }

    // get visits
    const getVisits = async () => {
        try {
            const jwt = JSON.parse(localStorage.getItem('token'));

            const URL = `${config.url}visit?fromDate=&toDate=`;
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

    return (
        <div className='container'>
            <header>
                <div className='imgContainer'>
                    <img src={process.env.PUBLIC_URL + '/images/logo1.png'} alt='logo' />
                </div>
                <h1 className='headerOne'>Приемы</h1>
                <Logout />
            </header>
            <CreateVisit doctors={doctors}  setVisitsList={setVisitsList} visitsList={visitsList} />
            <List doctors={doctors} visitsList={visitsList} setVisitsList={setVisitsList} />
        </div>
    )
}

export default MedApp