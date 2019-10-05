import { quizItem } from "../types/quizTypes";
import React, { useEffect } from "react";
import { QuizActions, newGame, submit, getNextQuizItem, verifyAnswer, changeSelection } from "../actions/quizActions";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Paper, Typography, Theme, createStyles, makeStyles, PropTypes, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";
import { Classes } from "jss";
import { verify } from "crypto";
import { thisTypeAnnotation } from "@babel/types";
import OkIcon from '@material-ui/icons/Check';
import NotOkIcon from '@material-ui/icons/Close';
import { QuizStore, ApplicationStore } from "../store/store";
import Settings from "./Settings";


interface quizProps {
  currentFlagUrl: string;
  currentCountryName: string;
  currentAnswer: string;
  score: number;
  posibilities: string[];
  isResult: boolean;
  attempts: number;
  isGameOver: boolean;
  isNewGame: boolean;

  newGame: () => void;
  submit: () => void;
  verify: () => void;
  changeSelection: (newSelection: string) => void;
}

const useStyles = makeStyles({
  root: {
    padding: 40,
  },
  paper: {
    padding: 25,
    width: 650,
    background: "#fafafa",
  },
  textField: {
    padding: 7,
  },
  radioGrid: {
    padding: 15
  },
  formControl: {
    flexGrow: 1,
  },
  flag: {
    padding: 15
  }
});



export function QuizComponent(quizProps: quizProps) {
  const classes = useStyles();

  const [value, setValue] = React.useState('');

  function handleChange(event: React.ChangeEvent<unknown>, value: string) {
    if(!quizProps.isResult){
    setValue((event.target as HTMLInputElement).value);
    quizProps.changeSelection(value);}
  }

  useEffect(() => {
    quizProps.newGame();
  }, []);


  return (
    <div>
      <Grid className={classes.root} container xs={12} justify="center">
        <Paper className={classes.paper}>
        <Grid item container xs={12}>
              <Grid item xs={6} >
                <Typography variant="h5" component="h3">Flag Quiz</Typography>
              </Grid>
              { quizProps.isNewGame == false &&
              <Grid container xs={6} alignContent="flex-end" justify="flex-end">
                <Typography variant="h5" component="h4">Score: {quizProps.score}/{quizProps.attempts}</Typography>
              </Grid>
              }
              </Grid>
          {/* game mode */}
          {quizProps.isGameOver == false && quizProps.isNewGame == false &&
            <Grid item container xs={12}>
              <Grid container xs={12} justify="center">
                <img src={quizProps.currentFlagUrl} width="500x" height="300px" className={classes.flag}></img>
              </Grid>
              <Grid container xs={12} className={classes.radioGrid} justify="center">
                <FormControl component="fieldset" className={classes.formControl}>
                  <RadioGroup value={value} onChange={handleChange} >
                    <Grid container xs={12} >
                      {quizProps.posibilities.map((name) => {
                        return (
                          <Grid container direction="row" xs={12} alignContent="stretch">
                            <Grid container xs={9} alignContent="stretch" >
                              <FormControlLabel value={name} control={<Radio color="primary" />} label={name} />
                            </Grid>
                            <Grid container xs={3} justify="flex-end">
                              {quizProps.isResult && quizProps.currentCountryName == name &&
                                <OkIcon fontSize="large" color="primary" />
                              }
                              {quizProps.isResult && quizProps.currentAnswer == name && quizProps.currentCountryName != name &&
                                <NotOkIcon fontSize="large" color="error" />
                              }
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} >
                <Button onClick={quizProps.newGame} size="large">Restart</Button>
              </Grid>
              <Grid container xs={6} justify="flex-end">
                {quizProps.isResult &&
                  <Button onClick={quizProps.submit} variant="contained" color="primary" size="large">Next</Button>
                }
                {quizProps.isResult == false &&
                  <Button onClick={quizProps.verify} variant="contained" color="primary" size="large">Check</Button>
                }
              </Grid>
            </Grid>
          }
          {quizProps.isGameOver == true &&
            <Grid container xs={12} >
              <Grid container xs={12} justify="center">
                <Typography variant="h5" component="h4">Your score is: {quizProps.score}/{quizProps.attempts}</Typography>
              </Grid>
            </Grid>
          }
          {(quizProps.isNewGame == true || quizProps.isGameOver) == true &&
            <Grid container xs={12}>
              <Settings />
              <Grid container xs={12} justify="flex-end">
                <Button onClick={()=>{ quizProps.newGame(); quizProps.submit()}} variant="contained" color="primary" size="large">Start New Game</Button>
              </Grid>
            </Grid>
          }
        </Paper>
      </Grid>
    </div>

  )

}

export const mapStateToProps = (state: ApplicationStore) => {
  return {
    currentCountryName: state.quiz.currentCountryName,
    currentFlagUrl: state.quiz.currentFlagUrl,
    currentAnswer: state.quiz.currentAnswer,
    score: state.quiz.score,
    posibilities: state.quiz.posibilities,
    isResult: state.quiz.isResult,
    attempts: state.quiz.attempts,
    isGameOver: state.quiz.isGameOver,
    isNewGame: state.quiz.isNewGame,
  }
}

export const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, QuizActions>) => {
  return ({
    newGame: () => { dispatch(newGame()); },
    submit: () => { dispatch(getNextQuizItem()); },
    verify: () => { dispatch(verifyAnswer()); },
    changeSelection: (newSelection: string) => { dispatch(changeSelection(newSelection)) }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizComponent);