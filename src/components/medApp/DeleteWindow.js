import axios from 'axios';
import React from 'react'

const DeleteWindow = ({deleting, setDeleting, visitId, visitsList, setVisitsList}) => {
    console.log(`visitId`, visitId)
    const handleClickDelete = async (index) => {
        const jwt = JSON.parse(localStorage.getItem('token'));
        const URL = `${process.env.REACT_APP_URL}visit/${index}`;
        console.log(`URL`, URL)
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
                <div className='header btns'>
                    <button type='button' onClick={() => setDeleting(!deleting)}>cancel</button>
                    <button type='button' onClick={() => handleClickDelete(visitId)}>delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWindow
