import { useEffect, useState } from 'react'
import Appbar from '../components/Appbar';
import axios from 'axios'
import { CardTitle, DividerMarginalized, FullQuizCard, SolutionCard, SolutionLineDiv, Spinner, SubmitButton, TypoDefinition, TypoMain, TypoMainDefinition, TypoPos, TypoSim, TypoSimContent, TypoSolutionWord, TypoSolutionWordContent } from '../components/StyledComponents';
import { Button, Container, Divider, Grid, Menu, MenuItem, MenuList } from '@mui/material';



function WordList({ history }) {
    const [simWord, setSimWord] = useState()
    const [currentWord, setCurrentWord] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const rawWordList = localStorage.getItem("wordlist");
    
    const wordList = rawWordList === null ? [] : JSON.parse(rawWordList) 
    console.log(wordList);
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
                <Container>
                    <FullQuizCard elevation={2} style={{ padding: 16, paddingTop: 32, minHeight : 500 }}>
                        <TypoMainDefinition>
                            There is no word in dictionary!
                        </TypoMainDefinition>
                    </FullQuizCard>
                </Container>
                :
                <Container>
                    <FullQuizCard elevation={2} style={{ padding : 16, paddingTop : 32, minHeight:500 }}>
                        <Container>
                            <Grid container spacing={4}>
                            
                                <Grid item
                                    sx={{ display: { xs: 'none', md: 'block' } }}   
                                    xs={12} md={3}
                                >
                                    <CardTitle style={{ marginLeft : 15 }}>Word List</CardTitle>
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
                                <Grid item xs={12} md={9}>
                                    <TypoMainDefinition>My Dictionary</TypoMainDefinition>
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
                                <Grid item
                                    sx={{ display: { xs: 'flex', md: 'none' } }}
                                    xs={12} md={3}
                                >
                                    <SubmitButton
                                        id="basic-button"
                                        aria-controls="basic-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        Word List
                                    </SubmitButton>
                                    <Menu
                                        id="basic-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            horizontal: 'center',
                                        }}
                                    >
                                        {wordList.map(item => (
                                            <>
                                                <MenuItem onClick={() => { handleClose(); handleDefinition(item) }}>{item.word}</MenuItem>

                                            </>

                                        ))}
                                    </Menu>
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