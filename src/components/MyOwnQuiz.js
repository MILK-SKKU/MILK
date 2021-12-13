import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { AppBar, Box, IconButton, Divider, Typography, Button, Container, Card, CardActionArea, TextField, FormControl, FormLabel, FormGroup, Checkbox,FormControlLabel, Grid } from '@mui/material';
import Appbar from './Appbar';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = styled(CircularProgress)`
    position: fixed;
    left: calc(50% - 40px);
    top: calc(50vh - 70px);
`

const CustomAppBar = styled(AppBar)`
    height: 60px;
    bottom: 0;
    top: auto;
    background-color: skyblue;
    `
const NextButton = styled(Button)`
    position: absolute;
    right: 40px;
    height: 40px;
    width: 80px;
    background: #3299FF;;
    top: 10px;
    border-radius: 5px;
    `

const FullQuizCard = styled(Card)`
    position: relative;
    top: 30px;
    `

const TypoQuizTitle = styled(Typography)`
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 56px;
    color: #000000;
    top: 15px;
    left: 40px;

`
const MyText = styled(TextField)`
    position: relative;
    top: 20px;
    left: 30px;
    width: calc(100% - 80px);
    height: 280px;
    `

const ContextDiv = styled.div`
    position: relative;
    width: calc(100% - 90px);
    top: 20px;
    `

const LineDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    `
const TypoName = styled(Typography)`
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
    color: #3299FF;
    display: inline-block;
    min-width: 80px;
    left: 40px;
    `

const TypoText = styled(Typography)`
    position: relative;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
    color: #000000;

    left: 40px;
    margin-left: 10px;
    `

const TypoQuestionParagraph = styled(Typography)`
    position: relative;
    left: 40px;
    top: 40px;
    width: calc(100% - 80px);
    min-height: 150px;
    `

const OptionDiv = styled.div`
    position: relative;
    top: 85px;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    left: 25px;
    width: calc(100% - 50px);
    margin-bottom: 120px;

    @media only screen and (max-width: 768px){
        grid-template-columns: 1fr;
    }
`

const OptionButton = styled(Button)`
    position: relative;
    width: 100%;
    height: 50px;

    border: 1px solid #3299FF;
    border-radius: 40px;
    font-size: 18px;
    color: black;
    `

const CorrectOptionButton = styled(Button)`
    position: relative;
    width: 100%;
    height: 50px;
    border: ${props => props.flag ? "1px solid #00B448" : "1px solid #3299FF"} ;
    border-radius: 40px;
    font-size: 18px;
    color: black;
`

const WrongOptionButton = styled(Button)`
    position: relative;
    width: 100%;
    height: 50px;
    border: ${props => props.flag ? "1px solid #00B448" : "1px solid #3299FF"} ;
    border-radius: 40px;
    font-size: 18px;
    color: black;
`

const WrongClickOptionButton = styled(Button)`
    position: relative;
    width: 100%;
    height: 50px;
    border: 1px solid #FF3232;
    border-radius: 40px;
    font-size: 18px;
    color: black;
`

const CustomDivider = styled(Divider)`
    position: relative;
    top: 40px;
    `

const TypoQuestion = styled(Typography)`
    position: relative;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #999999;
    left: 30px;
    top: 60px;
    `
    
const TypoQuestionCorrect = styled(Typography)`
    position: relative;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: blue;
    left: 30px;
    top: 60px;
`

const TypoQuestionWrong = styled(Typography)`
    position: relative;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: red;
    left: 30px;
    top: 60px;
    `

const AnswerCard = styled(Card)`
    position: relative;
    top: -20px;
    `

const TypoSolutionTitle = styled(Typography)`
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 56px;
    color: #000000;
    top: 15px;
    left: 40px;
    `

const SolutionContainer = styled.div`
    position: relative;
    top: 40px;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    left: 25px;
    width: calc(100% - 50px);
    margin-bottom: 140px;

    @media only screen and (max-width: 768px){
        grid-template-columns: 1fr;
    }
    `

const SolutionCard = styled(Card)`
    position: relative;
    width: 100%;
    padding-bottom: 50px;
    border: 1px solid #3299FF;
    border-radius: 40px;
    margin-bottom: 15px;
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

const SolutionLineDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;

    width: calc(100% - 70px);
    left: 30px;
    top: 30px;
`

const TypoSolutionWordContent = styled(Typography)`
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    color: #3299FF;
    min-width: 60px;

    `
const TypoDefinition = styled(Typography)`
    position: relative;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    color: #000000;
    left: 20px;
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
    `
const EmptyDiv = styled.div`
    position: relative;
    bottom: 0;
    top: auto;
    height: 100px;
    `
const SubmitButton = styled(Button)`
    position: relative;
    left: 40px;
    top: 70px;
    width: calc(100% - 80px);
    height: 50px;
    margin-bottom: 100px;

    border: 1px solid #3299FF;
    border-radius: 40px;
    font-size: 18px;
    color: black;
    `
const TypoMyText = styled(Typography)`
    position: relative;
    left: 30px;
    width: calc(100% - 60px);
    `

function MyOwnQuiz({history}){
    const [quizNumber, setQuizNumber] = useState(1)
    const [checkAnswer, setCheckAnswer] = useState(false)
    const [quizData, setQuizData] = useState()
    const [questionText, setQuestionText] = useState("Considering the context, Choose the right word for the blank.")
    const [beforeMyText, setBeforeMyText] = useState(true)
    const [myText, setMyText] = useState("")
    const [option, setOption] = useState()
    const [solutionDict, setSolutionDict] = useState([])

    const [correctFlag, setCorrectFlag] = useState(false)
    const [wrongFlag, setWrongFlag] = useState(false)
    const [normalFlag, setNormalFlag] = useState(true)

    const handleCheckAnswer = (answer) => {
        let tmpArr = []

        if (answer !== quizData.solution){
            setWrongFlag(true)
            setNormalFlag(false)
            setOption(option.map(info => 
                answer === info.word ? {...info, check: !info.check} : info))
            
        }else{
            setCorrectFlag(true)
            setNormalFlag(false)
        }

        async function getTmp(arr){
            try{
                const postJSON = {
                    words: arr
                }
                const response = await axios.post(`https://server.jasonchoi.dev:33307/dicts`, postJSON)
                console.log(response)
                setSolutionDict(response.data.dicts)
            
            }catch(err){
                console.log(err)
            }
        }
        for (let i=0; i<option.length; i++){
            tmpArr.push(option[i].word)
            console.log(solutionDict)
            console.log(tmpArr)
        }

        getTmp(tmpArr)
        console.log(solutionDict)
        setCheckAnswer(true)

    }

    const handleSubmit = () => {
        if (myText === ""){
            alert("문장을 입력해주세요!")
            return;
        }else{
            const postJSON = {
                problem: myText
            }
            async function getMyQuiz(){
                try{
                    const response = await axios.post(`https://server.jasonchoi.dev:33307/quiz`, postJSON)
                    console.log(response)
                    setQuizData(response.data)
                    setOption(response.data.option)
                }catch(err){
                    console.log(err)
                }
            }
            getMyQuiz()
        }

        setBeforeMyText(false)
        setNormalFlag(true)
        
    }

    const handleTextChange = (e) => {
        console.log(myText)
        setMyText(e.target.value)
    }

    return(
        <>
        <Appbar />
        {beforeMyText ?
        <Container>
        <FullQuizCard elevation={2}>
        <TypoQuizTitle>Quiz #{quizNumber}</TypoQuizTitle>
        <MyText id="outlined-basic" onChange={handleTextChange} placeholder="Input your text" variant="outlined" multiline rows={9}/>
        <CustomDivider />
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton> 
        </FullQuizCard>
        </Container> 
        :
        <>
        {quizData === undefined || quizData.problem === undefined || option === undefined
        ?
        <Spinner style={{height: 80, width: 80}}/>
        :
        <>
        <Container>
        <FullQuizCard elevation={2}>
        <TypoQuizTitle>Quiz #{quizNumber}</TypoQuizTitle>
        <ContextDiv>
            <TypoMyText>{quizData.problem}</TypoMyText>
     
        </ContextDiv>
        <CustomDivider />
        {normalFlag && <TypoQuestion>{questionText}</TypoQuestion>}
        {correctFlag && <TypoQuestionCorrect>correct!</TypoQuestionCorrect> }
        {wrongFlag && <TypoQuestionWrong>wrong!</TypoQuestionWrong> }
     
        <OptionDiv>
            {normalFlag && 
            <>
            {option.map(opt => (
                <OptionButton onClick={()=>{handleCheckAnswer(opt.word)}}>{opt.word}</OptionButton>
            ))}
            </>
            }
            {correctFlag &&
            <>
            {option.map(opt => (
                <CorrectOptionButton flag={opt.flag}>{opt.word}</CorrectOptionButton>
            ))}
            </>
            }
            {wrongFlag &&
            <>
            {option.map(opt => (
                <>
                {opt.check ?
                <WrongClickOptionButton>{opt.word}</WrongClickOptionButton> :
                <WrongOptionButton flag={opt.flag}>{opt.word}</WrongOptionButton>
                }
                </>
            ))}
            </>
            }
        </OptionDiv>
        </FullQuizCard>
        <EmptyDiv></EmptyDiv>

        {
            checkAnswer &&
            <>
            <AnswerCard elevation={2}>
                <TypoSolutionTitle>Solution #{quizNumber}</TypoSolutionTitle>
                <SolutionContainer>
                    {solutionDict === undefined ?
                    <Spinner style={{height: 80, width: 80}}/>
                    :
                    <>
                        {solutionDict.map(item => (
                        <SolutionCard>
                        <TypoSolutionWord>{item.word}</TypoSolutionWord>
                        
                            {item.items.map(word => (
                                <>
                                <SolutionLineDiv>
                                <TypoSolutionWordContent>{item.word}
                                <TypoPos>{word.pos}</TypoPos>
                                </TypoSolutionWordContent>
                                <TypoDefinition>{word.definition}</TypoDefinition>
                                </SolutionLineDiv>
                                
                                </>
                            ))}
                            
                        
                        </SolutionCard>
                    ))}
                    </>
                    }
                    
                   
                </SolutionContainer>
            </AnswerCard>
            <Box sx={{flexGrow: 1}}>
            <CustomAppBar position="fixed" elevation={2} simple>
                <NextButton onClick={() => {history.push("normalmode")}}>Next</NextButton>
            </CustomAppBar>
            </Box>
            </>
        }
        </Container>
        </>
        }
        </>
        }
        </>
    )
}

export default MyOwnQuiz

    
    