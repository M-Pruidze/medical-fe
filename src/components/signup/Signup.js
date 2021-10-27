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
import logo1 from '../../images/logo1.png';
import logo2 from '../../images/logo2.png';
import FormComponent from './Form';

const Signup = () => {
    return (
        <Container >
            <Header>
                <ImgContainerOne>
                    <Image src={logo1} alt='logo' />
                </ImgContainerOne>
                <H1>Зарегистрироваться в системе</H1>
            </Header>
            <Main>
                <ImgContainerTwo>
                    <Image src={logo2} alt='logo' />
                </ImgContainerTwo>
                <FormComponent />
            </Main>
        </Container>
    )
}

export default Signup
