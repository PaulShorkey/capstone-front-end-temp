import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


function RecipientsButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/Recipients");
  }

  return (
    <ListItem button onClick={handleClick} key={'Manage Recipients'}>
      <ListItemIcon>{<EditIcon />}</ListItemIcon>
      <ListItemText primary={'Manage Recipients'} />
    </ListItem>
  )

}

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem key='Mercury'>
            <ListItemIcon>{/*app icon*/}</ListItemIcon>
            <ListItemText primary='Mercury'/>
      </ListItem>
      <ListItem key='Number of Groups'>
          <ListItemText primary='Number of Groups' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'Add New Group'}>
          <ListItemIcon>{<AddIcon />}</ListItemIcon>
          <ListItemText primary={'Add New Group'} />
        </ListItem>
        <ListItem button key={'Manage Admins'}>
          <ListItemIcon>{<EditIcon />}</ListItemIcon>
          <ListItemText primary={'Manage Admins'} />
        </ListItem>
      
        <RecipientsButton />
       
        {/* {['Add New Group', 'Manage Admins', 'Manage Recipients'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index === 0 ? <AddIcon/> : <EditIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}