import axios from 'axios';
import React, { useEffect } from 'react'
require('dotenv').config();

const userId = JSON.parse(localStorage.getItem('userId'));
const jwt = JSON.parse(localStorage.getItem('token'));

const MedApp = () => {
    const checkUser = async () => {
        try {
            console.log(`userId`, userId)
            console.log(`process.env.REACT_APP_URL`, process.env.REACT_APP_URL)
            const URL = `${process.env.REACT_APP_URL}user/${userId}/profile`;
            const resp = await axios.get(URL,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            console.log(`resp`, resp)
        } catch (error) {
            console.log(`error login`, error)
        }
    };
    useEffect(() => {
        checkUser();
    }, [])
    return (
        <div>
            med app
        </div>
    )
}

export default MedApp
