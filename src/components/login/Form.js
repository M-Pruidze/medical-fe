import React, { useState, useEffect, useRef} from 'react';
import {
    Form,
    Input,
    Label,
    H2,
    Button,
    Button_no_border,
    Paragraph
} from './styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import config from '../../config';

const FormComponent = () => {
    const [user, setUser] = useState({userName: '', pswValue: ''});
    const {userName, pswValue} = user;
    const [errMsg, setErrMsg] = useState('');

    const history = useHistory();

    const btnSubmit = useRef(null);

    const URL = config.url_login;

    useEffect(()=>{
        const jwt = JSON.parse(localStorage.getItem('token'));
        jwt && history.push('/visit')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser({userName: '', pswValue: ''});
        await loginUser();
    }
    const loginUser = async () => {
        try {
            const resp = await axios.post('http://localhost:4000/auth/login', {
                username: userName,
                password: pswValue
            });

            const token = resp.data.token;
            const userId = resp.data.user._id;

            localStorage.setItem('token',JSON.stringify(token));
            localStorage.setItem('userId',JSON.stringify(userId));

            console.log('pressing login button');
            history.push('/visit');
        } catch (error) {
            if (error.response) {
                // Request made and server responded
                setErrMsg(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        }
    }
    const handleChange = (e) => {
        if (errMsg) {
            setErrMsg(null);
        };
        setUser({...user, [e.target.name] : e.target.value.trim() });
    }
    // pressing the Enter key
    const handleKeyPressPsw = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            btnSubmit.current.focus();
        }
    }

    const validate = () => {
        return pswValue && userName.length >= 6 && userName.trim();
    }
    // redirecting
    const handleClick = () => {
        history.push('/');
    }

    return <Form onSubmit={handleSubmit}>
        <H2>Войти в систему</H2>
        {errMsg && <Paragraph>* {errMsg}</Paragraph>}
        {(!userName || !pswValue) && <Paragraph>* заполните все поля</Paragraph>}

        <Label htmlFor='userName'>login:</Label>
        <Input
            type='text'
            id='userName'
            value={userName}
            name='userName'
            placeholder='login'
            onChange={handleChange}
        />
        <Label htmlFor='psw' >password:</Label>
        <Input
            type='password'
            id='psw'
            value={pswValue}
            name='pswValue'
            placeholder='password'
            onChange={handleChange}
            onKeyPress={handleKeyPressPsw}
        />
        <Button
            type='submit'
            disabled={!validate()}
            ref={btnSubmit}
        >Войти</Button>
        <Button_no_border type='button' onClick={handleClick}>Зарегистрироваться</Button_no_border>
    </Form>
}

export default FormComponent
