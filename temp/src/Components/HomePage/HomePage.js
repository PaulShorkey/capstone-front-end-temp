import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/// FILE IMPORTS ///
import AppBar from './AppBar/AppBar.js'
import GroupSelector from './GroupSelector/GroupSelector.js';
import MessagesView from './Messages/MessagesView.js'
import NewMessage from './Messages/NewMessage.js'
import { getThemeProps } from '@material-ui/styles';
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

export default function Home(props){
  const [groupData, setGroupData] = useState({});
  const [messagesNeedUpdating, setMessagesNeedUpdating] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);



 // ***********SETS WINDOW RESPONSIVENES *************************//
 useEffect(() => {
  const setResponsiveness = () => {
    return window.innerWidth < 1280
      ? setIsMobileView(true)
      : setIsMobileView(false);
  };

  setResponsiveness();
  window.addEventListener("resize", () => setResponsiveness());

  return () => {
    window.removeEventListener("resize", () => setResponsiveness());
  }
}, []);

  // ************************************************** CALLBACKS ******************************************************* //
  let updateGroupTitleModal = (data) => {
    setGroupData(data);
    setMessagesNeedUpdating(true);
  }

  let updateMessageViewComponent = (value) => {
    setMessagesNeedUpdating(value);
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
                <MessagesView appData={props.appData} groupData={groupData} messagesNeedUpdating={messagesNeedUpdating} updateMessageViewComponent={updateMessageViewComponent}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </body>
      </div>        
    );
}