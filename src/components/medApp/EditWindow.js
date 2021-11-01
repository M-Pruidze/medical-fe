import React, {useRef} from 'react';
import axios from 'axios';

const EditWindow = ({doctors, editVisit, setEditVisit, editing, setEditing, visitsList, setVisitsList}) => {
    const {usernameInput, doctorInput, dateInput, timeInput, complaintInput, _id} = editVisit;

    const btnSubmit = useRef(null);

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
            setVisitsList(visitsList.map(item => {
                if (item._id === editVisit._id) {
                    return {...item, ...response.data};
                } else return item;
            }))
        } catch (error) {
            console.log(`error-edit visit>>`, error.response);
        }
    }

    // pressing the Enter key
    const handleKeyPressComplaint = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            btnSubmit.current.focus();
        }
    }

    const handleClickEdit = async () => {
        await editingVisit();
        setEditVisit({usernameInput:'', doctorInput: '', dateInput:'', timeInput:'', complaintInput: '', id:'',});
        setEditing(!editing);
    }

    const handleChange = (e) => {
        setEditVisit({...editVisit, [e.target.name]: e.target.value});
    }

    // date variables
    const dob = new Date();
    const month = dob.getMonth();
    const day   = dob.getDay() <= 9 ? `0${dob.getDay()}` : dob.getDay();
    const year  = dob.getFullYear();
    const today = `${year}-${month+1}-${day}`;
    const hours = dob.getHours() <= 9 ? `0${dob.getHours()}` : dob.getHours();
    const minutes = dob.getMinutes() <= 9 ? `0${dob.getMinutes()}` : dob.getMinutes();
    const time = `${hours}:${minutes}`;
    console.log(`today`, today)
    console.log(`time`, time)

    // checking if all fields are filled
    const validate = () => {
        return usernameInput.trim() && doctorInput && dateInput && dateInput.slice(0,4) >= year && timeInput && timeInput >= time && complaintInput.trim();
    }

    return (
        <div className='editWindow'>
            <div className='edit-content'>
                <div className='header'>
                Изменить прием
                </div>
                <div className='main'>
                    <div className='singleField'>
                        <label htmlFor='usernameInput'>Имя:</label>
                        <input
                            type='text'
                            id='usernameInput'
                            value={usernameInput}
                            name='usernameInput'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='singleField'>
                        <label htmlFor='doctorInput'>Врач:</label>
                        <select
                            value={doctorInput}
                            id='doctorInput'
                            name='doctorInput'
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
                        <label htmlFor='dateInput'>Дата:</label>
                        <input
                            type='date'
                            id='dateInput'
                            value={dateInput}
                            name='dateInput'
                            min={today}
                            onChange={handleChange}
                            />
                    </div>
                    <div className='singleField'>
                        <label htmlFor='timeInput'>время:</label>
                        <input
                            type='time'
                            id='timeInput'
                            value={timeInput}
                            name='timeInput'
                            min={time}
                            onChange={handleChange}

                            />
                    </div>
                    <div className='singleField'>
                        <label htmlFor='complaintInput'>Жалобы:</label>
                        <textarea
                            type='text'
                            id='complaintInput'
                            value={complaintInput}
                            onKeyPress={handleKeyPressComplaint}
                            name='complaintInput'
                            onChange={handleChange}
                            />
                    </div>
                </div>
                <div className='buttons'>
                    <button type='button' onClick={() => setEditing(!editing)}>cancel</button>
                    <button
                        type='button'
                        ref={btnSubmit}
                        disabled={!validate()}
                        onClick={handleClickEdit}
                    >save</button>
                </div>
            </div>
        </div>
    )
}

export default EditWindow
