import axios from 'axios'
import { API_DIRECTORY } from '../constants'

export const fetchLanguageData = async () => {
	try {
		const getAllLanguages = await axios.get(
			`${API_DIRECTORY.URL}${API_DIRECTORY.LANGUAGES_TABLE_PATH}`
		)
		if (getAllLanguages.status === 200) {
			return getAllLanguages
		}
	} catch (error) {
		return error
	}
}

export const fetchCommMethodsData = async () => {
	try {
		const getAllCommsMethods = await axios.get(
			`${API_DIRECTORY.URL}${API_DIRECTORY.PROVIDER_CAPABILITIES_TABLE_PATH}`
		)
		if (getAllCommsMethods.status === 200) {
			return getAllCommsMethods.data
		}
	} catch (error) {
		return error
	}
}

export const editRecipient = async (recipientId, updatedRecipientObj) => {
	try {
		const editRecipientResponse = await axios.patch(
			`${API_DIRECTORY.URL}${API_DIRECTORY.EDIT_RECIPIENTS_BY_ID}/${recipientId}`,
			updatedRecipientObj
		)

		if (editRecipientResponse.status === 200) {
			editRecipientResponse.message = `Successfully edited recipient ${recipientId}`
			return editRecipientResponse
		}
	} catch (error) {
		return new Error({
			...error,
			message: `Cannot update recipient ${recipientId}, ${updatedRecipientObj.phone_number}`
		})
	}
}

export const deleteRecipient = async (recipientId) => {
	try {
		const deleteRecipient = await axios.delete(
			`${API_DIRECTORY.URL} ${API_DIRECTORY.DELETE_RECIPIENTS_BY_ID}/${recipientId}`
		)

		if (deleteRecipient.status === 200) {
			deleteRecipient.message = `Succesfully deleted ${recipientId}`
			return deleteRecipient
		}
	} catch (error) {
		return error
	}
}
