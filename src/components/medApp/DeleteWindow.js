import axios from 'axios';
import React from 'react';
import config from '../../config';

const DeleteWindow = ({deleteVisit, deleting, setDeleting, visitsList, setVisitsList}) => {
    const {_id} = deleteVisit;
    const handleClickDelete = async (index) => {
        const jwt = JSON.parse(localStorage.getItem('token'));
        const URL = `${config.url}visit/${index}`;
        await axios.delete(URL,{
            headers: {Authorization: `Bearer ${jwt}`},
        });
        setVisitsList(visitsList.filter(item => item._id !== index));
        setDeleting(!deleting);

    }
    return (
        <div className='deleteWindow'>
            <div className='delete-content'>
                <div className='header'>
                Удалить прием
                </div>
                <div className='main'>
                Вы действительно хотите удалить прием?
                </div>
                <div className='buttons'>
                    <button type='button' onClick={() => setDeleting(!deleting)}>cancel</button>
                    <button type='button' onClick={() => handleClickDelete(_id)}>delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWindow
