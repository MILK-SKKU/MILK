import { useEffect, useState } from 'react'
import Appbar from '../components/Appbar';
import axios from 'axios'
import { CardTitle, DividerMarginalized, FullQuizCard, SolutionCard, SolutionLineDiv, Spinner, TypoDefinition, TypoMain, TypoMainDefinition, TypoPos, TypoSim, TypoSimContent, TypoSolutionWord, TypoSolutionWordContent } from '../components/StyledComponents';
import { Container, Divider, Grid, MenuItem, MenuList } from '@mui/material';



function WordList({ history }) {
    const [simWord, setSimWord] = useState()
    const [currentWord, setCurrentWord] = useState()

    const wordList = JSON.parse(localStorage.getItem("wordlist"))

    useEffect(() => {
        setCurrentWord(wordList[0])
    }, [])


    if (wordList === undefined) {
        return (
            <>
                <Appbar />
                오답 단어장이 없습니다!
            </>
        )
    }



    const handleDefinition = (item) => {
        async function getSim(sim) {
            try {
                const postJSON = {
                    word: sim
                }
                const response = await axios.post(`https://server.jasonchoi.dev:33307/word`, postJSON)
                console.log(response)
                setSimWord(response.data.word)
            } catch (err) {
                console.log(err)
            }
        }
        setCurrentWord(item);
        // getSim(item)
    }

    return (
        <>
            <Appbar />
            {wordList === undefined || currentWord === undefined ?
                <Spinner style={{ height: 80, width: 80 }} />
                :
                <Container>
                    <FullQuizCard elevation={2} style={{ padding : 16, paddingTop : 32 }}>
                        <Container style={{display : "flex"}}>
                            <Grid container spacing={4}>
                                <Grid item xs={3}>
                                    <CardTitle style={{ marginLeft : 15 }}>My Dictionary</CardTitle>
                                    <MenuList
                                        id="basic-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {wordList.map(item => (
                                            <>
                                                <MenuItem onClick={() => { handleDefinition(item) }}>{item.word}</MenuItem>
                                                
                                            </>
                                            
                                        ))}
                                    </MenuList>
                                </Grid>
                                <Grid item xs={9}>
                                    <TypoMainDefinition>Definition</TypoMainDefinition>
                                    <DividerMarginalized />
                                    <Grid container>
                                        <Grid item xs={12} lg={2}>
                                            <TypoSolutionWord>{currentWord.word}</TypoSolutionWord>
                                        </Grid>
                                        <Grid item xs={10}>
                                            {currentWord.items.map((item, idx) => (
                                                <>
                                                    <TypoSolutionWordContent>{currentWord.word + (idx + 1)}</TypoSolutionWordContent>
                                                    <TypoPos>{item.pos}</TypoPos>
                                                    <TypoDefinition>{item.definition}</TypoDefinition>
                                                </>
                                                        
                                            ))}
                                        </Grid>
                                    </Grid>

                                        
                                        
                                    {simWord === undefined ?
                                        <></>

                                        :
                                        <>
                                            <TypoMainDefinition>How about these words?</TypoMainDefinition>
                                            <TypoSimContent>{simWord}</TypoSimContent>
                                        </>
                                    }
                                    
                                </Grid>
                            </Grid>

                        </Container>
                    </FullQuizCard>
                </Container>
            }
        </>
    )

}

export default WordList