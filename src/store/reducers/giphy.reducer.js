import { GiphyConstant } from "../constant"

const initState = {
    favorites: []
}

export const GiphyReducer = (state = initState, action) => {
    switch(action.type) {
        case GiphyConstant.ADD_2_FAVORITE: 
            return {...state, favorites: state.favorites.concat([action.favorite])}
        case GiphyConstant.DEL_FROM_FAVORITE: 
            return {...state, favorites: state.favorites.filter(f => f.id !== action.id)}
        case GiphyConstant.DEL_ALL: 
            return {...state, favorites: []}
        default: 
        return state;
    }
}