import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

/// FILE IMPORTS ///
import GroupTitleModal from './GroupTitle/GroupTitleModal.js'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto'
    }
  });
  
export default function GroupTitle (){
    const classes = useStyles();
    //State for loggedIn user

  //State for messages list in view
  const [messages, setMessages] = useState([]);

   const [messageValue, setMessageValue]= useState('')

  //Stores changes iin text field as things are typed
  const handleTyping = (event) => {
      setMessageValue(event.target.value)
  }
  
  //when send button is clicked, adds item to messages
  const handleSend = () => {
    setMessages([...messages, {'content':messageValue, 'time':'11:15','sender':'GlLaDOS'}])
  }

    return (
       <div>
           <Grid container  direction="column" >
              <GroupTitleModal/>
           </Grid>         
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    {messages.map((message, index) => (
                        <ListItem key={index}>
                          <Grid container>
                            <Grid item xs={12}>
                              <ListItemText align="right" primary={message.content}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText align="right" secondary={`${message.sender} - ${message.time}`}></ListItemText>
                            </Grid>
                          </Grid>
                        </ListItem>        
                    ))}         
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}} align='right'>
                    <Grid item xs={11} align='right'>
                        <TextField onChange={handleTyping} value={messageValue} id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align='right'>
                        <Fab color="primary" aria-label="add" onClick={handleSend}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}



/**{content:"The British are coming", time:'9:30', sender:"Paul"},
    {content:"This is Sparta", time:'9:31',sender:"Sparticus"},
    {content:"Nah fam, its our gold", time:'10:35',sender:"Nixon"} */