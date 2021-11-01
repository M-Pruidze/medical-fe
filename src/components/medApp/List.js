import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import DeleteWindow from './DeleteWindow';
import EditWindow from './EditWindow';

const List = ({doctors, visitsList, setVisitsList}) => {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [editVisit, setEditVisit] = useState({usernameInput:'', doctorInput: '', dateInput:'', timeInput:'', complaintInput: '', _id:'',});
    const [deleteVisit, setDeleteVisit] = useState({});

    const [sort, setSort] = useState({});
    const [isSorting, setIsSorting] = useState(false);
    const [sortField, setSortField] = useState('');

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
        });
    };
    const handleClickDelete = (index) => {
        const specificVisit = visitsList.find(visit => visit._id === index);
        setDeleting(!deleting);
        setDeleteVisit(specificVisit);
    };
    const handleChangeSortField = (e) => {
        setSortField(e.target.value);
        if (sortField) setIsSorting(true);
    }
    console.log(`sortField`, sortField);

    return <main className='list'>
        {visitsList.length !== 0 &&
            <div className='sortFieldsContainer'>
                    <div className='sortField'>
                            <label htmlFor='sort'>Сортировать по:</label>
                            <select
                                value={sortField}
                                id='sort'
                                name='sort'
                                onChange={handleChangeSortField}
                            >
                                <option value=''></option>
                                <option value='nameOption'>Имя</option>
                                <option value='doctorOption'>Врач</option>
                                <option value='dateOption'>Дата</option>
                                <option value='noOption'>None</option>
                            </select>
                </div>
                {isSorting &&
                    <div className='sortField'>
                                <label htmlFor='sort'>Направление:</label>
                                <select
                                    value={sortField}
                                    id='sort'
                                    name='sort'
                                    // onChange={handleChangeSortField}
                                >
                                    <option value=''></option>
                                    <option value='ascending'>По возрастанию</option>
                                    <option value='descending'>По убыванию</option>
                                </select>
                    </div>
                }
            </div>
        }

        {visitsList.length !== 0 &&
            <div className='listTitles'>
                <p>Имя</p>
                <p>Врач</p>
                <p>Дата</p>
                <p>Жалобы</p>
                <p></p>
            </div>
        }
        {visitsList.map((visit,index) => {
            const {username, doctorId, date, complaints} = visit;
            const visitDate = date.slice(0,10);
            const visitTime = date.slice(11,16);
            const visitId = visit._id;

            return <article key={index} className='singleVisit'>
                {deleting && <DeleteWindow setDeleting={setDeleting} deleteVisit={deleteVisit} deleting={deleting} visitsList={visitsList} setVisitsList={setVisitsList} />}
                {editing && <EditWindow doctors={doctors} editVisit={editVisit} setEditVisit={setEditVisit} setEditing={setEditing} editing={editing} visitsList={visitsList} setVisitsList={setVisitsList} />}
                <p>{username}</p>
                <p>{doctorId}</p>
                <p>{visitDate} {visitTime}</p>
                <p>{complaints}</p>
                <div className='buttons'>
                    <button type='button' onClick={() => handleClickDelete(visitId)}><MdDeleteOutline /></button>
                    <button type='button' onClick={() => handleClickEdit(visitId)}><AiFillEdit /></button>
                </div>
            </article>
        })}
    </main>
}

export default List
