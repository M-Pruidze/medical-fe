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
require('dotenv').config();

const jwt = JSON.parse(localStorage.getItem('token'));

const FormComponent = () => {
    const [user, setUser] = useState({userName: '', pswValue: ''});
    const {userName, pswValue} = user;
    const [errMsg, setErrMsg] = useState('');

    const history = useHistory();

    const inputPsw = useRef(null);
    const btnSubmit = useRef(null);

    const URL = process.env.REACT_APP_URL_LOGIN;

    useEffect(() => {
        jwt && history.push('/visit');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser({userName: '', pswValue: ''});
        await loginUser();
    }
    const loginUser = async () => {
        try {
            const resp = await axios.post(URL, {
                username: userName,
                password: pswValue
            });

            console.log(`resp`, resp)
            const token = resp.data.token;
            const userId = resp.data.user._id;
            const username = resp.data.user.username;

            localStorage.setItem('token',JSON.stringify(token));
            localStorage.setItem('userId',JSON.stringify(userId));
            localStorage.setItem('username',JSON.stringify(username));

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
        }
        setUser({...user, [e.target.name] : e.target.value.trim() });
    }
    // pressing the Enter key
    const handleKeyPressName = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            inputPsw.current.focus();
        }
    }
    const handleKeyPressPsw = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            btnSubmit.current.focus();
        }
    }

    const validate = () => {
        return pswValue && userName.length >= 6 && userName.trim()
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
            onKeyPress={handleKeyPressName}
        />
        <Label htmlFor='psw' >password:</Label>
        <Input
            type='password'
            id='psw'
            value={pswValue}
            name='pswValue'
            placeholder='password'
            ref={inputPsw}
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
