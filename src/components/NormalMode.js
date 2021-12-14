import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { AppBar, Box, Divider, Typography, Button, Container, Card } from '@mui/material';
import Appbar from './Appbar';
import CircularProgress from '@mui/material/CircularProgress';
import Helmet from 'react-helmet';


const TypographyP = styled(Typography)`
    font-family : "Pretendard";
    font-size : 18px;
    line-height : 42px;
`

const DividerMarginalized = styled(Divider)`
    margin-top : 12px;
    margin-bottom : 12px;
`

const Spinner = styled(CircularProgress)`
    position: fixed;
    left: calc(50% - 40px);
    top: calc(50vh - 70px);
`
const NextQuestionBar = styled(AppBar)`
    height: 60px;
    bottom: 0;
    top: auto;
    `
const NextButton = styled(Button)`
    position: absolute;
    right: 40px;
    height: 40px;
    width: 80px;
    background: #FFF;;
    top: 10px;
    border-radius: 5px;
    `
const FullQuizCard = styled(Card)`
    padding : 24px 36px;
    margin-top : 32px;
    `
const CardTitle = styled(TypographyP)`
    font-weight : 600;
    font-size: 32px;
    `
const LineDiv = styled.div`
    display: flex;
    flex-direction: row;
    `
const Speaker = styled(TypographyP)`
    color: #3299FF;
    display: inline-block;
    min-width: 80px;
    `
const Conversation = styled(TypographyP)`
    margin-left: 10px;
    `

const OptionDiv = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    @media only screen and (max-width: 768px){
        grid-template-columns: 1fr;
    }
`
const OptionButton = styled(Button)`
    font-size : 18px;
    height : 48px;
    border: 1px solid #3299FF;
    border-radius: 40px;
    `

// 변경 Button들 수정 필요함
const CorrectOptionButton = styled(OptionButton)`
    border: ${props => props.flag ? "1px solid #00B448" : "1px solid #3299FF"} ;
    color: ${props => props.flag ? "#00B448" : "#3299FF"} ;
`
const WrongOptionButton = styled(OptionButton)`
    border: ${props => props.flag ? "1px solid #00B448" : "1px solid #3299FF"} ;
    color: ${props => props.flag ? "#00B448" : "#3299FF"} ;
`
const WrongClickOptionButton = styled(OptionButton)`
    border: 1px solid #FF3232;
    color : #FF3232;
`

// 변경 Button들 수정 필요함


const TypoQuestion = styled(TypographyP)`
    color: ${props => props.color};
    `

const SolutionContainer = styled.div`
    margin-top : 32px;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr 1fr;

    @media only screen and (max-width: 768px){
        grid-template-columns: 1fr;
    }
    `
const SolutionCard = styled.div`
    border: 1px solid #3299FF;
    border-radius: 40px;
    padding : 16px 24px;
`
const TypoSolutionWord = styled(TypographyP)`
    font-weight : 600;
    font-size: 28px;
    `
const SolutionLineDiv = styled.div`
    display: flex;
    flex-direction: row;
`

const TypoSolutionWordContent = styled(TypographyP)`
    color: #3299FF;
    min-width: 60px;
    `
const TypoDefinition = styled(TypographyP)`
    color: #000000;
    `
const TypoPos = styled(TypographyP)`
    font-size: 14px;
    color: #000000;
    `

const demoURL = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6e63bfb3-5f74-4c10-b9d7-6f5ff70c6d89/demo.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211214T082855Z&X-Amz-Expires=86400&X-Amz-Signature=d8e834f496cd460ddeaeccffeb6f1880fa22c311bed662cda387b653e85757b4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22demo.json%22&x-id=GetObject"

function NormalMode({ history, location }) {
    const [quizNumber, setQuizNumber] = useState(1)
    const [checkAnswer, setCheckAnswer] = useState(false)
    const [quizData, setQuizData] = useState()
    const [option, setOption] = useState()
    const [correctFlag, setCorrectFlag] = useState(false)
    const [wrongFlag, setWrongFlag] = useState(false)
    const [normalFlag, setNormalFlag] = useState(true)
    async function getQuiz() {
        try {
            const data = await fetch(demoURL).then(res => res.json())
            const emptyOptions = [
                {
                    flag: false,
                    check: false
                },
                {
                    flag: false,
                    check: false
                },
                {
                    flag: false,
                    check: false
                },
                {
                    flag: false,
                    check: false
                },
            ]
            emptyOptions[data.solution].flag = true

            setQuizData(data)
            setOption(emptyOptions)

        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => { getQuiz() }, [])
    
    const handleNext = () => {
        setQuizNumber(quizNumber => quizNumber + 1)
        setCheckAnswer(false)
        setNormalFlag(true)
        setCorrectFlag(false)
        setWrongFlag(false)

        getQuiz()
    }

    const handleCheckAnswer = (answer) => {
        console.log(option)

        //틀리면
        if (answer !== quizData.solution) {
            setWrongFlag(true)
            setNormalFlag(false)
            const tmp = [...option];
            tmp[answer].check = true;
            setOption(tmp)

            async function checkDict(word) {
                try {                   
                    if (sessionStorage.length === 0) {
                        let tmpArr = [quizData.option[quizData.solution].word]
                        sessionStorage.setItem("wordlist", JSON.stringify(tmpArr))
                    } else {
                        let tmpArr = JSON.parse(sessionStorage.getItem("wordlist"))
                        tmpArr.push(quizData.solution)
                        sessionStorage.setItem("wordlist", JSON.stringify(tmpArr))
                    }

                } catch (err) {
                    console.log(err)
                }
            }
            checkDict(answer)

        } else {
            setCorrectFlag(true)
            setNormalFlag(false)
        }

        setCheckAnswer(true)
    }

    
    return (
        <>
        <Helmet>
            <title>MILK : Random Quiz</title>
            <style>
                {`
                body {
                    font-family : "Pretendard";
                }
                `}
            </style>
        </Helmet>

        <Appbar />
        {quizData === undefined
            ?
            <Spinner style={{ height: 80, width: 80 }} />
            :
            <>
            <Container>
                <FullQuizCard elevation={2}>
                    <CardTitle>Quiz #{quizNumber}</CardTitle>
                    <div>
                        {quizData.context.map(item => (
                            <>
                                <LineDiv>
                                    <Speaker>{item.speaker}</Speaker>
                                    <Conversation>{item.content}</Conversation>
                                </LineDiv>
                            </>
                        ))}
                    </div>
                    <DividerMarginalized />
                    {normalFlag && <TypoQuestion color="#999999">Considering the context, Choose the right word for the blank.</TypoQuestion>}
                    {correctFlag && <TypoQuestion color="#3299FF">Correct!</TypoQuestion>}
                    {wrongFlag && <TypoQuestion color="#FF3232">Wrong!</TypoQuestion>}

                    <OptionDiv>
                        {normalFlag &&
                            <>
                                {quizData.option.map((opt, idx) => (
                                    <OptionButton onClick={() => { handleCheckAnswer(idx) }}>{opt.word}</OptionButton>
                                ))}
                            </>
                        }
                        {correctFlag &&
                            <>
                                {option.map((opt, idx) => (
                                    <CorrectOptionButton flag={opt.flag}>{quizData.option[idx].word}</CorrectOptionButton>
                                ))}
                            </>
                        }
                        {wrongFlag &&
                            <>
                                {option.map((opt, idx) => (
                                    <>
                                        {opt.check ?
                                            <WrongClickOptionButton>{quizData.option[idx].word}</WrongClickOptionButton> :
                                            <WrongOptionButton flag={opt.flag}>{quizData.option[idx].word}</WrongOptionButton>
                                        }
                                    </>
                                ))}
                            </>
                        }
                    </OptionDiv>
                </FullQuizCard>

                {
                    checkAnswer &&
                    <>
                        <FullQuizCard elevation={2}>
                            <CardTitle>Solution #{quizNumber}</CardTitle>
                            <DividerMarginalized />
                            <SolutionContainer>
                                {quizData.option.map(obj => (
                                    <SolutionCard>
                                        <TypoSolutionWord>{obj.word}</TypoSolutionWord>
                                        {obj.items.map(item => (
                                            <>
                                                <SolutionLineDiv>
                                                    <TypoSolutionWordContent>{obj.word}
                                                        <TypoPos>{item.pos}</TypoPos>
                                                    </TypoSolutionWordContent>
                                                    <TypoDefinition>{item.definition}</TypoDefinition>
                                                </SolutionLineDiv>

                                            </>
                                        ))}
                                    </SolutionCard>
                                ))}
                            </SolutionContainer>
                        </FullQuizCard>
                        <Box sx={{ flexGrow: 1 }}>
                            <NextQuestionBar position="fixed" elevation={2} simple>
                                <NextButton onClick={handleNext}>Next</NextButton>
                            </NextQuestionBar>
                        </Box>
                    </>
                }
            </Container>
            </>
        }
        </>
    )
}

export default NormalMode

