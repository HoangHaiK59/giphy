import { GiphyReducer } from './giphy.reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    giphy: GiphyReducer
})