import React from 'react'
import styled from 'styled-components';
import { Typography, Button, Grid, Container} from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Appbar from './Appbar';

const MilkGrid = styled(Grid)`
    padding : 48px;
    @media only screen and (max-width: 1200px){
        padding : 12px;
    }
`;

const MilkTitle = styled(Typography)`
    color : white;
    font-family : "Pretendard";
    font-weight : bold;
    font-size : 64px;
    margin-bottom : 32px;
    @media only screen and (max-width: 1200px){
        font-size : 48px;
        text-align : center;
    }
    `
const MILKDescription = styled(Typography)`
    color : white;
    font-family : "Pretendard";
    font-weight : medium;
    font-size : 18px;
     margin-bottom : 32px;
    @media only screen and (max-width: 1200px){
        font-size : 14px;
        text-align : center;
    }
    `
const StartButton = styled(Button)`
    position: relative;
    width: 100%;
    height: 64px;
    background: #00B448;
    border-radius: 10px;
    font-size: 32px;
    color: #FFFFFF;
    align : center;
    
    @media only screen and (max-width: 1200px){
        font-size : 24px;
        height : 48px;
    }
    `


const MainImg = styled.img`
    width: 100%;
    object-fit: contain;
    border-radius: 15px;
    `


function Main() {
    const history = useHistory()

    const handleClickNormalMode = () => {
        history.push("/normalmode")
    }

    return (
        <>
            <Appbar />
            <Container maxWidth="xl">
                <MilkGrid container>
                    <MilkGrid item xs={12} lg={6} alignItems={'center'}>  
                            <MilkTitle>
                                The Most
                                <span style={{ color: "yellow", fontWeight: "800" }}> INNOVATIVE</span> Way
                                to Learn Korean
                            </MilkTitle>
                            <MILKDescription>
                                MILK is machine learning based word quiz.
                                The user identifies the context of the conversation and chooses the appropriate words to enter the blank.
                                Appropriate words are words that can represent the context of the conversation.
                                After solving the problem, you can see the definition of words, and you can study by recommending words that are good to learn together.
                            </MILKDescription>
                            <StartButton
                                onClick={handleClickNormalMode}
                            alignItems={'center'}
                            >
                                Get Start!
                            </StartButton>
                    </MilkGrid>
                    <MilkGrid item xs={12} lg={6} paddingTop={12}>
                            <MainImg src="image1.png" />
                    </MilkGrid>
                </MilkGrid>
            </Container>
        </>







    )
}

export default Main