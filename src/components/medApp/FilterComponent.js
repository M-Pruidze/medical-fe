import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

const FilterComponent = ({setIsFilterBtnClicked, visitsList, setVisitsList}) => {
    const [dates, setDates] = useState({fromDate: '', toDate: ''});
    const { fromDate, toDate} = dates;

    const handleDateChange = (e) => {
        setDates({...dates, [e.target.name]: e.target.value});
    }

    const handleClickFilter = async (e) => {
        e.preventDefault();
        console.log(`dates filter click`, dates);
        // await requests
        // setVisitsList(resp.data)
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
                type='button'
                className='clearBtn'
                onClick={() => setIsFilterBtnClicked(false)}
            ><MdDeleteOutline /></button>
        </div>
    </>
}

export default FilterComponent
