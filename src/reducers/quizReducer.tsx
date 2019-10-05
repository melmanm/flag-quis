
import { level } from "../consts/quizConsts";
import { QuizActions, NEW_GAME, SUBMIT, UPDATE, VERIFY, CHANGE_SELECTION } from "../actions/quizActions";
import { quizItem } from "../types/quizTypes";
import { Reducer } from "redux";
import { async } from "q";
import { QuizStore, store as globalStore } from "../store/store";

export const quizReducer: Reducer = (store: QuizStore, action: QuizActions): QuizStore => {
    switch (action.type) {
        case UPDATE: {
           
            if(store.attempts === action.gameDuration){
                return {...store, isGameOver: true}
            }
            else{
            return {
                ...store,
                currentCountryName: action.quizItemWithPossibilities.quizItem.countryName,
                currentFlagUrl: action.quizItemWithPossibilities.quizItem.flagImgURL,
                posibilities: action.quizItemWithPossibilities.possibilities,
                isNewGame: false,
                isResult: false,
                currentAnswer: ""
            }
            };
        }
        case NEW_GAME: {
            return { ...store, score: 0, attempts:0, isGameOver:false, isNewGame: true }
        };
        case VERIFY: {
            if (store.currentCountryName == store.currentAnswer) {
                return { ...store, score: store.score + 1 , isResult: true, attempts: store.attempts +1};
            }
            else {
                return { ...store, isResult: true, attempts: store.attempts +1 };
            }
        };
        case CHANGE_SELECTION: {
            return { ...store, currentAnswer: action.newSelection };
        }
        default: return { ...store };
    }
}


// function calculateScore() : number
// {
//     return numberOfPossibilities * level;
// }