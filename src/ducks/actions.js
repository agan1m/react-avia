import { DATA_REQUEST, DATA_SUCCESS, DATA_FAILER, FILTER_STOPS} from './constants'

export const dataRequest = (payload) => ({
    type: DATA_REQUEST,
    payload: payload
});

export const dataSuccess = (payload) => ({
    type: DATA_SUCCESS,
    payload: payload
})

export const dataFailer = (payload) => ({
    type: DATA_FAILER,
    error: payload
})

export const dataFilter = (payload, options) => ({
    type: FILTER_STOPS,
    payload: payload,
    options: options
})
