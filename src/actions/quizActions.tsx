import { type } from "os";
import { func, string } from "prop-types";
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk"
import { quizItem, quizItemWithPossibilities } from "../types/quizTypes";
import { numberOfPossibilities, level, gameLevel } from "../consts/quizConsts";
import { ISettings } from "../types/settingsTypes";
import { store } from "../store/store";





export const NEW_GAME = "NEW_GAME"
export type NEW_GAME = typeof NEW_GAME;

export const SUBMIT = "SUBMIT"
export type SUBMIT = typeof SUBMIT;

export const GET = "GET"
export type GET = typeof GET;

export const UPDATE = "UPDATE"
export type UPDATE = typeof UPDATE;

export const VERIFY = "VERIFY"
export type VERIFY = typeof VERIFY;

export const CHANGE_SELECTION = "CHANGE_SELECTION"
export type CHANGE_SELECTION = typeof CHANGE_SELECTION;

export interface ISubmitAction {
    type: SUBMIT;
}
export interface INewGameAction {
    type: NEW_GAME;
}

export interface IGetItemAction {
    type: GET;
}

export interface IUpdateAction {
    type: UPDATE;
    quizItemWithPossibilities: quizItemWithPossibilities;
    gameDuration: number;
}

export interface IChangeSelectionAction {
    type: CHANGE_SELECTION;
    newSelection: string;
}

export interface IVerifyAction {
    type: VERIFY;
}

export type QuizActions = ISubmitAction | INewGameAction | IGetItemAction | IUpdateAction | IVerifyAction | IChangeSelectionAction

export function submit(): ISubmitAction {
    return {
        type: SUBMIT
    }
}

export function changeSelection(newSelection: string): IChangeSelectionAction {
    return {
        type: CHANGE_SELECTION,
        newSelection: newSelection
    }
}

export function newGame(): INewGameAction {
    return {
        type: NEW_GAME
    }
}

export function verifyAnswer(): IVerifyAction {
    return {
        type: VERIFY
    }
}

export function updateQuizItem(quizItemWithPossibilities: quizItemWithPossibilities, gameDuration: number): IUpdateAction {
    return {
        type: UPDATE,
        quizItemWithPossibilities: quizItemWithPossibilities,
        gameDuration: gameDuration
    }
}

export const getNextQuizItem: ActionCreator<ThunkAction<Promise<void>, null, null, QuizActions>> = () => {
    return async (dispatch: Dispatch) => {
        let quizItemWithPossibilities = await getNewQuizItem();
        dispatch(updateQuizItem(quizItemWithPossibilities, store.getState().settings.gameDuration));
    }
}

async function getNewQuizItem(): Promise<quizItemWithPossibilities> {
    let result: quizItemWithPossibilities = { quizItem: { flagImgURL: "", countryName: "" }, possibilities: [] };
    await fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then((data) => {
            let filtereddata = data;
            let gameLevel = store.getState().settings.gameLevel;
            switch(gameLevel){
                case (level.easy) :{
                    filtereddata =data.filter((x: any) => x.name.split(' ').length == 1 ); break;
                }
                case (level.medium) :{
                    filtereddata =data.filter((x: any) => x.name.split(' ').length <= 2 ); break;
                }
                case (level.hard) :{
                    filtereddata = data.filter((x: any) => x.name.split(' ').length <=3 && x.name.split(' ').length >=2 ); break;
                }
                
            }
            let size = filtereddata.length;
            let numberOfPossibilities = store.getState().settings.numberOfPossibilities;
            let questionIndex = Math.floor(Math.random() * numberOfPossibilities );
            for (let i = 0; i < numberOfPossibilities; i++) {
                let random = Math.floor(Math.random() * size);
                let selected = filtereddata[random];
                result.possibilities.push(selected.name);
                if (i == questionIndex) {
                    result.quizItem.countryName = selected.name;
                    result.quizItem.flagImgURL = selected.flag;
                }
            }
        })
    return result;
}
