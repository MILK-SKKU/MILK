import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { hot } from 'react-hot-loader'
import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Main from './pages/Main';
import RandomQuiz from './pages/RandomQuiz';
import CreateQuiz from './pages/CreateQuiz';
import WordList from './pages/WordList';



function App() {
  return(
    <>
    <StyledEngineProvider injectFirst>
      <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/randomquiz" component={RandomQuiz}/>
          <Route exact path="/createquiz" component={CreateQuiz}/>
          <Route exact path="/wordlist" component={WordList}/>
        </Switch>
      </BrowserRouter>
      </div>      
    </StyledEngineProvider>
    </>

  )
}

export default hot(module)(App);
