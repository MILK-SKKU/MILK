import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { hot } from 'react-hot-loader'
import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Main from './components/Main';
import Quiz from './components/NormalMode';
import MyOwnQuiz from './components/MyOwnQuiz';
import WordList from './components/WordList';



function App() {
  return(
    <>
    <StyledEngineProvider injectFirst>
      <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/normalmode" component={Quiz}/>
          <Route exact path="/myquiz" component={MyOwnQuiz}/>
          <Route exact path="/wordlist" component={WordList}/>
        </Switch>
      </BrowserRouter>
      </div>      
    </StyledEngineProvider>
    </>

  )
}

export default hot(module)(App);
