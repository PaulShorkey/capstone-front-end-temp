import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/// FILE IMPORTS ///
import AppBar from './AppBar/AppBar.js'
import GroupSelector from './GroupSelector/GroupSelector.js';
import MessagesView from './Messages/MessagesView.js'
import NewMessage from './Messages/NewMessage.js'
import { useState } from 'react';
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
  const [groupData, setGroupData] = useState({});

  // ************************************************** CALLBACKS ******************************************************* //
  let updateGroupTitleModal = (data) => {
    console.log('working : ', data);
    setGroupData(data);
  }
  // *********************************************** END CALLBACKS ******************************************************* //

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
                <GroupSelector updateGroupTitleModal={updateGroupTitleModal}/>
              </Grid>
              <Grid key='MessagesView' item className={classes.messagesView}>
                <MessagesView groupData={groupData}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </body>
      </div>        
    );
}