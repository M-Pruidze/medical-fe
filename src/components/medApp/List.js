import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import DeleteWindow from './DeleteWindow';
import EditWindow from './EditWindow';

const List = ({visitsList, setVisitsList}) => {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    console.log(`visitsList-from List>>`, visitsList)

    return <main className='list'>
        {visitsList.map((visit,index) => {
            const {username, doctorId, date, complaints} = visit;
            const visitDate = date.slice(0,10);
            const visitTime = date.slice(11,16);
            const visitId = visit._id;

            return <article key={index} className='singleVisit'>
                {deleting && <DeleteWindow setDeleting={setDeleting} deleting={deleting} visitId = {visitId} visitsList={visitsList} setVisitsList={setVisitsList} />}
                {/* {editing && <EditWindow setEditing={setEditing} editing={editing} visitId = {visitId} visitsList={visitsList} setVisitsList={setVisitsList} />} */}
                <p>{username}</p>
                <p>{doctorId}</p>
                <p>{visitDate} {visitTime}</p>
                <p>{complaints}</p>
                <div className='buttons'>
                    <button type='button' onClick={() => setDeleting(!deleting)}><MdDeleteOutline /></button>
                    <button type='button' onClick={() => setEditing(!editing)}><AiFillEdit /></button>
                </div>
            </article>
        })}
    </main>
}

export default List
