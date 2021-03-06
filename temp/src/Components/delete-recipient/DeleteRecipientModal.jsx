import { Button } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
	button: {
		margin: '5%',
		height: '3em',
		width: 'auto'
	},
	modalContainer: {
		display: 'flex',
		flexFlow: 'row nowrap',
		border: '1px solid red',
		padding: '3%'
	}
})
const DeleteRecipientModal = ({ deleteRecipientHandler, recipientId, cancelHandler }) => {
	const styles = useStyles()

	return (
		<div className={styles.modalContainer}>
			<h3>Are you sure?</h3>
			<Button
				onClick={() => deleteRecipientHandler(recipientId)}
				className={styles.button}
				color='primary'
				variant='contained'
			>
				Confirm
			</Button>
			<Button
				className={styles.button}
				color='default'
				variant='outlined'
				onClick={cancelHandler}
			>
				Cancel
			</Button>
		</div>
	)
}

export default DeleteRecipientModal
