import { level, numberOfAttempts, numberOfPossibilities, gameLevel } from "../consts/quizConsts";
import { ThunkDispatch } from "redux-thunk";
import { SettingsActions, changeSettings } from "../actions/settingsActions";
import { List, ListItem, ListItemText, ListItemSecondaryAction, Switch, Slider, makeStyles, Select, MenuItem, Grid, Button } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { SettingsStore, ApplicationStore } from "../store/store";


export interface settingsProps {
    gameLevel: level;
    numberOfPossibilities: number;
    gameDuration: number

    changeSettings: (gameLevel: level, numberOfPossibilities: number, gameDuration: number) => void;

}

function valuetext(value: number) {
    return `${value}`;
}

const useStyles = makeStyles({
    slideBar: {
        width: 150,
    },

});



export function SettingsComponent(props: settingsProps) {


    const classes = useStyles();
    
  
    function handleLevelChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
        props.changeSettings(event.target.value as level ,props.numberOfPossibilities,props.gameDuration);
      };
      
      function handleNumberPossibilitiesChange(event: React.ChangeEvent<{}>, value: number | number []) {
        props.changeSettings( props.gameLevel ,value as number, props.gameDuration);
      };
      function handleNumberQuestionsChange(event: React.ChangeEvent<{}>, value: number | number []) {
        props.changeSettings( props.gameLevel ,props.numberOfPossibilities, value as number);
      };

    return (
        <Grid container xs={12}>
        <Grid item xs={12}>
        <List>
            <ListItem >
                <ListItemText primary="Level" />
                <ListItemSecondaryAction>
                    <Select
                        value={props.gameLevel}
                        onChange={e => handleLevelChange(e)}
                    >
                        <MenuItem value={level.easy}>Easy</MenuItem>
                        <MenuItem value={level.medium}>Medium</MenuItem>
                        <MenuItem value={level.hard}>Hard</MenuItem>
                        <MenuItem value={level.mixed}>Mixed</MenuItem>

                    </Select>
                </ListItemSecondaryAction>
            </ListItem >
            <ListItem >
                <ListItemText primary="Number of questions" />
                <ListItemSecondaryAction>
                    <Slider className={classes.slideBar}
                        defaultValue={numberOfAttempts}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        onChange = {handleNumberQuestionsChange}
                        step={5}
                        marks
                        min={5}
                        max={50}
                    />
                </ListItemSecondaryAction>
            </ListItem >
            <ListItem >
                <ListItemText primary="Number of posiibilities" />
                <ListItemSecondaryAction>
                    <Slider className={classes.slideBar}
                        defaultValue={numberOfPossibilities}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        onChange= {handleNumberPossibilitiesChange}
                        step={1}
                        marks
                        min={3}
                        max={10}
                    />
                </ListItemSecondaryAction>
            </ListItem >
        </List>
        </Grid>
        {/* <Grid container  xs={12} justify="flex-end">
            <Button>New Game</Button>
        </Grid> */}
        </Grid>
    );

}

export function mapStateToProps(store: ApplicationStore) {
    return {
        gameLevel: store.settings.gameLevel,
        numberOfPossibilities: store.settings.numberOfPossibilities,
        gameDuration: store.settings.gameDuration
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<any, any, SettingsActions>) {
    return {
        changeSettings: (gameLevel: level, numberOfPossibilities: number, gameDuration: number) => dispatch(changeSettings(gameLevel, numberOfPossibilities, gameDuration))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);