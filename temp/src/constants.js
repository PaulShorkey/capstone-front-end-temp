const API_DIRECTORY = {
	URL: 'http://localhost:8080',
	LOGIN_PATH: '/login',
	GROUPS_TABLE_PATH: '/groups',
	LANGUAGES_TABLE_PATH: '/languages',
	PROVIDER_CAPABILITIES_TABLE_PATH: '/provider-capabilities',
	RECIPIENTS_POST_PATH: '/recipients',
	RECIPIENTS_TO_GROUP_POST_PATH: '/recipients/withGroupID',
	RECIPIENTS_IN_GROUP_PATH: '/recipients/withGroupID',
	SEND_MESSAGES_MANY_PATH: '/send-messages/many',
	GET_MESSAGES_BY_GROUP_PATH: '/sent-messages/withGroupID',
	GET_MERCURY_USER_BY_ID: '/mercury-users/withID',
	EDIT_RECIPIENTS_BY_ID: '/recipients',
	DELETE_RECIPIENTS_BY_ID: '/recipients'
}

const SIGNAL_API = {
	SEND_ONE_URL: 'https://ec2-54-177-132-229.us-west-1.compute.amazonaws.com/api',
	SEND_MANY_URL: 'https://ec2-54-177-132-229.us-west-1.compute.amazonaws.com/api/batch/'
}

const ERROR_MESSAGES = {
	ERROR_404: 'Error : 404',
	ERROR_400: 'Error : 400',
	ERROR_500: 'Error : 500',
	ERROR_UNKNOWN: 'Error : Unknown Error'
}

const ERROR_TYPES = {
	FATAL: 'fatal',
	NON_FATAL: 'non_fata',
	WARNING: 'warning',
	MESSAGE: 'message'
}

export { API_DIRECTORY, ERROR_MESSAGES, ERROR_TYPES, SIGNAL_API }
