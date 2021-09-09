/* eslint-disable camelcase */
import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { fetchLanguageData, fetchCommMethodsData } from '../../lib/interface.js'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexFlow: 'column nowrap'
	}
})

const EditRecipientModal = ({ editRecipientFormSubmit, editRecipientChangeHandler, recipient }) => {
	const classes = useStyles()
	const [languages, setLanguages] = useState([])
	const languageInputRef = useRef()
	const [commMethod, setCommMethod] = useState([])
	const commMethodRef = useRef()

	useEffect(() => {
		const helper = async () => {
			const data = await fetchLanguageData()

			if (data.data) {
				setLanguages(data.data)
			} else {
				console.log('language data not set', data)
			}
		}

		const commMethodHelper = async () => {
			const commData = await fetchCommMethodsData()
			if (commData.data) {
				setCommMethod(commData.data)
			} else {
				console.log('Comm Methods is not set')
			}
		}

		helper()
		commMethodHelper()
	}, [setLanguages, setCommMethod])

	const submitForm = (event) => {
		event.preventDefault()

		if (languageInputRef.current && commMethodRef.current) {
			editRecipientFormSubmit(
				event,
				recipient.recipient_id,
				languageInputRef.current.value,
				commMethodRef.current.value
			)
		}
	}

	return (
		<div className={classes.root}>
			<h2 id='transition-modal-title'>Edit Recipient </h2>
			<form onSubmit={submitForm}>
				<TextField
					name='first_name'
					onChange={editRecipientChangeHandler}
					placeholder={recipient.first_name}
				/>
				<TextField
					name='middle_name'
					onChange={editRecipientChangeHandler}
					placeholder={recipient.middle_name}
				/>
				<TextField
					name='last_name'
					onChange={editRecipientChangeHandler}
					placeholder={recipient.last_name}
				/>
				<TextField
					name='phone_number'
					onChange={editRecipientChangeHandler}
					placeholder={recipient.phone_number}
				/>
				{languages.length > 0 && (
					<label>
						Preferred language:
						<select ref={languageInputRef}>
							{languages.map(({ language_id, trigraph_code }) => {
								return (
									<option key={language_id} value={language_id}>
										{trigraph_code}
									</option>
								)
							})}
						</select>
					</label>
				)}
				{commMethod.length > 0 && (
					<label>
						Comm Method:
						<select ref={commMethodRef}>
							{commMethod.map(({ pc_id, name }) => {
								return (
									<option key={pc_id} value={pc_id}>
										{name}
									</option>
								)
							})}
						</select>
					</label>
				)}
				<Button
					type='submit'
					className={classes.ModalButton}
					variant='outlined'
					disabled={recipient.phone_number.length === 0}
				>
					Submit Changes
				</Button>
			</form>
		</div>
	)
}

export default EditRecipientModal
