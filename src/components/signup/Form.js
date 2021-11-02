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
    const [user, setUser] = useState({userName: '', pswValue: '', pswrpValue: ''});
    const [correctPsw, setCorrectPsw] = useState(true);
    const {userName, pswValue, pswrpValue } = user;
    const [errMsg, setErrMsg] = useState('');
    const [confMsg, setConfMsg] = useState('');

    const history = useHistory();

    const btnSubmit = useRef(null);

    const URL = config.url_auth;

    useEffect(()=>{
        const jwt = JSON.parse(localStorage.getItem('token'));
        jwt && history.push('/visit')
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser();
        setUser({userName: '', pswValue: '', pswrpValue: ''});
    }
    const createUser = async () => {
        try {
            console.log(`URL`, URL)
            const resp = await axios.post(URL, {
                username: userName,
                password: pswValue
            });
            setConfMsg(`пользователь ${resp.data.result.username} создан`);
            history.push(`/login`);

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
        if (confMsg) {
            setConfMsg('');
        }
        if (errMsg) {
            setErrMsg(null);
        }
        setUser({...user, [e.target.name] : e.target.value.trim() });
    }
    // pressing the Enter key
    const handleKeyPressPasswordConfirm = (e) => {
        if(e.code === 'Enter'){
            e.preventDefault();
            btnSubmit.current.focus();
        }
    }
    // comparing the password fields
    useEffect(() => {
        if (pswrpValue) setCorrectPsw(pswValue === pswrpValue);
    }, [user, correctPsw, pswValue, pswrpValue])

    // password regexes
    // minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const validPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
    // only latin letters
    const latinLettersRegex = /^(?:[\u0000-\u007F]+)$/;

    const validate = () => {
        return pswValue === pswrpValue && userName.length >= 6 && userName.trim() && validPasswordRegex.test(pswValue) && latinLettersRegex.test(pswValue)
    }
    // redirecting
    const handleClick = () => {
        history.push(`/login`);
    }

    return <Form onSubmit={handleSubmit}>
        <H2>Регистрация</H2>
        {confMsg && <Paragraph>* {confMsg}</Paragraph>}
        {errMsg && <Paragraph>* {errMsg}</Paragraph>}
        {!correctPsw && <Paragraph>* пароли не совпадают</Paragraph>}
        {userName && userName.length < 6 && <Paragraph>* имя пользователя должно быть не менее 6 символов</Paragraph>}
        {pswrpValue && pswValue === pswrpValue && (!validPasswordRegex.test(pswrpValue) || !latinLettersRegex.test(pswrpValue)) && <Paragraph>* пароль должен содержать латинские символы, минимум шесть символов, одна заглавная буква, одна строчная буква, одна цифра и один специальный символ</Paragraph>}
        {(!userName || !correctPsw) && (userName || correctPsw) && <Paragraph>* заполните все поля</Paragraph>}

        <Label htmlFor='userName' >login:</Label>
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
        />
        <Label htmlFor='pswrp' >repeat password:</Label>
        <Input
            type='password'
            id='pswrp'
            value={pswrpValue}
            name='pswrpValue'
            placeholder='password'
            onChange={handleChange}
            onKeyPress={handleKeyPressPasswordConfirm}
        />
        <Button
            type='submit'
            disabled={!validate()}
            ref={btnSubmit}
        >зарегистрироваться</Button>
        <Button_no_border type='button' onClick={handleClick}>авторизоваться</Button_no_border>
    </Form>
}

export default FormComponent
