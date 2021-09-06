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
import { API_DIRECTORY } from '../../../constants';

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
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}));

export default function AddGroupModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let handleAddGroup = () => {
    let name = document.getElementById('add-group-name-input').value;
    let description = document.getElementById('add-group-description-input').value;
    let errorMessage = '';

    if (name === undefined || typeof name !== 'string' || name === '') errorMessage += 'Please Provide a Value for Group Name\n';
    if (description === undefined || typeof description !== 'string' || description === '') errorMessage += 'Please Provide a Value for Group Description';

    if (errorMessage.length > 0) {
      alert(errorMessage);
    } else {
      const headers = { 'Content-Type': 'application/json' };

      fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.GROUPS_TABLE_PATH}`, {
        method: 'POST',
        mode: 'cors',
        headers,
        body: JSON.stringify({
          name: name,
          description: description
        })
      })
        .then((result) => {
          console.log('GROUP RESULT ', result);
          if (result.status === 201) {
            console.log('Group Added');
            props.handleGroupAdded();
            setOpen(false);
          } else {
            console.log('Failed to Add Group');
          }
        })
    }
  }

  return (
    <div>
      <ListItem button key='Add Group' onClick={handleOpen}>
        <ListItemText primary = 'Add Group' />
        <ListItemIcon> <AddIcon/> </ListItemIcon>
      </ListItem>
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
          <h2 id="transition-modal-title">Add New Group</h2>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="add-group-name-input" label="Group Name" variant="filled" />
            <TextField id="add-group-description-input" label="Group Description" variant="filled" />
            <Button 
              variant="outlined"
              onClick={handleAddGroup}>
                Add Group
            </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}