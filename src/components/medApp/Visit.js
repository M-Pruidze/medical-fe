import React, { useState, useRef } from 'react';
import axios from 'axios';
import config from '../../config';

const Visit = ({doctors, setVisitsList, visitsList}) => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const jwt = JSON.parse(localStorage.getItem('token'));
    const [visit, setVisit] = useState({patientName: '', doctor:'', date: '', time: '', complaint: ''});
    const { patientName, doctor, date, time, complaint } = visit;

    const btnSubmit = useRef(null);

    const handleChange = (e) => {
        setVisit({...visit, [e.target.name] : e.target.value});
    }

    // add a visit
    const addVisit = async () => {
        try {
                const URL = `${config.url}visit`;
                const response = await axios.post(URL, {
                        username: patientName,
                        doctorId: doctor,
                        date: `${date}T${time}Z`,
                        complaints: complaint,
                        userId,
                    }, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                }
                );
                setVisitsList([...visitsList, response.data]);
        } catch (error) {
            console.log(`error-add visit>>`, error.response);
        }
    }
    const handleSubmitVisit = async (e) => {
        e.preventDefault();
        await addVisit();
        setVisit({patientName: '', doctor:'', date: '', time: '', complaint: ''});
    }

    // pressing the Enter key
    const handleKeyPressComplaint = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            btnSubmit.current.focus();
        }
    }

    // date constiables
    const dob = new Date();
    const month = dob.getMonth();
    const day   = dob.getDay() <= 9 ? `0${dob.getDay()}` : dob.getDay();
    const year  = dob.getFullYear();
    const today = `${year}-${month+1}-${day}`;
    const nextYear = `${year + 1}-${month+1}-${day}`;
    const hours = dob.getHours() <= 9 ? `0${dob.getHours()}` : dob.getHours();
    const minutes = dob.getMinutes() <= 9 ? `0${dob.getMinutes()}` : dob.getMinutes();
    const currentTime = `${hours}:${minutes}`;

    let givenDate = date;
    const currentDate = dob;
    givenDate = new Date(givenDate);
    const maxDate = new Date(`${year + 1}-${month + 1}-${day}`);

    // checking if all fields are valid
    const validate = () => {
        return patientName.trim() && doctor && date && givenDate > currentDate && givenDate < maxDate && time && complaint.trim();
    }

    return (
        <form className='inputsContainer' onSubmit={handleSubmitVisit} >
                <div className='singleField'>
                    <label htmlFor='patientName'>Имя:</label>
                    <input
                        type='text'
                        id='patientName'
                        value={patientName}
                        name='patientName'
                        onChange={handleChange}
                    />
                </div>
                <div className='singleField'>
                    <label htmlFor='doctor'>Врач:</label>
                    <select
                        value={doctor}
                        id='doctor'
                        name='doctor'
                        onChange={handleChange}
                    >
                        <option value=''></option>
                        {doctors.map((doctor, index) => {
                            const { doctorName, _id, specialty} = doctor;
                            return <option value={`${doctorName} - ${specialty}`} key={_id}>{doctorName} - {specialty}</option>
                        }
                        )}
                    </select>
                </div>
                <div className='singleField'>
                    <label htmlFor='date'>Дата:</label>
                    <input
                        type='date'
                        value={date}
                        id='date'
                        name='date'
                        min={today}
                        max={nextYear}
                        onChange={handleChange}
                    />
                </div>
                <div className='singleField'>
                    <label htmlFor='time'>Время:</label>
                    <input
                        type='time'
                        value={time}
                        id='time'
                        name='time'
                        onChange={handleChange}
                    />
                </div>
                <div className='singleField'>
                    <label htmlFor='complaint'>Жалобы:</label>
                    <input
                        type='text'
                        value={complaint}
                        id='complaint'
                        name='complaint'
                        onChange={handleChange}
                        onKeyPress={handleKeyPressComplaint}
                    />
                </div>
                <button
                    type='submit'
                    disabled={!validate()}
                    ref={btnSubmit}
                >Добавить</button>
        </form>
    )
}

export default Visit
