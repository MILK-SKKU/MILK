import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { AppBar, Box, Divider, Typography, Button, Container, Card } from '@mui/material';
import Appbar from './Appbar';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Helmet from 'react-helmet';


const TypographyP = styled(Typography)`
    font-family : "Pretendard";
    font-size : 18px;
    line-height : 42px;
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
    padding : 24px 36px;
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
    width: 100%;
    border: 1px solid #3299FF;
    border-radius: 40px;
    `

// 변경 Button들 수정 필요함
const CorrectOptionButton = styled(Button)`
    width: 100%;
    height: 50px;
    border: ${props => props.flag ? "1px solid #00B448" : "1px solid #3299FF"} ;
    border-radius: 40px;
`
const WrongOptionButton = styled(Button)`
    width: 100%;
    height: 50px;
    border: ${props => props.flag ? "1px solid #00B448" : "1px solid #3299FF"} ;
    border-radius: 40px;
`
const WrongClickOptionButton = styled(Button)`
    width: 100%;
    height: 50px;
    border: 1px solid #FF3232;
    border-radius: 40px;
`

// 변경 Button들 수정 필요함


const TypoQuestion = styled(TypographyP)`
    color: #999999;
    `
const TypoQuestionCorrect = styled(TypographyP)`
    color: blue;
`
const TypoQuestionWrong = styled(TypographyP)`
    color: red;
    `


const SolutionContainer = styled.div`
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
    width: 100%;
    padding-bottom: 50px;
    border: 1px solid #3299FF;
    border-radius: 40px;
    margin-bottom: 15px;
`
const TypoSolutionWord = styled(TypographyP)`
    font-size: 28px;
    line-height: 42px;
    color: #000000;
    top: 20px
    `
const SolutionLineDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: calc(100% - 70px)
    top: 30px;
`

const TypoSolutionWordContent = styled(TypographyP)`
    line-height: 30px;
    color: #3299FF;
    min-width: 60px;

    `
const TypoDefinition = styled(TypographyP)`
    font-weight: normal;
    line-height: 30px;
    color: #000000;
    left: 20px;
    `
const TypoPos = styled(TypographyP)`
    font-weight: normal;
    font-size: 14px;
    line-height: 30px;
    color: #000000;
    top: -10px;
    left: 0px;
    `
const EmptyDiv = styled.div`
    bottom: 0;
    top: auto;
    height: 100px;
    `

function NormalMode({ history, location }) {
    const [quizNumber, setQuizNumber] = useState(1)
    const [checkAnswer, setCheckAnswer] = useState(false)
    const [quizData, setQuizData] = useState()
    const [option, setOption] = useState()
    const [solutionDict, setSolutionDict] = useState()

    const [correctFlag, setCorrectFlag] = useState(false)
    const [wrongFlag, setWrongFlag] = useState(false)
    const [normalFlag, setNormalFlag] = useState(true)

    useEffect(() => {
        //---기존 방식---
        // async function getQuiz(){
        //     try{
        //         const response = await axios.get(`https://server.jasonchoi.dev:33307/prob`)
        //         console.log(response)
        //         setQuizData(response.data)
        //         setOption(response.data.option)
        //         console.log(response.data.option)
        //     }catch(err){
        //         console.log(err)
        //     }
        // }
        // getQuiz()

        // SETTING TEST DATA
        setQuizData({
            problem: [
                {
                    content: "말하는 내용 1",
                    speaker: "말하는 사람 1"
                },
                {
                    content: "말하는 내용 2",
                    speaker: "말하는 사람 2"
                },
                {
                    content: "말하는 내용 1",
                    speaker: "말하는 사람 1"
                },
            ],
            solution: "정답",
            option: [
                {
                    word: "오답1",
                    flag: false,
                    check: false
                },

                {
                    word: "오답2",
                    flag: false,
                    check: false
                },
                {
                    word: "정답",
                    flag: true,
                    check: false
                },
            ]
        })
        setOption(
            [
                {
                    word: "오답1",
                    flag: false,
                    check: false
                },
                {
                    word: "오답2",
                    flag: false,
                    check: false
                },
                {
                    word: "정답",
                    flag: true,
                    check: false
                },
                {
                    word: "오답3",
                    flag: false,
                    check: false
                },
            ]
        )

    }, [])

    const handleCheckAnswer = (answer) => {
        let tmpArr = []

        if (answer !== quizData.solution) {
            setWrongFlag(true)
            setNormalFlag(false)
            setOption(option.map(info =>
                answer === info.word ? { ...info, check: !info.check } : info))

            async function checkDict(word) {
                try {
                    const response = await axios.get(`https://server.jasonchoi.dev:33307/dict/${word}`)
                    if (sessionStorage.length === 0) {
                        let tmpArr = [quizData.solution]
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


        async function getTmp(arr) {
            try {
                const postJSON = {
                    words: arr
                }
                const response = await axios.post(`https://server.jasonchoi.dev:33307/dicts`, postJSON)
                console.log(response)
                setSolutionDict(response.data.dicts)

            } catch (err) {
                console.log(err)
            }
        }

        for (let i = 0; i < option.length; i++) {
            tmpArr.push(option[i].word)
            console.log(solutionDict)
            console.log(tmpArr)
        }
        //4개 단어 사전 세팅, 이 부분 바꿀건지?

        getTmp(tmpArr)
        console.log(solutionDict)
        setCheckAnswer(true)
    }

    const handleNext = () => {
        setQuizNumber(quizNumber => quizNumber + 1)
        setCheckAnswer(false)
        setNormalFlag(true)
        setCorrectFlag(false)
        setWrongFlag(false)
        setSolutionDict([])

        async function getQuiz() {
            try {
                const response = await axios.get(`https://server.jasonchoi.dev:33307/prob`)
                setQuizData(response.data)
                setOption(response.data.option)
            } catch (err) {
                console.log(err)
            }
        }
        getQuiz()

        // JSON 리스트에서 가지고 오는 방식으로 바꿔야함.
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
        {quizData === undefined || option === undefined
            ?
            <Spinner style={{ height: 80, width: 80 }} />
            :
            <>
            <Container>
                <FullQuizCard elevation={2}>
                    <CardTitle>Quiz #{quizNumber}</CardTitle>
                    <div>
                        {quizData.problem.map(item => (
                            <>
                                <LineDiv>
                                    <Speaker>{item.speaker}</Speaker>
                                    <Conversation>{item.content}</Conversation>
                                </LineDiv>
                            </>
                        ))}
                    </div>
                    <Divider />
                    {normalFlag && <TypoQuestion>Considering the context, Choose the right word for the blank.</TypoQuestion>}
                    {correctFlag && <TypoQuestionCorrect>correct!</TypoQuestionCorrect>}
                    {wrongFlag && <TypoQuestionWrong>wrong!</TypoQuestionWrong>}

                    <OptionDiv>
                        {normalFlag &&
                            <>
                                {option.map(opt => (
                                    <OptionButton onClick={() => { handleCheckAnswer(opt.word) }}>{opt.word}</OptionButton>
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
                        <FullQuizCard elevation={2}>
                            <CardTitle>Solution #{quizNumber}</CardTitle>
                            <SolutionContainer>
                                {solutionDict === undefined ?
                                    <Spinner style={{ height: 80, width: 80 }} />
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

