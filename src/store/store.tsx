import { quizItem } from "../types/quizTypes";
import { level, numberOfAttempts, gameLevel, numberOfPossibilities } from "../consts/quizConsts";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { QuizActions } from "../actions/quizActions";
import { quizReducer } from "../reducers/quizReducer";
import thunk from "redux-thunk";
import { RootActions } from "../actions/rootActions";
import { settingsReducer } from "../reducers/settingsReducer";

export interface QuizStore{
    currentFlagUrl: string;
    currentCountryName: string;
    currentAnswer: string;
    score: number;
    posibilities: string[];
    isResult: boolean;
    isGameOver: boolean;
    attempts: number;
    isNewGame: boolean;

}   

export interface SettingsStore{
    gameDuration: number;
    gameLevel: level;
    numberOfPossibilities: number;
}


export interface ApplicationStore {
    settings: SettingsStore;
    quiz: QuizStore;
}

export const rootReducer = combineReducers<ApplicationStore>({quiz : quizReducer,settings : settingsReducer});

export const store = createStore<ApplicationStore,RootActions,any,any>(rootReducer, {
    quiz:{
    currentAnswer: "",
    score: 0,
    currentCountryName: "",
    currentFlagUrl: "",
    posibilities: [""],
    isResult: false,
    isGameOver: false,
    isNewGame: true,
    attempts: 0,
    },
    settings:{
    gameDuration: numberOfAttempts,
    gameLevel: gameLevel,
    numberOfPossibilities: numberOfPossibilities}
  },
  applyMiddleware(thunk));   