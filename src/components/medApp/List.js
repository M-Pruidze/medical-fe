import React, { useState, useEffect } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import DeleteWindow from './DeleteWindow';
import EditWindow from './EditWindow';
import SortComponent from './SortComponent';
import FilterComponent from './FilterComponent';

const List = ({doctors, visitsList, setVisitsList}) => {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [editVisit, setEditVisit] = useState({usernameInput:'', doctorInput: '', dateInput:'', timeInput:'', complaintInput: '', _id:'',});
    const [deleteVisit, setDeleteVisit] = useState({});

    const [isSorting, setIsSorting] = useState(false);
    const [sortField, setSortField] = useState('');

    const [isFilterBtnClicked, setIsFilterBtnClicked] = useState(false);

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
    const handleClickFilterBtn = () => {
        setIsSorting(false);
        setSortField('noOption');
        setIsFilterBtnClicked(true);
    }

    return <main className='list'>
        {visitsList.length !== 0 &&
        <>
            <div className='sort_filter'>
                <SortComponent
                    isSorting={isSorting}
                    setIsSorting={setIsSorting}
                    sortField={sortField}
                    setSortField={setSortField}
                    visitsList={visitsList}
                    setVisitsList={setVisitsList}
                />
                { !isFilterBtnClicked &&
                <div className='filterContainer'>
                    <label>Добавить фильтр по дате:</label>
                    <button
                        type='button'
                        className='addBtn'
                        onClick={handleClickFilterBtn}
                    >
                        <BsFillPlusSquareFill />
                    </button>
                </div>
                }
            </div>
            { isFilterBtnClicked &&
            <FilterComponent
                setIsFilterBtnClicked={setIsFilterBtnClicked}
                visitsList={visitsList}
                setVisitsList={setVisitsList}
            />}
        </>
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
