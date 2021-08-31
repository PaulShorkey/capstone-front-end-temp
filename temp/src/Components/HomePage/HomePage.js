import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/// FILE IMPORTS ///
import AppBar from './AppBar/AppBar.js'
import GroupSelector from './GroupSelector/GroupSelector.js';
import MessagesView from './Messages/MessagesView.js'
import NewMessage from './Messages/NewMessage.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  groupSelector: {
    justifyContent: "left",
    height: '100%',
    width: '40%',
  },
  messagesView: {
    justifyContent: "left",
    height: '100%',
    width: '60%',
  }
}));

export default function Home(){

  const classes = useStyles();

    return(
      <div>
        <header>
          <AppBar />
        </header>
        <body>
        <Grid container className={classes.root}>
          <Grid item md={10}>
            <Grid container >
              <Grid key='GroupSelector' item className={classes.groupSelector}>
                <GroupSelector/>
              </Grid>
              <Grid key='MessagesView' item className={classes.messagesView}>
                <MessagesView/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </body>
      </div>        
    );
}