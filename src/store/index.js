import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers';
export default function configStore(preloadState) {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer];
    const composeEnhancers = compose(...enhancers);
    const store = createStore(rootReducer, preloadState, composeEnhancers)
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }
    return store;
}