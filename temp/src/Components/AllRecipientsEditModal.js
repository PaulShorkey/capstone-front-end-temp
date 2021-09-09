import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { TableCell } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { API_DIRECTORY } from '../constants';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));

export default function AllRecipientsEditModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [languageData, setLanguageData] = React.useState([]);
    const [languageDataLoaded, setLanguageDataLoaded] = React.useState(false);
    const [commData, setCommData] = React.useState([]);
    const [commDataLoaded, setCommDataLoaded] = React.useState(false);

    const handleOpen = () => {
        console.log(props.recipientData);
        fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.LANGUAGES_TABLE_PATH}`)
        .then(res => res.json())
        .then((data) => {
            setLanguageDataLoaded(true);
            setLanguageData(data);
        })
        .then( () => {
            fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.PROVIDER_CAPABILITIES_TABLE_PATH}`)
            .then(res => res.json())
            .then((data) => {
                setCommDataLoaded(true);
                setCommData(data.data);
            })
        })
        .then(() => {
            setOpen(true);
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

    }, [])

    const handleEditSubmit = () => {
        let firstName = document.getElementById('first-name-input').value;
        let lastName = document.getElementById('last-name-input').value;
        let phoneNumber = document.getElementById('phone-number-input').value;
        
        let language = document.getElementById('language-selector').value;
        let languageID = -1;
        for (let i = 0; i < languageData.length; i++) {
            if (languageData[i].language_name.toUpperCase() === language.toUpperCase()) {
                languageID = languageData[i].language_id;
            }
        }
        let commMethod = document.getElementById('comm-methods-selector').value;
        let commMethodID = -1;
        for (let i = 0; i < commData.length; i++) {
            if (commData[i].pc_name.toUpperCase() === commMethod.toUpperCase()) {
                commMethodID = commData[i].pc_id;
            }
        }
        let comments = document.getElementById('comments-input').value;

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

            fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.RECIPIENT_UPDATE_PATH}/${props.recipientData.recipient_id}`, {
                method: 'PUT',
                mode: 'cors',
                headers,
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNumber,
                    language : languageID,
                    comm_method: commMethodID,
                    comments : comments
                })
            })
            .then((result) => {
                console.log('RESULT : ', result)
            })
        }
        props.handleEditSubmit();
        setOpen(false);
    }
    const renderLanguageOptions = () => {
        if (languageDataLoaded) {
            return (
                languageData.map((element) => {
                    return <option value={`${element.language_name}`}>{`${element.language_name}`}</option>
                })
            );
        } else {
            return (
                <option value="languages-not-loaded">Languages Not Loaded</option>
            );
        }
    }

    const renderCommMethodOptions = () => {
        if (commDataLoaded) {
            return (
                commData.map((element) => {
                    return <option value={`${element.pc_name.toUpperCase()}`}>{`${element.pc_name.toUpperCase()}`}</option>
                })
            );
        } else {
            return (
                <option value="comm-methods-not-loaded">Comm Methods Not Loaded</option>
            );
        }
    }

    return (
        <TableCell align="center">
            <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleOpen}
              > <EditIcon /></IconButton>
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
                  <Fade in={open}>
                      <div className={classes.paper}>
                          <h2 id="transition-modal-title">Edit Recipient</h2>
                          <form className={classes.root} noValidate autoComplete="off">
                              <TextField id="first-name-input" label="First Name" variant="filled" defaultValue={`${props.recipientData.first_name}`}/>
                              <TextField id="last-name-input" label="Last Name" variant="filled" defaultValue={`${props.recipientData.last_name}`}/>
                              <TextField id="phone-number-input" label="Phone Number" variant="filled" defaultValue={`${props.recipientData.phone_number}`}/>
                              <label for="languages">Language :</label>
                              <select name="languages" id="language-selector" defaultValue={`${props.recipientData.language_name}`}>
                                  {renderLanguageOptions()}
                              </select>
                              <select name="comm-methods" id="comm-methods-selector" defaultValue={`${props.recipientData.pc_name.toUpperCase()}`} >
                                  {renderCommMethodOptions()}
                              </select>
                              {
                                  props.recipientData.comments ?    
                                  <TextField id="comments-input" label="Comments" variant="filled" defaultValue={`${props.recipientData.comments}`}/> :
                                  <TextField id="comments-input" label="Comments" variant="filled" defaultValue={``}/>
                              }
                              <Button
                                  variant="outlined"
                                  onClick={ () => {handleEditSubmit()} }
                                  >
                                  Submit
                              </Button>
                          </form>
                      </div>
                  </Fade>
              </Modal>
          </TableCell>
      );
  }