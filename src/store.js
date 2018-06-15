import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks'
import rootSaga from "./sagas";


const sagaMiddleware = createSagaMiddleware();

export default initState => {
    const store = createStore(
        rootReducer,
        initState,
        compose(
            applyMiddleware(sagaMiddleware),
            window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
        ),
    );
    sagaMiddleware.run(rootSaga);

    return store;

}