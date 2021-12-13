import React from 'react'
import styled from 'styled-components';
// import styled from '@mui/styled-engine';
// import styled from '@emotion/styled';
// import {styled} from '@mui/material/styles';
import { Typography, Button, Container, Card, CardActionArea, TextField, AppBar, Toolbar, Box, IconButton} from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import HomeIcon from '@mui/icons-material/Home';

const TypoMain = styled(Typography)`
    position: absolute;
    display: inline;
    left: 25px;
    top: 12px;
    font-size: 26px;
    `
const TypoNormalMode = styled(Typography)`
    position: relative;
    left: 170px;
    top: 15px;
    font-size: 18px;
    `
const TypoMakeQuiz = styled(Typography)`
    position: absolute;
    left: 320px;
    top: 15px;
    font-size: 18px;
`

const TypoWordList = styled(Typography)`
    position: absolute;
    left: 450px;
    top: 15px;
    font-size: 18px;
`
const HomeButton = styled(IconButton)`
    position: absolute;
    right: 25px;
    top: 15px;
    width: 30px;
    height: 30px;
    `

const Home = styled(HomeIcon)`
    position: absolute;
    height: 100%;
    width: 100%;
    color: skyblue;
    
    `
const CustomAppBar = styled(AppBar)`
    height: 60px;
    `


function Appbar(){
    const history = useHistory()

    const handleLinkHome = () => {
        history.push("/")
    }
    const handleLinkMyQuiz = () => {
        history.push("/myquiz")
    }
    const handleLinkNormalMode= () => {
        history.push("/normalmode")
    }
    const handleLinkWordList = () => {
        history.push("/wordlist")
    }

    return(
        <>
        <Box sx={{flexGrow: 1}}>
            <CustomAppBar position="static" simple>
                <TypoMain>MILK</TypoMain>
                <TypoNormalMode onClick={handleLinkNormalMode}>Normal Mode</TypoNormalMode>
                <TypoMakeQuiz onClick={handleLinkMyQuiz}>Make Quiz</TypoMakeQuiz>
                <TypoWordList onClick={handleLinkWordList}>Word List</TypoWordList>
                <HomeButton onClick={handleLinkHome}>
                    <Home />
                </HomeButton>
            </CustomAppBar>

        </Box>
        </>
    )
}

export default Appbar