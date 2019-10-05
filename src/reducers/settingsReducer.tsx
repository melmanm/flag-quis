

import { SettingsActions, CHANGE_SETTINGS } from "../actions/settingsActions";
import { Reducer } from "redux";
import { SettingsStore } from "../store/store";

export const settingsReducer: Reducer = (store: SettingsStore, action: SettingsActions): SettingsStore => {
    switch (action.type) {
        case CHANGE_SETTINGS: {
            
            return { ...store, gameLevel: action.gameLevel, gameDuration: action.gameDuration, numberOfPossibilities: action.numberOfPossibilities };
        }
        default:
            return {...store};
    }
}