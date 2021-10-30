import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
// import { AiFillEdit } from 'react-icons/ai';
import DeleteWindow from './DeleteWindow';
import EditWindow from './EditWindow';

const List = ({doctors, visitsList, setVisitsList}) => {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [editVisit, setEditVisit] = useState({usernameInput:'', doctorInput: '', dateInput:'', timeInput:'', complaintInput: '', _id:'',});

    console.log(`visitsList-from List>>`, visitsList)

    const handleClickEdit = (index) => {
        const specificVisit = visitsList.find(visit => visit._id === index);
        setEditing(!editing);
        setEditVisit({...editVisit,
            usernameInput: specificVisit.username,
            doctorInput: specificVisit.doctorId,
            dateInput: specificVisit.date.slice(0,10),
            timeInput: specificVisit.date.slice(11,16),
            complaintInput: specificVisit.complaints,
            _id: index,
        })
    }

    return <main className='list'>
        {visitsList.map((visit,index) => {
            const {username, doctorId, date, complaints} = visit;
            const visitDate = date.slice(0,10);
            const visitTime = date.slice(11,16);
            const visitId = visit._id;

            return <article key={index} className='singleVisit'>
                {deleting && <DeleteWindow setDeleting={setDeleting} deleting={deleting} visitId = {visitId} visitsList={visitsList} setVisitsList={setVisitsList} />}
                {editing && <EditWindow {...visit} doctors={doctors} editVisit={editVisit} setEditVisit={setEditVisit} setEditing={setEditing} editing={editing} visitId = {visitId} visitsList={visitsList} setVisitsList={setVisitsList} />}
                <p>{username}</p>
                <p>{doctorId}</p>
                <p>{visitDate} {visitTime}</p>
                <p>{complaints}</p>
                <div className='buttons'>
                    <button type='button' onClick={() => setDeleting(!deleting)}><MdDeleteOutline /></button>
                    {/* <button type='button' onClick={() => handleClickEdit(visitId)}><AiFillEdit /></button> */}
                    <button type='button' onClick={() => handleClickEdit(visitId)}>edit</button>
                </div>
            </article>
        })}
    </main>
}

export default List
