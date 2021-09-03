import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import RemoveIcon from '@material-ui/icons/Remove';
import { useState, useEffect } from 'react';
import { API_DIRECTORY } from '../../../../constants';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    p: {
        fontSize: 12
      }
  }));

export default function GroupTitleModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [addingRecipient, setAddingRecipient] = useState(false);
  const [languageData, setLanguageData] = useState([]);

  useEffect(() => {
    if (languageData.length < 1) {

    }
    
    const headers = { 'Content-Type': 'application/json' };

    fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.LANGUAGES_TABLE_PATH}`, {
      method: 'GET',
      mode: 'cors',
      headers
    })
      .then((result) => {
        console.log(result);
      })
  }, []);

  const handleOpen = () => {
    if (!isEmptyObject(props.groupData)) {
      setOpen(true);
      //setAddingRecipient(!addingRecipient);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAddingRecipient(false);
  };

  function isEmptyObject(obj) {
    return JSON.stringify(obj) === '{}';
  }

  // ************************************************** RENDER FUNCTIONS *************************************************** //
  let renderTopDropDown = () => {
    console.log(props.groupData);

    if (isEmptyObject(props.groupData)) {
      return (
        <Grid item xs={3} button onClick={handleOpen}>
          <ListItem alignItems='flex-start'>
            <ListItemText >No Group Selected</ListItemText>
            <ListItemIcon><KeyboardArrowDownIcon /></ListItemIcon>
          </ListItem>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={3} button onClick={handleOpen}>
          <ListItem alignItems='flex-start'>
            <ListItemText >{props.groupData.name}</ListItemText>
            <ListItemIcon><KeyboardArrowDownIcon /></ListItemIcon>
          </ListItem>
        </Grid>
      );
    }
  }

  let renderAddRecipientFields = () => {
    return (
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="first-name"
          label="First Name"
          name="first-name"
          autoComplete="first name"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="last-name"
          label="Last Name"
          name="last-name"
          autoComplete="last name"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phone-number"
          label="Phone Number"
          name="phone-number"
          autoComplete="phone number"
          autoFocus
        />
        <form>
          <label for="language">Language:</label>
          <select name="language" id="language">
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="desert-speak">Desert-Speak</option>
          </select>

        </form>
      </form>
    );
  }

  let renderGroupData = () => {
    return (
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Group 1</h2>
          <div className={classes.p}>
            <p>{`Number of Users: `}</p>
            <p>{`Created: ${props.groupData.time_made}`}</p>
            <p>{`Description: ${props.groupData.description}`}</p>
          </div>
          <Divider />
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button key='Add Recipient' onClick={ () => {setAddingRecipient(!addingRecipient)} }>
              <ListItemText 
                primary='Add Recipient'/>
              <ListItemIcon> 
                {
                  addingRecipient ?
                  <RemoveIcon /> :
                  <AddIcon />
                }
              </ListItemIcon>
            </ListItem>
            {
              addingRecipient ?
              renderAddRecipientFields() :
              <div></div>
            }
            <Divider />
            <ListItem>
              <ListItemText primary="Select All" />
            </ListItem>
            <List component="nav" aria-label="secondary mailbox folders">
              {['Bob Schmeckly', 'Bill Smith', 'Bo Schmo'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                  <ListItemIcon> <EditIcon /> </ListItemIcon>
                  <ListItemIcon> <DeleteForeverIcon /> </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </List>
        </div>
      </Fade>
    );
  }
  // ************************************************ END RENDER FUNCTIONS ************************************************* //
  return (
    <div>
      {renderTopDropDown()}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {renderGroupData()}
      </Modal>
    </div>
  );
}