import {takeEvery, put, call} from 'redux-saga/effects'

import { DATA_REQUEST } from '../ducks/constants'
import { getData } from '../api'
import { dataSuccess, dataFailer } from '../ducks/actions';

export default function* (action) {
    yield takeEvery(DATA_REQUEST, sagaFlow)
}

function* sagaFlow(action) {
    try {
        let response = yield call(getData)
        yield put(dataSuccess(response))
    } catch (error) {
        yield put(dataFailer(error))
    }
    
}