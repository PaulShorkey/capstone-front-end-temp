import axios from 'axios';
import {API_DIRECTORY, ERROR_MESSAGES, ERROR_TYPES } from '../../../../constants'


export const editRecipient = async (recipientId, updatedRecipientObj) => {

	try {
		const editRecipientResponse = await axios.patch(`${API_DIRECTORY.URL}${API_DIRECTORY.EDIT_RECIPIENTS_BY_ID}/${recipientId}`, updatedRecipientObj)

		if (editRecipientResponse.status === 200) {
			return `Successfully edited recipient ${recipientId}`
		}
	} catch (error) {
		error.message = `Cannot update recipient ${recipientId}, ${updatedRecipientObj.phone_number}`
		return error
	} 
}

export const deleteRecipient = async (recipientId) => {
    try {
        const deleteRecipient = await axios.delete(`${API_DIRECTORY.URL} ${API_DIRECTORY.DELETE_RECIPIENTS_BY_ID}/${recipientId}`)

        if (deleteRecipient.status === 200) {
            return `Succesfully deleted ${recipientId}`
        }
    } catch (error) {
        error.message = `Cannot delete recipient ${recipientId}`
        return error
    }

}
