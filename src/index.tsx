
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { QuizActions } from './actions/quizActions';
import { store } from './store/store';
import { quizReducer } from './reducers/quizReducer';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import Quiz from './components/Quiz';
import thunk from 'redux-thunk';
import { numberOfAttempts, gameLevel, numberOfPossibilities } from './consts/quizConsts';
import Settings from './components/Settings';



const unsubscribe = store.subscribe(() => console.log(store.getState()))
ReactDOM.render(
<Provider store={store}>
  <Quiz/> 
</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();