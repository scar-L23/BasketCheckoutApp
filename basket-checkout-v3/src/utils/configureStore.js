import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

const configureStore = (initialState) => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    return store;
}

export default configureStore;