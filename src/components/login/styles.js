import styled, { css } from 'styled-components';

const font = css`
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    text-transform: capitalize;
`
const box = css`
    box-sizing: border-box;
`
const border = css`
    border: 1px solid rgba(0 0 0 0.2);
    border-radius: 4px;
    // height: 40px;
    padding: .5rem .8rem;
    margin: .3rem 0;
    font-size: 18px;
`
export const Container = styled.div`
    width: 95vw;
    max-width: 989px;
    background: #C5E9FF;
    margin: 5vh auto;
    ${box};

    @media only screen and (max-width: 860px) {
        height: auto;
    }
`
export const Header = styled.header`
    width: 100%;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3vw;
    font-weight: normal;
    padding: .7rem 2rem;
    ${box};

    @media only screen and (max-width: 660px) {
        flex-direction: column;
    }
`
export const Image = styled.img`
    object-fit: cover;
    max-width: 100%;
    height: auto;
    ${box};
`
export const ImgContainerOne = styled.div`
    width: 17vw;
    display: flex;
    justify-content: center;
    align-items: center;
    ${box};

    @media only screen and (max-width: 500px) {
        width: 87px;
    }
`
export const H1 = styled.h1`
    width: 80vw;
    text-align: left;
    ${font};
    text-transform: none;

    @media only screen and (max-width: 860px) {
        text-align: center;
        font-size: 30px;
    }
`

export const Main = styled.main`
    padding: 2rem 0 5rem;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    ${box};

    @media only screen and (max-width: 860px) {
        flex-direction: column;
        align-items: center;
    }
`
export const ImgContainerTwo = styled.div`
    max-height: 375px;
    max-width: 375px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0 0 2rem;
    ${box};

    @media only screen and (max-width: 860px) {
        width: 50%;
        height: 50%;
    }
`
// form styles
export const Form = styled.form`
    width: 400px;
    // height: 453px;
    background: #FFFFFF;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5% 2rem;
    ${box};

    @media only screen and (max-width: 860px) {
        margin-top: 2rem;
    }
    @media only screen and (max-width: 510px) {
        width: 90%;
    }
    @media only screen and (max-width: 450px) {
        width: 95%;
    }

`
export const H2 = styled.h1`
    ${font};
    text-transform: none;
    @media only screen and (max-width: 860px) {
        text-align: center;
        font-size: 30px;
    }
`
export const Input = styled.input`
    width: 100%;
    ${border};
    ${box};
    ${font};

`
export const Label = styled.label`
    align-self: flex-start;
    display: inline-block;
    width: 100%;
    ${box};
    ${font};
`
export const Button = styled.button`
    background: #fff;
    align-self: flex-end;
    ${border};
    ${box};
    ${font};
    padding: .5rem 3rem;

    :disabled {
        color: #000;
    }
    :hover {
        cursor: pointer;
    }
`
export const Button_no_border = styled(Button)`
    border: none;
    padding: .5rem .8rem;
`
export const Paragraph = styled.p`
    ${font};
    text-transform: none;
    margin: 0 0 .5rem;
    text-align: center;
`