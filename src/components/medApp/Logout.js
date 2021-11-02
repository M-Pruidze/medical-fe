import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        history.push('/login');
    }
    return <button type='button' onClick={handleClick}>Выход</button>
}

export default Logout
