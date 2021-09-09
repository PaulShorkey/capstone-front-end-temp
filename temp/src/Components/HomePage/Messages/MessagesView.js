/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send'
import { API_DIRECTORY, SIGNAL_API } from '../../../constants.js'
import https from 'https'
import GroupTitleModal from './GroupTitle/GroupTitleModal.js'
/// FILE IMPORTS ///

const agent = new https.Agent({
	rejectUnauthorized: false
})

function isEmptyObject(obj) {
	return JSON.stringify(obj) === '{}'
}

const useStyles = makeStyles({
	table: {
		minWidth: 650
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
})

export default function GroupTitle(props) {
	const classes = useStyles()
	// State for loggedIn user

	// State for messages list in view
	const [messages, setMessages] = useState([])
	const [messageValue, setMessageValue] = useState('')
	const [recipientData, setRecipientData] = useState([])
	const [messageDataLoaded, setMessageDataLoaded] = useState(false)
	const [, updateState] = useState()
	const forcedUpdate = useCallback(() => updateState({}), [])

	let recipients = []
	let messageArray = []

	// polling for latest messages
	useEffect(() => {}, [messages])

	// ************************************************************** FETCH FUNCTIONS ******************************************************* //
	const fetchRecipientData = () => {}

	const fetchGroupMessageData = () => {
		const headers = { 'Content-Type': 'application/json' }

		if (props.groupData !== undefined) {
			fetch(
				`${API_DIRECTORY.URL}${API_DIRECTORY.GET_MESSAGES_BY_GROUP_PATH}/${props.groupData.group_id}`,
				{
					method: 'GET',
					mode: 'cors',
					headers
				}
			).then((result) => {
				if (result.status === 200) {
					result = result.json().then((result) => {
						messageArray = []
						for (let i = 0; i < result.length; i++) {
							messageArray.push({
								content: result[i].content,
								time: result[i].time_made,
								sender: result[i].sender_id
							})
						}

						const promises = messageArray.map((item) => {
							return fetch(
								`${API_DIRECTORY.URL}${API_DIRECTORY.GET_MERCURY_USER_BY_ID}/${item.sender}`,
								{
									method: 'GET',
									mode: 'cors',
									headers
								}
							)
								.then((res) => res.json())
								.then((result) => {
									item.sender = result[0].username
								})
						})

						Promise.all(promises).then(() => {
							setMessages(messageArray)
							setMessageDataLoaded(true)
							props.updateMessageViewComponent(false)
							forcedUpdate()
						})
					})
				}
			})
		} else {
			setMessages([])
		}
	}
	// ************************************************************ END FETCH FUNCTIONS ***************************************************** //
	// ************************************************************** RENDER FUNCTIONS ******************************************************* //
	const renderMessageData = () => {
		// conditions should be met for this when clicking a new group or adding a message to the current one
		if (props.messagesNeedUpdating && !isEmptyObject(props.groupData)) {
			fetchGroupMessageData()
		}

		if (messageDataLoaded) {
			return (
				<List className={classes.messageArea}>
					{messages.map((message, index) => (
						<ListItem key={index}>
							<Grid container>
								<Grid item xs={12}>
									<ListItemText
										align='right'
										primary={`${message.content}`}
									></ListItemText>
								</Grid>
								<Grid item xs={12}>
									<ListItemText
										align='right'
										secondary={`${message.sender} - ${message.time}`}
									></ListItemText>
								</Grid>
							</Grid>
						</ListItem>
					))}
				</List>
			)
		} else {
			return (
				<List className={classes.messageArea}>
					{messages.map((message, index) => (
						<ListItem key={index}>
							<Grid container>
								<Grid item xs={12}>
									<ListItemText
										align='right'
										primary={`${message.content}`}
									></ListItemText>
								</Grid>
								<Grid item xs={12}>
									<ListItemText
										align='right'
										secondary={`${message.sender} - ${message.time}`}
									></ListItemText>
								</Grid>
							</Grid>
						</ListItem>
					))}
				</List>
			)
		}
	}
	// ************************************************************END RENDER FUNCTIONS ****************************************************** //
	// Stores changes iin text field as things are typed
	const handleTyping = (event) => {
		setMessageValue(event.target.value)
	}

	// when send button is clicked, adds item to messages
	const handleSend = () => {
		const message = document.getElementById('message-input').value

		let errorMessage = ''

		if (message === undefined || typeof message !== 'string' || message === '') {
			errorMessage += 'Please Provide a Value for Message'
		}

		if (errorMessage.length > 0) {
			alert(errorMessage)
		} else {
			if (props.groupData.group_id === undefined) {
				errorMessage += 'You Must Select a Group to Send a Message to'
				alert(errorMessage)
			} else {
				const headers = { 'Content-Type': 'application/json' }

				fetch(
					`${API_DIRECTORY.URL}${API_DIRECTORY.RECIPIENTS_TO_GROUP_POST_PATH}/${props.groupData.group_id}`,
					{
						method: 'GET',
						mode: 'cors',
						headers
					}
				).then((result) => {
					if (result.status !== 200) {
						console.log('FAILED')
					} else {
						result = result
							.json()
							.then((result) => {
								setRecipientData(result)
								recipients = result
							})
							.then(() => {
								const packet = []

								for (let i = 0; i < recipients.length; i++) {
									packet.push({
										recipient: `${recipients[i].phone_number}`,
										message: message
									})
								}
								const bodyData = JSON.stringify({
									recipients: packet
								})

								// THIS IS COMMENTED OUT FOR OFFLINE TESTING, UNCOMMENT IF THIS WASN'T CHANGED
								fetch(SIGNAL_API.SEND_MANY_URL, {
									agent,
									method: 'POST',
									mode: 'cors',
									headers,
									body: bodyData
								}).then((result) => {
									if (result.status === 200) {
										const recipientIDs = []
										for (let i = 0; i < recipients.length; i++) {
											recipientIDs.push(recipients[i].recipient_id)
										}
										const bodyData = JSON.stringify({
											sender_id: props.appData.userData.user_id,
											recipient_ids: recipientIDs,
											recipient_group_id: props.groupData.group_id,
											message: message
										})

										fetch(
											`${API_DIRECTORY.URL}${API_DIRECTORY.SEND_MESSAGES_MANY_PATH}`,
											{
												method: 'POST',
												mode: 'cors',
												headers,
												body: bodyData
											}
										).then((result) => {
											if (result.status === 200) {
												// forcers the component to fully reload messages relevant to the current group id
												props.updateMessageViewComponent(true)
												setMessageDataLoaded(false)
												forcedUpdate()
											} else {
												// error handling to be implemented
												console.log('Something bad happened')
											}
										})
									}
								})
							})
					}
				})
			}
		}
	}

	return (
		<div>
			<Grid container direction='column'>
				<GroupTitleModal groupData={props.groupData} />
			</Grid>
			<Grid item xs={9}>
				{renderMessageData()}
				<Divider />
				<Grid container style={{ padding: '20px' }} align='right'>
					<Grid item xs={11} align='right'>
						<TextField
							onChange={handleTyping}
							value={messageValue}
							id='message-input'
							label='Type Something'
							fullWidth
						/>
					</Grid>
					<Grid xs={1} align='right'>
						<Fab color='primary' aria-label='add' onClick={handleSend}>
							<SendIcon />
						</Fab>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}
