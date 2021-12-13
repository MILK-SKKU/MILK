import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Menu, MenuItem, MenuList, Stack, AppBar, Toolbar, Box, IconButton, Divider, Typography, Button, Container, Card, CardActionArea, TextField, FormControl, FormLabel, FormGroup, Checkbox,FormControlLabel, Grid } from '@mui/material';
import Appbar from './Appbar';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = styled(CircularProgress)`
    position: fixed;
    left: calc(50% - 40px);
    top: calc(50vh - 70px);
`

const FullQuizCard = styled(Card)`
    position: relative;
    top: 30px;
    height: 600px;
    `
const TypoMain = styled(Typography)`
    position: relative;
    left: 20px;
    top: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #3299FF;
    `

const WordMenuList = styled(MenuList)`
    width: 120px;
    position: relative;
    left: 10px;
    top: 20px;
    `

const SolutionCard = styled(Card)`
    position: absolute;
    width: calc(100% - 200px);
    float: right;
    top: 100px;
    right: 20px;
    padding-bottom: 50px;
    border: 1px solid #3299FF;
    border-radius: 20px;
    margin-bottom: 15px;
    `
const TypoMainDefinition = styled(Typography)`
    position: relative;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
    color: #3299FF;
    top: 20px;
    left: 30px;
    `
const SolutionLineDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: calc(100% - 100px);
    left: 30px;
    top: 30px;
`
const TypoSolutionWord = styled(Typography)`
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 42px;
    color: #000000;
    top: 20px;
    left: 30px;
    `

const TypoSolutionWordContent = styled(Typography)`
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    color: #3299FF;
    min-width: 60px;
    left: 5px;

`
const TypoDefinition = styled(Typography)`
    position: relative;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    color: #000000;
    left: 50px;
`
const TypoPos = styled(Typography)`
    position: relative;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 30px;
    color: #000000;
    top: -10px;
    left: 0px;
    min-width: 70px;
`
const TypoSim = styled(Typography)`
    position: absolute;
    top: 450px;
    left: 180px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
    color: #3299FF;

    `
const TypoSimContent = styled(Typography)`
    position: absolute;
    top: 500px;
    left: 180px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 42px;
    color: #000000;
    `
const TypoNoWordList = styled(Typography)`
    position: absolute;
    top: calc(50% - 30px);
    width: 400px;
    left: calc(50% - 200px);
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
    color: #3299FF;
    `

function WordList({history}){

    if (sessionStorage.wordlist === undefined){
        return(
            <>
            <Appbar />
            <TypoNoWordList>오답 단어장이 없습니다!</TypoNoWordList>
            </>
        )
    }

    let wordList = JSON.parse(sessionStorage.getItem("wordlist"))
    const [definition, setDefinition] =useState()
    const [simWord, setSimWord] = useState("")

    useEffect(() => {
        async function getDict(word){
            try{
                const response = await axios.get(`https://server.jasonchoi.dev:33307/dict/${word}`)
                console.log(response)
                setDefinition(response.data)
            }catch(err){
                console.log(err)
            }
        }
        getDict(wordList[0])
    }, [])

    const handleDefinition = (item) => {
        async function getDict(word){
            try{
                const response = await axios.get(`https://server.jasonchoi.dev:33307/dict/${word}`)
                console.log(response)
                setDefinition(response.data)
            }catch(err){
                console.log(err)
            }
        }
        async function getSim(sim){
            try{
                const postJSON = {
                    word: sim
                }
                const response = await axios.post(`https://server.jasonchoi.dev:33307/word`, postJSON)
                console.log(response)
                setSimWord(response.data.word)
            }catch(err){
                console.log(err)
            }
        }
        getDict(item)
        getSim(item)
    }

    return(
        <>
        <Appbar />
        <Container>
        <FullQuizCard elevation={2}>
            <TypoMain>Word List</TypoMain>
            <WordMenuList
            id="basic-menu"
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            > 
            {wordList.map(item => (
                <MenuItem onClick={() => {handleDefinition(item)}}>{item}</MenuItem>
            ))}
            </WordMenuList>

            <SolutionCard>
                {definition === undefined ?
                <Spinner style={{height: 80, width: 80}}/>
                :
                <>
                <TypoMainDefinition>Definition</TypoMainDefinition>
                <TypoSolutionWord>{definition.word}
                </TypoSolutionWord>
                {definition.items.map(item => (
                    <>
                    <SolutionLineDiv>
                    <TypoSolutionWordContent>{definition.word}
                    <TypoPos>{item.pos}</TypoPos>
                    </TypoSolutionWordContent>
                    <TypoDefinition>{item.definition}</TypoDefinition>
                    </SolutionLineDiv>
                    </>
                ))}
                </>
                }
            </SolutionCard>

            <TypoSim>How about these words?</TypoSim>
            <TypoSimContent>{simWord}</TypoSimContent>
        </FullQuizCard>
        </Container>
        </>
    )
    
}

export default WordList