import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return <div className='err-component'>
        <main className='err-content'>
            <h1 data-text='404'>404</h1>
            <p>opps! page not found</p>
            <Link to='/'><button>return home</button></Link>
        </main>
    </div>
}

export default NotFound
