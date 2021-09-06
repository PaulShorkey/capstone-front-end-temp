const API_DIRECTORY = {
    URL : "http://localhost:3030",
    LOGIN_PATH : `/login`,
    GROUPS_TABLE_PATH : '/groups',
    LANGUAGES_TABLE_PATH : '/languages',
    PROVIDER_CAPABILITIES_TABLE_PATH : '/provider-capabilities',
    RECIPIENTS_POST_PATH : '/recipients',
    RECIPIENTS_TO_GROUP_POST_PATH : '/recipients/withGroupID',
    RECIPIENTS_IN_GROUP_PATH : '/recipients/id'
};

const ERROR_MESSAGES = {
    ERROR_404 : "Error : 404",
    ERROR_400 : "Error : 400",
    ERROR_500 : "Error : 500",
    ERROR_UNKNOWN : "Error : Unknown Error"
}

const ERROR_TYPES = {
    FATAL : "fatal",
    NON_FATAL : "non_fata",
    WARNING : "warning",
    MESSAGE : "message"
}

export { API_DIRECTORY, ERROR_MESSAGES, ERROR_TYPES };