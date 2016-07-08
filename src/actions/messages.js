import {getMessages} from '../sources/gitter'

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES'
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'

export const LOAD_MORE = 'LOAD_MORE'

export const loadMore = (roomId) => (dispatch) => {
    // return {
    //     type: LOAD_MORE,
    //     roomId
    // }
    // dispatch(fetchMessagesIfNeeded(roomId))
}

export const requestMessages = (roomId) => {
    return {
        type: REQUEST_MESSAGES,
        roomId
    }
}

export const receiveMessages = (roomId, messages) => {
    return {
        type: RECEIVE_MESSAGES,
        roomId,
        messages
    }
}

const fetchMessages = (roomId, limit, beforeId) => dispatch => {
    dispatch(requestMessages(roomId))
    getMessages(roomId, limit, beforeId)
        .then(messages => dispatch(receiveMessages(roomId, messages)))
}

const shouldFetchMessages = (state, roomId) => {
    return !state.getIn(['messages', roomId])
}

export const fetchMessagesIfNeeded = (roomId) => (dispatch, getState) => {
    if (shouldFetchMessages(getState(), roomId)) {
        return dispatch(fetchMessages(roomId))
    }
}