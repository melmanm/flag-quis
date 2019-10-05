import { level } from "../consts/quizConsts";
import { AnyAction } from "redux";

export const CHANGE_SETTINGS = "CHANGE_SETTINGS";
export type CHANGE_SETTINGS = typeof CHANGE_SETTINGS;

export interface IChangeSettingsAction {
    type: CHANGE_SETTINGS;
    gameLevel: level;
    numberOfPossibilities: number;
    gameDuration: number
}

export type SettingsActions = IChangeSettingsAction | AnyAction;

export function changeSettings (gameLevel: level, numberOfPossibilities: number, gameDuration: number) : IChangeSettingsAction
{
    return {
        type: CHANGE_SETTINGS,
        gameLevel: gameLevel,
        numberOfPossibilities: numberOfPossibilities,
        gameDuration: gameDuration
    }
}