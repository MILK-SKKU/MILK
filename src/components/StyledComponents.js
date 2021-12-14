import styled from 'styled-components';
import { AppBar, Box, Divider, Typography, Button, Container, Card, MenuList, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


export const TypographyP = styled(Typography)`
    font-family : "Pretendard";
    font-size : 18px;
    line-height : 42px;
`
export const DividerMarginalized = styled(Divider)`
    margin-top : 12px;
    margin-bottom : 12px;
`
export const Spinner = styled(CircularProgress)`
    position: fixed;
    left: calc(50% - 40px);
    top: calc(50vh - 70px);
`
export const NextQuestionBar = styled(AppBar)`
    height: 60px;
    bottom: 0;
    top: auto;
    `
export const NextButton = styled(Button)`
    position: absolute;
    right: 40px;
    height: 40px;
    width: 80px;
    background: #FFF;;
    top: 10px;
    border-radius: 5px;
    `
export const FullQuizCard = styled(Card)`
    padding : 24px 36px;
    margin-top : 32px;
    `
export const CardTitle = styled(TypographyP)`
    font-weight : 600;
    font-size: 32px;
    `
export const LineDiv = styled.div`
    display: flex;
    flex-direction: row;
    `
export const Speaker = styled(TypographyP)`
    color: #3299FF;
    display: inline-block;
    min-width: 40px;
    font-weight : 600;
    margin-left : 1px;    
    `
export const Conversation = styled(TypographyP)`
    margin-left: 10px;
    `

export const OptionDiv = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    @media only screen and (max-width: 768px){
        grid-template-columns: 1fr;
    }
`
export const OptionButton = styled(Button)`
    font-size : 24px;
    height : 60px;
    border: 1px solid #3299FF;
    border-radius: 40px;
    `
export const CorrectOptionButton = styled(OptionButton)`
    border: ${props => props.flag ? "1px solid #00B448" : "1px solid #3299FF"} ;
    color: ${props => props.flag ? "#00B448" : "#3299FF"} ;
`
export const WrongOptionButton = styled(OptionButton)`
    border: ${props => props.flag ? "1px solid #00B448" : "1px solid #3299FF"} ;
    color: ${props => props.flag ? "#00B448" : "#3299FF"} ;
`
export const WrongClickOptionButton = styled(OptionButton)`
    border: 1px solid #FF3232;
    color : #FF3232;
`
export const TypoQuestion = styled(TypographyP)`
    line-height : 24px;
    margin : 24px 0;
    color: ${props => props.color};
`
export const SolutionContainer = styled.div`
    margin-top : 32px;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr 1fr;

    @media only screen and (max-width: 768px){
        grid-template-columns: 1fr;
    }
    `
export const SolutionCard = styled.div`
    border: 1px solid #3299FF;
    border-radius: 40px;
    padding : 16px 24px;
`
export const TypoSolutionWord = styled(TypographyP)`
    font-weight : 600;
    font-size: 28px;
    margin-bottom : 16px;
    `
export const SolutionLineDiv = styled.div`
    display: flex;
    flex-direction: row;
`

export const TypoSolutionWordContent = styled(TypographyP)`
    display : inline;
    font-weight : 600;
    color: #3299FF;
    min-width: 60px;
    margin-right : 10px;
    font-size : 24px;
    `
export const TypoDefinition = styled(TypographyP)`
    margin-bottom : 8px;
`
export const TypoPos = styled(TypographyP)`
    display : inline;
    font-weight : 600;
    margin-right : 12px;
    font-size: 18px;
    color: #999999;
    `

export const TypoMain = styled(Typography)`
    font-weight: 600;
    font-size: 24px;
    color: #3299FF;
    `

export const WordMenuList = styled(MenuList)`
    `

export const TypoMainDefinition = styled(Typography)`
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
    color: #3299FF;
    top: 20px;
    left: 30px;
    `

export const TypoSim = styled(Typography)`
    font-size: 36px;
    color: #3299FF;

    `
export const TypoSimContent = styled(Typography)`
    font-weight: 500;
    font-size: 30px;
    line-height: 42px;
    color: #000000;
    `
export const TypoNoWordList = styled(Typography)`
    font-weight: 500;
    font-size: 36px;
    color: #3299FF;
    `

export const UserTextInput = styled(TextField)`
    width: 100%;
    height: 280px;
    border : none;
`

export const SubmitButton = styled(OptionButton)`
    width : 100%;
`