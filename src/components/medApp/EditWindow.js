import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const EditWindow = ({doctors, editVisit, setEditVisit, editing, setEditing, visitsList, setVisitsList}) => {
    const {usernameInput, doctorInput, dateInput, timeInput, complaintInput, _id} = editVisit;

    // remove refs and their usage
    const inputDoctor = useRef(null);
    const inputDate = useRef(null);
    const inputTime = useRef(null);
    const inputComplaint = useRef(null);
    const btnSubmit = useRef(null);
    const inputName = useRef(null);

    const jwt = JSON.parse(localStorage.getItem('token'));

    // edit a visit
    const editingVisit = async () => {
        try {
            const URL = `${process.env.REACT_APP_URL}visit/${_id}`;
            const response = await axios.put(URL, {
                    username: usernameInput,
                    doctorId: doctorInput,
                    date: `${dateInput}T${timeInput}Z`,
                    complaints: complaintInput,
                }, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            const newArr = visitsList.map(item => {
                    console.log(`item`, item)
                    console.log(`editVisit`, editVisit)
                if (item._id === editVisit._id) {
                    console.log('shevida');
                    return {...item, ...response.data}
                } else return item;
            })
            setVisitsList(newArr);
            console.log(newArr)
            console.log(`response-edit`, response)
        } catch (error) {
            console.log(`error-edit visit>>`, error.response)
        }
    }

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
    const handleKeyPressBtnSubmit = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            inputName.current.focus();
        }
    }

    const handleClickEdit = async () => {
        console.log('in edit window button edit');
        await editingVisit();
        setEditVisit({usernameInput:'', doctorInput: '', dateInput:'', timeInput:'', complaintInput: '', id:'',});
        setEditing(!editing);
    }

    //  get all visits, and add onkeypress "Enter"

    const handleChange = (e) => {
        setEditVisit({...editVisit, [e.target.name]: e.target.value})
    }
    return (
        <div className='editWindow'>
            <div className='edit-content'>
                <div className='header'>
                edit прием
                </div>
                <div className='main'>
                <input
                    type='text'
                    value={usernameInput}
                    name='usernameInput'
                    ref={inputName}
                    onChange={handleChange}
                    onKeyPress={handleKeyPressPatientName}
                />
                <select
                    value={doctorInput}
                    onKeyPress={handleKeyPressDoctor}
                    name='doctorInput'
                    ref={inputDoctor}
                    onChange={handleChange}
                >
                    <option value=''></option>
                    {doctors.map((doctor, index) => {
                        const { doctorName, _id, specialty} = doctor;
                        return <option value={`${doctorName} - ${specialty}`} key={_id}>{doctorName} - {specialty}</option>
                        }
                    )}
                </select>
                <input
                    type='date'
                    value={dateInput}
                    onKeyPress={handleKeyPressDate}
                    name='dateInput'
                    ref={inputDate}
                    onChange={handleChange}
                    />
                <input
                    type='time'
                    value={timeInput}
                    onKeyPress={handleKeyPressTime}
                    name='timeInput'
                    ref={inputTime}
                    onChange={handleChange}
                    />
                <input
                    type='text'
                    value={complaintInput}
                    onKeyPress={handleKeyPressComplaint}
                    name='complaintInput'
                    ref={inputComplaint}
                    onChange={handleChange}
                    />
                </div>
                <div className='header btns'>
                    <button type='button' onClick={() => setEditing(!editing)}>cancel</button>
                    <button type='button' onClick={handleClickEdit} ref={btnSubmit} >edit</button>
                </div>
            </div>
        </div>
    )
}

export default EditWindow
