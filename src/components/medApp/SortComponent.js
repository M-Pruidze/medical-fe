import React, { useState, useEffect } from 'react';

const SortComponent = ({visitsList, setVisitsList}) => {
    const [sort, setSort] = useState({});
    const [isSorting, setIsSorting] = useState(false);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState(undefined);

    const [initialList, setInitialList] = useState(visitsList);
    const [sortType, setSortType] = useState('');

    const handleChangeSortField = (e) => {
        setSortField(e.target.value);
        setSortType(e.target.value);
    };

    useEffect(() => {
        if (sortField == 'nameOption' || sortField == 'doctorOption' || sortField == 'dateOption') setIsSorting(true);
        else setIsSorting(false);
    }, [sortField]);

    const handleChangeSortDirection = (e) => {
        setSortDirection(e.target.value);
    }

    useEffect(() => {
        const sortArray = type => {
            const types = {
                nameOption: 'username',
                doctorOption: 'doctorId',
                dateOption: 'date',
            };
            const sortProperty = types[type];

            if (sortDirection == 'ascending') {
                const sorted = [...visitsList].sort((a, b) => {
                if (a[sortProperty] < b[sortProperty]) return -1;
                else if (a[sortProperty] > b[sortProperty]) return 1;
                return 0;
            });
                setVisitsList(sorted);
            }
            else if (sortDirection == 'descending') {
                const sorted = [...visitsList].sort((a, b) => {
                if (a[sortProperty] < b[sortProperty]) return 1;
                else if (a[sortProperty] > b[sortProperty]) return -1;
                return 0;
            });
                setVisitsList(sorted);
            }
            if (sortType == 'noOption') setVisitsList(initialList);
        };

        sortArray(sortType);
    }, [sortType, sortDirection]);


    return (
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
                    <option value='nameOption' >Имя</option>
                    <option value='doctorOption' >Врач</option>
                    <option value='dateOption' >Дата</option>
                    <option value='noOption' >None</option>
                </select>
            </div>
            {isSorting &&
                <div className='sortField'>
                    <label htmlFor='sort'>Направление:</label>
                    <select
                        value={sortDirection}
                        id='sort'
                        name='sort'
                        onChange={handleChangeSortDirection}
                    >
                        <option value=''></option>
                        <option value='ascending' >По возрастанию</option>
                        <option value='descending' >По убыванию</option>
                    </select>
                </div>
            }
        </div>
    )
}

export default SortComponent
