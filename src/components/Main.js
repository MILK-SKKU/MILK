import React from 'react'
import styled from 'styled-components';
// import styled from '@mui/styled-engine';
// import styled from '@emotion/styled';
// import {styled} from '@mui/material/styles';
import { Typography, Button, Container, Card, CardActionArea, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Appbar from './Appbar';


const MainDiv = styled.div`
    height: 100vw;
    background: linear-gradient(132.38deg, #3299FF 5.94%, #236AB0 95.27%);
    `

const TypoBigMain = styled(Typography)`
    position: relative;
    top: 80px;
    left: 50px;
    font-style: normal;
    font-weight: normal;
    font-size: 50px;
    line-height: 75px;

    color: #FFFFFF;
`
const TypoSubMain = styled(Typography)`
    position: relative;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    color: #FFFFFF;

    width: calc(50% - 20px);
    min-width: 240px;
    top: 100px;
    left: 50px;
    `
const MainImg = styled.img`
    position: absolute;
    top: 120px;
    /* height: 480px; */
    /* height: 50%; */
    width: calc(50% - 40px);
    object-fit: contain;
    z-index: 3;
    right: -20px;
    border-radius: 15px;

    @media only screen and (max-width: 768px){
        display: none;
    }
    `
const StartButton = styled(Button)`
    position: relative;
    /* left: calc(50% - 450px); */
    left: 40px;
    top: 140px;
    width: 380px;
    height: 50px;
    background: #00B448;
    border-radius: 10px;

    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 45px;
    color: #FFFFFF;
    `

function Main(){
    const history = useHistory()

    const handleClickNormalMode = () => {
        history.push("/normalmode")
    }

    return(
        <>
        <Appbar />
        <MainDiv>
        <TypoBigMain>
            The Most<br />
            <b style={{color: "yellow"}}>Innovative</b> Way<br/>
            to Learn Korean
        </TypoBigMain>
        <TypoSubMain>
        ROCK is machine learnign based word quiz. The user identifies the context of the conversation and chooses the appropriate words to enter the blank. Appropriate words are words that can represent the context of the conversation. After solving the problem, you can see the definition of words, and you can study by recommending words that are good to learn together. 
        </TypoSubMain>
        <MainImg src="image1.png" />
        <StartButton onClick={handleClickNormalMode}>Get Start!</StartButton>

  
        </MainDiv>
        

        </>
    )
}

export default Main