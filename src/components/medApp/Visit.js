import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const userId = JSON.parse(localStorage.getItem('userId'));
const jwt = JSON.parse(localStorage.getItem('token'));

const Visit = ({setVisitsList, visitsList}) => {
    const [doctors, setDoctors] = useState([]);
    const [visit, setVisit] = useState({patientName: '', doctor:'', date: '', time: '', complaint: ''});
    const { patientName, doctor, date, time, complaint } = visit;

    const inputDoctor = useRef(null);
    const inputDate = useRef(null);
    const inputTime = useRef(null);
    const inputComplaint = useRef(null);
    const btnSubmit = useRef(null);

    const handleChange = (e) => {
        setVisit({...visit, [e.target.name] : e.target.value})
    }

    // add a visit
    const addVisit = async () => {
        try {
            // if (patientName.trim() && doctor && date && time && complaint.trim()) {
                const URL = `${process.env.REACT_APP_URL}visit`;
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

                console.log(`response-add`, response)
            // }
        } catch (error) {
            console.log(`error-add visit>>`, error.response)
        }
    }
    const handleSubmitVisit = async (e) => {
        console.log('g');
        e.preventDefault();
        await addVisit();
        setVisit({patientName: '', doctor:'', date: '', time: '', complaint: ''});

    console.log(`doctor>>`, doctor)
    }
    // get doctors
    const getDoctors = async () => {
        try {
            const URL = `${process.env.REACT_APP_URL}doctor`;
            const data = await axios.get(URL, {
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            });

            setDoctors([...data.data]);
            console.log(`data.data`, data.data)
            console.log(`doctors`, doctors)
        } catch (error) {
            console.log(`error.response`, error.response)
        }
    }
    useEffect( async () => {
        await getDoctors();
        console.log(`doctors`, doctors)
    }, [])

    // pressing the Enter key
    const handleKeyPressPatientName = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            inputDoctor.current.focus();
        }
    }
    const handleKeyPressDoctor = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            inputDate.current.focus();
        }
    }
    const handleKeyPressDate = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            inputTime.current.focus();
        }
    }
    const handleKeyPressTime = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            inputComplaint.current.focus();
        }
    }
    const handleKeyPressComplaint = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            btnSubmit.current.focus();
        }
    }

    // checking if all fields are filled
    const validate = () => {
        return patientName.trim() && doctor && date && time && complaint.trim()
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
                        onKeyPress={handleKeyPressPatientName}
                    />
                </div>
                <div className='singleField'>
                    <label htmlFor='doctor'>Врач:</label>
                    <select
                        value={doctor}
                        id='doctor'
                        name='doctor'
                        ref={inputDoctor}
                        onChange={handleChange}
                        onKeyPress={handleKeyPressDoctor}
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
                        ref={inputDate}
                        onChange={handleChange}
                        onKeyPress={handleKeyPressDate}
                    />
                </div>
                <div className='singleField'>
                    <label htmlFor='time'>время:</label>
                    <input
                        type='time'
                        value={time}
                        id='time'
                        name='time'
                        ref={inputTime}
                        onChange={handleChange}
                        onKeyPress={handleKeyPressTime}
                    />
                </div>
                <div className='singleField'>
                    <label htmlFor='complaint'>Жалобы:</label>
                    <input
                        type='text'
                        value={complaint}
                        id='complaint'
                        name='complaint'
                        ref={inputComplaint}
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
