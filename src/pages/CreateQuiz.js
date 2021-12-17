import { useState } from 'react'
import { Box, Container } from '@mui/material';
import Appbar from '../components/Appbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import axios from 'axios'
import { Helmet } from 'react-helmet';
import { CardTitle, Conversation, CorrectOptionButton, DividerMarginalized, FullQuizCard, LineDiv, NextButton, NextQuestionBar, OptionButton, OptionDiv, SolutionCard, SolutionContainer, SolutionLineDiv, Speaker, Spinner, SubmitButton, TypoDefinition, TypoPos, TypoQuestion, TypoSolutionWord, TypoSolutionWordContent, UserTextInput, WrongClickOptionButton, WrongOptionButton } from '../components/StyledComponents';

function MyOwnQuiz() {

    const history = useHistory()
    const [checkAnswer, setCheckAnswer] = useState(false)
    const [quizData, setQuizData] = useState()
    const [beforeMyText, setBeforeMyText] = useState(true)
    const [myText, setMyText] = useState("")
    const [option, setOption] = useState()

    const [correctFlag, setCorrectFlag] = useState(false)
    const [wrongFlag, setWrongFlag] = useState(false)
    const [normalFlag, setNormalFlag] = useState(true)

    async function getUserQuiz() {
        const postJSON = {
            problem: myText
        }
        
        try {
            const response = await axios.get(demoURL)
            const data = response.data;
            setQuizData(data)
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
            setOption(response.data.option)
        } catch (e) {
            console.log(e)
        }
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

    const handleSubmit = () => {
        if (myText === "") {
            alert("문장을 입력해주세요!")
            return;
        } else {
            getUserQuiz();
        }
        setBeforeMyText(false)
        setNormalFlag(true)
    }

    const handleTextChange = (e) => {
        setMyText(e.target.value)
    }

    return (
        <>
        <Helmet>
            <title>MILK : Create Quiz</title>
            <style>
                {`
        body {
            font-family : "Pretendard";
        }
        `}
            </style>
        </Helmet>
        <Appbar />
        {beforeMyText ?
            <Container>
                <FullQuizCard elevation={2}>
                    <CardTitle>Create Own Quiz!</CardTitle>
                    <DividerMarginalized />
                    <UserTextInput id="standard-basic" onChange={handleTextChange} placeholder="Input your text!" variant="standard" multiline rows={9} />
                    <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                </FullQuizCard>
            </Container>
            :
            <>
                {quizData === undefined || option === undefined
                    ?
                    <>
                        {"Server Disconnected! Create Quiz Mode is available when MILK-Backend server is online."}
                    </>

                    
                    :
                    <>
                    <Container style={{ marginBottom: 100 }}>
                        <FullQuizCard elevation={2}>
                            <CardTitle>Create Own Quiz!</CardTitle>
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
                                    <CardTitle>Answer of Your Quiz!</CardTitle>
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
                                    <NextButton onClick={() => {history.push("/createquiz")}}>New</NextButton>
                                    </NextQuestionBar>
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


const demoURL = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6e63bfb3-5f74-4c10-b9d7-6f5ff70c6d89/demo.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211214T082855Z&X-Amz-Expires=86400&X-Amz-Signature=d8e834f496cd460ddeaeccffeb6f1880fa22c311bed662cda387b653e85757b4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22demo.json%22&x-id=GetObject"
