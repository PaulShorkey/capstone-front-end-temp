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
    },
    p: {
        fontSize: 12
      }
  }));

export default function GroupTitleModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid item xs={3}  button onClick={handleOpen}>
          <ListItem alignItems='flex-start'>
                <ListItemText >Group 1</ListItemText>
                <ListItemIcon><KeyboardArrowDownIcon/></ListItemIcon>
          </ListItem>
      </Grid>
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
          <h2 id="transition-modal-title">Group 1</h2>
          <div className={classes.p}>
            <p>Number of Users:12</p>
            <p>Created: 8-31-2021</p>
            <p>Description: Vetted Interpreters</p>
          </div>
          <Divider/>
          <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemText primary="Add Recipients" />
            </ListItem>
      <Divider />
            <ListItem>
            <ListItemText primary="Select All" />
            </ListItem>
          <List component="nav" aria-label="secondary mailbox folders">
            {['Bob Schmeckly', 'Bill Smith', 'Bo Schmo'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
              <ListItemIcon> <EditIcon/> </ListItemIcon>
              <ListItemIcon> <DeleteForeverIcon/> </ListItemIcon>            
          </ListItem>
            ))}
      </List>
      </List> 
          </div>
        </Fade>
      </Modal>
    </div>
  );
}