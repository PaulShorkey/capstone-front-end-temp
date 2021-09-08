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
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useState, useEffect } from 'react';
import { API_DIRECTORY, ERROR_MESSAGES, ERROR_TYPES } from '../../../../constants';


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
    submit: {
      margin: theme.spacing(3, 0, 2),
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
  const [languageDataLoaded, setLanguageDataLoaded] = useState(false);
  const [languageData, setLanguageData] = useState([]);
  const [commMethods, setCommMethods] = useState([]);
  const [commMethodsLoaded, setCommMethodsLoaded] = useState(false);
  const [recipientsData, setRecipientsData] = useState([]);
  const [recipientsDataLoaded, setRecipientsDataLoaded] = useState(false);
  const [numberOfRecipientsInGroup, setNumberOfRecipientsInGroup] = useState(0);

  const [error, setError] = useState({status: false, type: 'message', message: 'No Error'});

  // *************************************************** FETCH FUNCTIONS **************************************************** //
  let fetchLanguageData = () => {
    if (languageData.length < 1) {
      const headers = { 'Content-Type': 'application/json' };

      fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.LANGUAGES_TABLE_PATH}`, {
        method: 'GET',
        mode: 'cors',
        headers
      })
        .then((result) => {
          if (result.status === 200) {
            result = result.json()
              .then((result) => {
                setLanguageData(result);
                setLanguageDataLoaded(true);
              })
          }
        },
          (error) => {
            setError({ status: true, type: ERROR_TYPES.FATAL, message: ERROR_MESSAGES.ERROR_UNKNOWN })
          });
    }
  }

  let fetchCommMethodsData = () => {
    if (commMethods.length < 1) {
      const headers = { 'Content-Type': 'application/json' };

      fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.PROVIDER_CAPABILITIES_TABLE_PATH}`, {
        method: 'GET',
        mode: 'cors',
        headers
      })
        .then((result) => {
          if (result.status === 200) {
            result = result.json()
              .then((result) => {
                setCommMethods(result.data);
                setCommMethodsLoaded(true);
              })
          }
          else if (result.status === 404) {
            setError({ status: true, message: ERROR_MESSAGES.ERROR_404 })
            setCommMethodsLoaded(true);
          } else {
            setError({ status: true, message: ERROR_MESSAGES.ERROR_UNKNOWN })
            setCommMethodsLoaded(true);
          }
        },
          (error) => {
            setError({ status: true, message: ERROR_MESSAGES.ERROR_UNKNOWN })
            setCommMethodsLoaded(true);
          });
    }
  }

  let fetchRecipientsData = () => {
    const headers = { 'Content-Type': 'application/json' };

    fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.RECIPIENTS_IN_GROUP_PATH}/${props.groupData.group_id}`, {
      method: 'GET',
      mode: 'cors',
      headers
    })
      .then((result) => {
        if (result.status === 200) {
          result = result.json()
            .then((result) => {
              setRecipientsData(result);
              setRecipientsDataLoaded(true);
              setNumberOfRecipientsInGroup(result.length);
            })
        }
        else if (result.status === 404) {
          setError({ status: true, message: `${ERROR_MESSAGES.ERROR_404} @ RecipientsData` })
          setRecipientsDataLoaded(true);
          setRecipientsData([]);
        } else {
          setError({ status: true, message: `${ERROR_MESSAGES.ERROR_UNKNOWN} @ Recipients Data` })
          setRecipientsDataLoaded(true);
        }
      },
        (error) => {
          setError({ status: true, message: `${ERROR_MESSAGES.ERROR_UNKNOWN} @ Recipients Data` })
          setRecipientsDataLoaded(true);
        });

  }
  // ************************************************* END FETCH FUNCTIONS ************************************************** //
  useEffect(() => {
    console.log('group title modal useeffect');
    fetchLanguageData();
    fetchCommMethodsData();
    fetchRecipientsData();
  }, []);

  const handleOpen = () => {
    if (!isEmptyObject(props.groupData)) {
      setOpen(true);
      fetchRecipientsData();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAddingRecipient(false);
    setRecipientsData([]);
  };

  function isEmptyObject(obj) {
    return JSON.stringify(obj) === '{}';
  }

  // ************************************************** RENDER FUNCTIONS *************************************************** //
  let renderTopDropDown = () => {
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

  let renderLanguagesDropDownMenu = () => {
    if (languageDataLoaded) {
      if (!Array.isArray(languageData)) {
        setLanguageData([]);
      }

      return (
        <form>
          <label for="language">Language:</label>
          <select name="language" id="language-drop-down">
            {
              languageData.map((item) => {
                return <option value={`${item.language_id}`}>{`${item.name}`}</option>
              })
            }
          </select>

        </form>
      );
    } else {
      return (
        <form>
          <label for="language">Language:</label>
          <select name="language" id="language-drop-down">
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="desert-speak">Desert-Speak</option>
          </select>

        </form>
      );
    }
  }

  let renderCommMethodsDropdown = () => {
    if (commMethodsLoaded) {
      if (!Array.isArray(commMethods)) {
        setCommMethods([]);
      }

      return (
        <form>
          <label for="comm-methods">Comm Method:</label>
          <select name="comm-methods" id="comm-methods-drop-down">
            {
              commMethods.map((item) => {
                return <option value={`${item.pc_id}`}>{`${item.name}`}</option>
              })
            }
          </select>

        </form>
      );
    } else {
      return (
        <form>
          <label for="comm-methods">Language:</label>
          <select name="comm-methods" id="comm-methods-drop-down">
          </select>

        </form>
      );
    }
  }

  let handleAddRecipient = (event) => {
    event.preventDefault();

    let firstName = document.getElementById('first-name-input').value;
    let lastName = document.getElementById('last-name-input').value;
    let phoneNumber = document.getElementById('phone-number-input').value;
    let language = document.getElementById('language-drop-down').value;
    let commMethod = document.getElementById('comm-methods-drop-down').value;

    let errorMessage = '';

    if (firstName === undefined || typeof firstName !== 'string' || firstName === '') errorMessage += 'Please Provide a Value for First Name\n';
    if (lastName === undefined || typeof lastName !== 'string' || lastName === '') errorMessage += 'Please Provide a Value for Last Name\n';
    if (phoneNumber === undefined || typeof phoneNumber !== 'string' || phoneNumber === '') errorMessage += 'Please Provide a Value for Phone Number\n';
    if (language === undefined || typeof language !== 'string' || language === '') errorMessage += 'Please Select a Language\n';
    if (commMethod === undefined || typeof commMethod !== 'string' || commMethod === '') errorMessage += 'Please Select a Communication Method';

    if (errorMessage.length > 0) {
      alert(errorMessage);
    } else {
      const headers = { 'Content-Type': 'application/json' };

      fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.RECIPIENTS_TO_GROUP_POST_PATH}/${props.groupData.group_id}`, {
        method: 'POST',
        mode: 'cors',
        headers,
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          language: language,
          comm_method: commMethod
        })
          
          })
        .then((result) => {
          if (result.status === 200) {
            result = result.json()
              .then((result) => {
                let data = recipientsData;
                data.push(result[0]);
                setRecipientsData(data);
                setAddingRecipient(!addingRecipient);
                setNumberOfRecipientsInGroup(data.length);
              })
          } else {
            setError({status: true, type: ERROR_TYPES.NON_FATAL, message: ERROR_MESSAGES.ERROR_500})
          }
        })
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
          id="first-name-input"
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
          id="last-name-input"
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
          id="phone-number-input"
          label="Phone Number"
          name="phone-number"
          autoComplete="phone number"
          autoFocus
        />
        {renderLanguagesDropDownMenu()}
        {renderCommMethodsDropdown()}
        <br/>
        <Button className={classes.submit} onClick={handleAddRecipient}>SUBMIT</Button>
      </form>
    
    );
  }

  let renderRecipients = () => {
    if (recipientsDataLoaded) {
      return (
        <List component="nav" aria-label="secondary mailbox folders">
          {recipientsData.map((element, index) => (
            <ListItem button key={element.recipient_id}>
              <ListItemText primary={`${element.first_name} ${element.last_name}`} />
              <ListItemIcon> <EditIcon /> </ListItemIcon>
              <ListItemIcon> <DeleteForeverIcon /> </ListItemIcon>
            </ListItem>
          ))}
        </List>
      );
    } else {
      return (
        <List component="nav" aria-label="secondary mailbox folders">
          {['Bob Schmeckly', 'Bill Smith', 'Bo Schmo'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
              <ListItemIcon> <EditIcon /> </ListItemIcon>
              <ListItemIcon> <DeleteForeverIcon /> </ListItemIcon>
            </ListItem>
          ))}
        </List>
      );
    }
    
  }

  let renderGroupData = () => {
    return (
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">{`${props.groupData.name}`}</h2>
          <div className={classes.p}>
            <p>{`Number of Users: ${numberOfRecipientsInGroup}`}</p>
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
            {renderRecipients()}
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