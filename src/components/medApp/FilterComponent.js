import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import config from '../../config';

const FilterComponent = ({setIsFilterBtnClicked, visitsList, setVisitsList}) => {
    const [dates, setDates] = useState({fromDate: '', toDate: ''});
    const { fromDate, toDate} = dates;

    const [initialList, setInitialList] = useState(visitsList);

    const handleDateChange = (e) => {
        setDates({...dates, [e.target.name]: e.target.value});
    }
    // get visits
    const getVisits = async () => {
        try {
            const jwt = JSON.parse(localStorage.getItem('token'));
            const URL = `${config.url}visit?fromDate=${fromDate}&toDate=${toDate}`;
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setVisitsList(response.data);
        } catch (error) {
            console.log(`error.response`, error.response);
        }
    }

    const handleClickFilter = async (e) => {
        e.preventDefault();
        if (!fromDate && !toDate) setVisitsList(initialList);
        else await getVisits();
        setDates({fromDate: '', toDate: ''});
    }

    return <>
        <div className='filterInputsContainer'>
            <div className='filterSingleInputCont'>
                <label htmlFor='fromDate'>с :</label>
                <input
                    type='date'
                    id='fromDate'
                    name='fromDate'
                    value={fromDate}
                    onChange={handleDateChange}
                />
            </div>
            <div className='filterSingleInputCont'>
                <label htmlFor='toDate'>по :</label>
                <input
                    type='date'
                    id='toDate'
                    name='toDate'
                    value={toDate}
                    onChange={handleDateChange}
                />
            </div>
            <button
                type='submit'
                className='filterBtn'
                onClick={handleClickFilter}
            >Фильтровать</button>
            <button
                type='submit'
                className='clearBtn'
                onClick={() => {
                    setIsFilterBtnClicked(false);
                    setVisitsList(initialList);
                }}
            ><MdDeleteOutline /></button>
        </div>
    </>
}

export default FilterComponent
