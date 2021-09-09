/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { API_DIRECTORY } from '../../../constants'
/// FILE IMPORTS ///
import AddGroupModal from './AddGroupModal'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '60%',
		maxWidth: 280,
		backgroundColor: theme.palette.background.paper
	},
	menuButton: {
		marginRight: theme.spacing(2)
	}
}))

function ListItemLink(props) {
	return <ListItem button component='a' {...props} />
}

export default function GroupSelector(props) {
	const classes = useStyles()

	const [dataLoaded, setDataLoaded] = useState(false)
	const [groupData, setGroupData] = useState(null)
	const [error, setError] = useState({ status: false, message: 'No Error' })
	const [groups, setGroups] = React.useState([])

	const fetchGroupData = () => {
		console.log('fetching group data')
		const headers = { 'Content-Type': 'application/json' }

		fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.GROUPS_TABLE_PATH}`, {
			method: 'GET',
			mode: 'cors',
			headers
		}).then(
			(result) => {
				console.log('RESULT', result)
				if (result.status === 200) {
					result = result.json().then((result) => {
						console.log('JSONd RESULT ', result)
						setGroupData(result.data)
						setDataLoaded(true)
					})
				} else {
					setGroupData([])
					setDataLoaded(true)
				}
			},
			// eslint-disable-next-line node/handle-callback-err
			(error) => {
				setDataLoaded(true)
				setError({ status: true, message: 'Error Loading Groups Data' })
			}
		)
	}

	useEffect(() => {
		fetchGroupData()
	}, [])

	const handleGroupAdded = () => {
		fetchGroupData()
	}
	// //State for loggedIn user
	// const [activeUser, setActiveUser]= useState('');

	// //State for messages list in view
	// const [messages, setMessages] = useState([]);
	// const [activeGroup, setActiveGroup]= useState('');

	const handleDeleteGroup = (groupID) => {
		console.log('deleting : ', groupID)

		const headers = { 'Content-Type': 'application/json' }

		fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.GROUPS_TABLE_PATH}/${groupID}`, {
			method: 'DELETE',
			mode: 'cors',
			headers
		}).then((result) => {
			console.log(result)
			fetchGroupData()
		})
	}
	// ********************************************** RENDER FUNCTIONS ************************************************* //
	const renderGroupsSideBar = () => {
		if (dataLoaded) {
			return (
				<List component='nav' aria-label='secondary mailbox folders'>
					{groupData.map((element, index) => (
						<ListItem button key={index}>
							<ListItemText
								primary={element.group_name}
								onClick={() => {
									props.updateGroupTitleModal(element)
								}}
							/>
							<ListItemIcon>
								<IconButton
									edge='start'
									className={classes.menuButton}
									color='inherit'
									aria-label='open drawer'
									onClick={() => {
										handleDeleteGroup(element.group_id)
									}}
								>
									{' '}
									<DeleteForeverIcon />
								</IconButton>
							</ListItemIcon>
						</ListItem>
					))}
				</List>
			)
		} else {
			return (
				<List component='nav' aria-label='secondary mailbox folders'>
					{['Group 1', 'Group 2', 'Group 3'].map((text, index) => (
						<ListItem button key={index}>
							<ListItemText primary={text} />
							<ListItemIcon>
								<IconButton
									edge='start'
									className={classes.menuButton}
									color='inherit'
									aria-label='open drawer'
									onClick={handleDeleteGroup}
								>
									{' '}
									<DeleteForeverIcon />
								</IconButton>
							</ListItemIcon>
						</ListItem>
					))}
				</List>
			)
		}
	}
	// ******************************************* END RENDER FUNCTIONS ************************************************ //

	if (!error.status) {
		return (
			<div className={classes.root}>
				<List component='nav' aria-label='main mailbox folders'>
					<ListItem>
						<ListItemText primary='Groups:' />
					</ListItem>
					<Divider />
					{renderGroupsSideBar()}
				</List>
				<Divider />
				<List component='nav' aria-label='secondary mailbox folders'>
					<AddGroupModal handleGroupAdded={handleGroupAdded} />
				</List>
			</div>
		)
	} else {
		;<div>{`There was an Error : ${error.message}`}</div>
	}
}
