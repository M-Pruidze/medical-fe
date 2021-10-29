import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';

const List = ({visitsList}) => {
    console.log(`visitsList-from List>>`, visitsList)
    return <main className='list'>
        {visitsList.map((visit,index) => {
            const {username, doctorId, date, complaints} = visit;
            const visitDate = date.slice(0,10);
            const visitTime = date.slice(11,16);

            return <article key={index} className='singleVisit'>
                <p>{username}</p>
                <p>{doctorId}</p>
                <p>{visitDate} {visitTime}</p>
                <p>{complaints}</p>
                <div className='buttons'>
                    <button><MdDeleteOutline /></button>
                    <button><AiFillEdit /></button>
                </div>
            </article>
        })}
    </main>
}

export default List
