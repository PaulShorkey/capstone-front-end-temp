import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

/// FILE IMPORTS ///
import AddGroupModal from './AddGroupModal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    maxWidth: 280,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function GroupSelector() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
      <ListItem>
          <ListItemText primary="Groups:" />
        </ListItem>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        {['Group 1', 'Group 2', 'Group 3'].map((text, index) => (
          <ListItem button key={text}>
              <ListItemText primary={text} />
            <ListItemIcon> <DeleteForeverIcon/> </ListItemIcon>            
          </ListItem>
        ))}
      </List>    
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
          <AddGroupModal/>
      </List>
    </div>
  );
}