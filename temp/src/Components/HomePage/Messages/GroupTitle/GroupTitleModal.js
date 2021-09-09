import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import RemoveIcon from '@material-ui/icons/Remove'
import { API_DIRECTORY, ERROR_MESSAGES, ERROR_TYPES } from '../../../../constants'
import { editRecipient, deleteRecipient } from '../../../../lib/interface'
import EditRecipientModal from '../../../edit-recipient/EditRecipientModal'
import { IconButton } from '@material-ui/core'
import DeleteRecipientModal from '../../../delete-recipient/DeleteRecipientModal'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	content: {
		padding: 12,
		overflow: 'scroll'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
			maxWidth: 280
			// backgroundColor: theme.palette.background.paper
		},
		submit: {
			margin: theme.spacing(3, 0, 2)
		}
	},
	p: {
		fontSize: 12
	},
	editButton: {
		margin: theme.spacing(1),
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'center'
	},
	deleteButton: {
		margin: theme.spacing(1),
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'center'
	}
}))

export default function GroupTitleModal(props) {
	const classes = useStyles()
	const [bannerMessage, setBannerMessage] = useState()
	const [open, setOpen] = React.useState(false)
	const [addingRecipient, setAddingRecipient] = useState(false)
	const [languageDataLoaded, setLanguageDataLoaded] = useState(false)
	const [languageData, setLanguageData] = useState([])
	const [commMethods, setCommMethods] = useState([])
	const [commMethodsLoaded, setCommMethodsLoaded] = useState(false)
	const [recipientsData, setRecipientsData] = useState([])
	const [recipientsDataLoaded, setRecipientsDataLoaded] = useState(false)
	const [numberOfRecipientsInGroup, setNumberOfRecipientsInGroup] = useState(0)
	const [showEditRecipient, setShowEditRecipient] = useState()
	const [deleteRecipientConfirmation, setDeleteRecipientConfirmation] = useState()
	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState({ status: false, type: 'message', message: 'No Error' })
	const [editRecipientFormData, setEditRecipientFormData] = useState({
		first_name: null,
		middle_name: null,
		last_name: null,
		phone_number: 0,
		preferred_language: 0,
		comm_method: 0
	})

	// *************************************************** FETCH FUNCTIONS **************************************************** //
	const fetchLanguageData = () => {
		if (languageData.length < 1) {
			const headers = { 'Content-Type': 'application/json' }

			fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.LANGUAGES_TABLE_PATH}`, {
				method: 'GET',
				mode: 'cors',
				headers
			}).then(
				(result) => {
					if (result.status === 200) {
						result = result.json().then((result) => {
							setLanguageData(result)
							setLanguageDataLoaded(true)
						})
					}
				}
				// (error) => {
				//   setError({
				//     status: true,
				//     type: ERROR_TYPES.FATAL,
				//     message: ERROR_MESSAGES.ERROR_UNKNOWN
				//   })
				// }
			)
		}
	}

	const fetchCommMethodsData = () => {
		if (commMethods.length < 1) {
			const headers = { 'Content-Type': 'application/json' }

			fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.PROVIDER_CAPABILITIES_TABLE_PATH}`, {
				method: 'GET',
				mode: 'cors',
				headers
			}).then(
				(result) => {
					if (result.status === 200) {
						result = result.json().then((result) => {
							setCommMethods(result.data)
							setCommMethodsLoaded(true)
						})
					} else if (result.status === 404) {
						setError({ status: true, message: ERROR_MESSAGES.ERROR_404 })
						setCommMethodsLoaded(true)
					} else {
						setError({ status: true, message: ERROR_MESSAGES.ERROR_UNKNOWN })
						setCommMethodsLoaded(true)
					}
				},
				// eslint-disable-next-line node/handle-callback-err
				(error) => {
					setError({ status: true, message: ERROR_MESSAGES.ERROR_UNKNOWN })
					setCommMethodsLoaded(true)
				}
			)
		}
	}

	const fetchRecipientsData = () => {
		const headers = { 'Content-Type': 'application/json' }

		fetch(
			`${API_DIRECTORY.URL}${API_DIRECTORY.RECIPIENTS_IN_GROUP_PATH}/${props.groupData.group_id}`,
			{ method: 'GET', mode: 'cors', headers }
		).then(
			(result) => {
				if (result.status === 200) {
					result = result.json().then((result) => {
						setRecipientsData(result)
						setRecipientsDataLoaded(true)
						setNumberOfRecipientsInGroup(result.length)
					})
				} else if (result.status === 404) {
					setError({
						status: true,
						message: `${ERROR_MESSAGES.ERROR_404} @ RecipientsData`
					})
					setRecipientsDataLoaded(true)
					setRecipientsData([])
				} else {
					setError({
						status: true,
						message: `${ERROR_MESSAGES.ERROR_UNKNOWN} @ Recipients Data`
					})
					setRecipientsDataLoaded(true)
				}
			},
			// eslint-disable-next-line node/handle-callback-err
			(error) => {
				setError({
					status: true,
					message: `${ERROR_MESSAGES.ERROR_UNKNOWN} @ Recipients Data`
				})
				setRecipientsDataLoaded(true)
			}
		)
	}
	// ************************************************* END FETCH FUNCTIONS ************************************************** //
	useEffect(() => {
		console.log('group title modal useeffect')
		fetchLanguageData()
		fetchCommMethodsData()
		fetchRecipientsData()
	}, [setBannerMessage])

	const handleOpen = () => {
		if (!isEmptyObject(props.groupData)) {
			setOpen(true)
			fetchRecipientsData()
		}
	}

	const handleClose = () => {
		setOpen(false)
		setAddingRecipient(false)
		setRecipientsData([])
	}

	function isEmptyObject(obj) {
		return JSON.stringify(obj) === '{}'
	}

	const editRecipientFormSubmit = async (event, recipientId, languageId, commMethodId) => {
		event.preventDefault()
		let shouldTrigger = false
		editRecipientFormData.preferred_language = languageId
		editRecipientFormData.comm_method = commMethodId
		console.log('language id is ', languageId)
		console.log('commMethod id is', commMethodId)

		for (const i of Object.values(editRecipientFormData)) {
			if (i !== '') {
				console.log('you made it', editRecipientFormData)
				shouldTrigger = true
				break
			}
		}

		if (shouldTrigger) {
			try {
				const editRecipientResponse = await editRecipient(
					recipientId,
					editRecipientFormData
				)
				console.log('edit res', editRecipientResponse)
				if (editRecipientResponse.ok) {
					setBannerMessage(editRecipientResponse.message)
					setTimeout(() => {
						setBannerMessage()
					}, 1200)
				}
			} catch (error) {
				console.error(error)
				setBannerMessage(error.message)
				setTimeout(() => {
					setBannerMessage('')
				}, 1200)
			}
			setTimeout(() => {
				setShowEditRecipient()
			}, 1200)
		}
	}

	const editRecipientChangeHandler = (event) => {
		event.preventDefault()
		setEditRecipientFormData({
			...editRecipientFormData,
			[event.target.name]: event.target.value
		})
	}

	const deleteRecipientHandler = async (recipientId) => {
		try {
			const deleteResponse = await deleteRecipient(recipientId)
			console.log('del res', deleteResponse)

			setDeleteRecipientConfirmation(false)
			setBannerMessage(deleteResponse.message)
			if (deleteResponse.ok) {
				setTimeout(() => {
					setBannerMessage('')
				}, 1200)
			}
		} catch (error) {
			setBannerMessage(error.message)
		}
	}

	// ************************************************** RENDER FUNCTIONS *************************************************** //
	const renderTopDropDown = () => {
		if (isEmptyObject(props.groupData)) {
			return (
				<Grid item xs={3} button onClick={handleOpen}>
					<ListItem alignItems='flex-start'>
						<ListItemText>No Group Selected</ListItemText>
						<ListItemIcon>
							<KeyboardArrowDownIcon />
						</ListItemIcon>
					</ListItem>
				</Grid>
			)
		} else {
			return (
				<Grid item xs={3} button onClick={handleOpen}>
					<ListItem alignItems='flex-start'>
						<ListItemText>{props.groupData.name}</ListItemText>
						<ListItemIcon>
							<KeyboardArrowDownIcon />
						</ListItemIcon>
					</ListItem>
				</Grid>
			)
		}
	}

	const renderLanguagesDropDownMenu = () => {
		if (languageDataLoaded) {
			if (!Array.isArray(languageData)) {
				setLanguageData([])
			}

			return (
				<form>
					<label htmlFor='language'>Language:</label>
					<select name='language' id='language-drop-down'>
						{languageData.map((item) => (
							<option key={item.language_id} value={`${item.language_id}`}>
								{`${item.name}`}
							</option>
						))}
					</select>
				</form>
			)
		} else {
			return (
				<form>
					<label htmlFor='language'>Language:</label>
					<select name='language' id='language-drop-down'>
						<option value='english'>English</option>
						<option value='french'>French</option>
						<option value='desert-speak'>Desert-Speak</option>
					</select>
				</form>
			)
		}
	}

	const renderCommMethodsDropdown = () => {
		if (commMethodsLoaded) {
			if (!Array.isArray(commMethods)) {
				setCommMethods([])
			}

			return (
				<form>
					<label htmlFor='comm-methods'>Comm Method:</label>
					<select name='comm-methods' id='comm-methods-drop-down'>
						{commMethods.map((item) => (
							<option
								key={item.pc_id}
								value={`${item.pc_id}`}
							>{`${item.name}`}</option>
						))}
					</select>
				</form>
			)
		} else {
			return (
				<form>
					<label htmlFor='comm-methods'>Language:</label>
					<select name='comm-methods' id='comm-methods-drop-down'></select>
				</form>
			)
		}
	}

	const handleAddRecipient = (event) => {
		event.preventDefault()

		const firstName = document.getElementById('first-name-input').value
		const lastName = document.getElementById('last-name-input').value
		const phoneNumber = document.getElementById('phone-number-input').value
		const language = document.getElementById('language-drop-down').value
		const commMethod = document.getElementById('comm-methods-drop-down').value

		let errorMessage = ''

		if (firstName === undefined || typeof firstName !== 'string' || firstName === '') {
			errorMessage += 'Please Provide a Value for First Name\n'
		}
		if (lastName === undefined || typeof lastName !== 'string' || lastName === '') {
			errorMessage += 'Please Provide a Value for Last Name\n'
		}
		if (phoneNumber === undefined || typeof phoneNumber !== 'string' || phoneNumber === '') {
			errorMessage += 'Please Provide a Value for Phone Number\n'
		}
		if (language === undefined || typeof language !== 'string' || language === '') {
			errorMessage += 'Please Select a Language\n'
		}
		if (commMethod === undefined || typeof commMethod !== 'string' || commMethod === '') {
			errorMessage += 'Please Select a Communication Method'
		}

		if (errorMessage.length > 0) {
			alert(errorMessage)
		} else {
			const headers = { 'Content-Type': 'application/json' }

			fetch(
				`${API_DIRECTORY.URL}${API_DIRECTORY.RECIPIENTS_TO_GROUP_POST_PATH}/${props.groupData.group_id}`,
				{
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
				}
			).then((result) => {
				if (result.status === 200) {
					result = result.json().then((result) => {
						const data = recipientsData
						data.push(result[0])
						setRecipientsData(data)
						setAddingRecipient(!addingRecipient)
						setNumberOfRecipientsInGroup(data.length)
					})
				} else {
					setError({
						status: true,
						type: ERROR_TYPES.NON_FATAL,
						message: ERROR_MESSAGES.ERROR_500
					})
				}
			})
		}
	}

	const renderAddRecipientFields = () => {
		return (
			<form className={classes.form} noValidate>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='first-name-input'
					label='First Name'
					name='first-name'
					autoComplete='first name'
					autoFocus
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='last-name-input'
					label='Last Name'
					name='last-name'
					autoComplete='last name'
					autoFocus
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='phone-number-input'
					label='Phone Number'
					name='phone-number'
					autoComplete='phone number'
					autoFocus
				/>
				{renderLanguagesDropDownMenu()}
				{renderCommMethodsDropdown()}
				<br />
				<Button className={classes.submit} onClick={handleAddRecipient}>
					SUBMIT
				</Button>
			</form>
		)
	}

	const renderRecipients = () => {
		if (recipientsDataLoaded) {
			return (
				<>
					<List
						className={classes.content}
						component='nav'
						aria-label='secondary mailbox folders'
					>
						{recipientsData.map((element, index) => (
							<>
								<ListItem key={element.recipient_id}>
									<ListItemText
										primary={`${element.first_name} ${element.last_name}`}
									/>
									<IconButton
										variant='contained'
										color='primary'
										className={classes.editButton}
										onClick={() => {
											showEditRecipient === element.recipient_id
												? setShowEditRecipient(-1)
												: setShowEditRecipient(element.recipient_id)
										}}
									>
										<EditIcon variant='default' color='default' />
									</IconButton>
									<IconButton
										variant='outlined'
										color='secondary'
										className={classes.deleteButton}
										onClick={() => {
											deleteRecipientConfirmation === element.recipient_id
												? setDeleteRecipientConfirmation(-1)
												: setDeleteRecipientConfirmation(
													element.recipient_id
												  )
										}}
									>
										<DeleteForeverOutlinedIcon variant='outlined' />
									</IconButton>
								</ListItem>
								<ListItem>
									{showEditRecipient === element.recipient_id && (
										<EditRecipientModal
											editRecipientFormSubmit={editRecipientFormSubmit}
											editRecipientChangeHandler={editRecipientChangeHandler}
											recipient={element}
											bannerMessage={bannerMessage}
										/>
									)}
								</ListItem>
								{deleteRecipientConfirmation === element.recipient_id && (
									<ListItem>
										<DeleteRecipientModal
											deleteRecipientHandler={deleteRecipientHandler}
											recipientId={element.recipient_id}
											cancelHandler={() => {
												setDeleteRecipientConfirmation(false)
											}}
										/>
									</ListItem>
								)}
							</>
						))}
					</List>
				</>
			)
		} else {
			return (
				<List component='nav' aria-label='secondary mailbox folders'>
					{['Bob Schmeckly', 'Bill Smith', 'Bo Schmo'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemText primary={text} />
							<ListItemIcon>
								{' '}
								<EditIcon />{' '}
							</ListItemIcon>
							<ListItemIcon>
								{' '}
								<DeleteForeverOutlinedIcon />{' '}
							</ListItemIcon>
						</ListItem>
					))}
				</List>
			)
		}
	}

	const renderGroupData = () => {
		return (
			<Fade in={open}>
				<div className={classes.paper}>
					<h3>{bannerMessage}</h3>
					<h2 id='transition-modal-title'>{`${props.groupData.name}`}</h2>
					<div className={classes.p}>
						<p>{`Number of Users: ${numberOfRecipientsInGroup}`}</p>
						<p>{`Created: ${props.groupData.time_made}`}</p>
						<p>{`Description: ${props.groupData.description}`}</p>
					</div>
					<Divider />
					<List component='nav' aria-label='main mailbox folders'>
						<ListItem
							button
							key='Add Recipient'
							onClick={() => {
								setAddingRecipient(!addingRecipient)
							}}
						>
							<ListItemText primary='Add Recipient' />
							<ListItemIcon>
								{addingRecipient ? <RemoveIcon /> : <AddIcon />}
							</ListItemIcon>
						</ListItem>
						{addingRecipient ? renderAddRecipientFields() : null}
						<Divider />
						<ListItem>
							<ListItemText primary='Select All' />
						</ListItem>
						{renderRecipients()}
					</List>
				</div>
			</Fade>
		)
	}
	// ************************************************ END RENDER FUNCTIONS ************************************************* //
	return (
		<div>
			{renderTopDropDown()}
			<Modal
				overflow='scroll'
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				{renderGroupData()}
			</Modal>
		</div>
	)
}
