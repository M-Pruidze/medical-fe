import React from 'react';
import {
    Container,
    Header,
    Image,
    ImgContainerOne,
    H1,
    Main,
    ImgContainerTwo,
} from './styles';
import FormComponent from './Form';

const Login = () => {
    return (
        <Container >
            <Header>
                <ImgContainerOne>
                    <Image src={process.env.PUBLIC_URL + '/images/logo1.png'} alt='logo' />
                </ImgContainerOne>
                <H1>Войти в систему</H1>
            </Header>
            <Main>
                <ImgContainerTwo>
                    <Image src={process.env.PUBLIC_URL + '/images/logo2.png'} alt='logo' />
                </ImgContainerTwo>
                <FormComponent />
            </Main>
        </Container>
    )
}

export default Login

