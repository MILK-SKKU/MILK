import { useEffect, useState } from 'react'

import Appbar from '../components/Appbar';
import Helmet from 'react-helmet';
import { CardTitle, Conversation, CorrectOptionButton, DividerMarginalized, FullQuizCard, LineDiv, NextButton, NextQuestionBar, OptionButton, OptionDiv, SolutionCard, SolutionContainer, SolutionLineDiv, Speaker, Spinner, TypoDefinition, TypoPos, TypoQuestion, TypoSolutionWord, TypoSolutionWordContent, WrongClickOptionButton, WrongOptionButton } from '../components/StyledComponents';
import { Box, Container } from '@mui/material';

function RandomQuiz({ history, location }) {
    const [quizNumber, setQuizNumber] = useState(1)
    const [checkAnswer, setCheckAnswer] = useState(false)
    const [quizData, setQuizData] = useState()
    const [option, setOption] = useState()
    const [correctFlag, setCorrectFlag] = useState(false)
    const [wrongFlag, setWrongFlag] = useState(false)
    const [normalFlag, setNormalFlag] = useState(true)

    async function getQuiz() {
        try {
            const randomNumber = Math.floor(Math.random() * dataSetAmount)
            const data = require(`../quiz_set_json/${randomNumber}`)

            const answer = data.option[data.solution].word;

            for (const item of data.context){
                item.content = item.content.replace(answer, "__________")
            }

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
                    if (localStorage.length === 0) {
                        let tmpArr = [quizData.option[quizData.solution]]
                        localStorage.setItem("wordlist", JSON.stringify(tmpArr))
                    } else {
                        let tmpArr = JSON.parse(localStorage.getItem("wordlist"))
                        tmpArr.push(quizData.option[quizData.solution])
                        localStorage.setItem("wordlist", JSON.stringify(tmpArr))
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
        
            <Container style={{ marginBottom : 100 }}>
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
                                                    <TypoSolutionWordContent>
                                                        {obj.word}
                                                        
                                                    </TypoSolutionWordContent>
                                                    <TypoPos>{item.pos}</TypoPos>
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



export default RandomQuiz;


const dataSetAmount = 1045