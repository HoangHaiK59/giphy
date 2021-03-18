import React from 'react';
import TabNavigation from './tab';
import { GiphyContext } from '../context/giphy.context';

const Container = props => {
    const [favorites, setFavorites] = React.useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')): [])
    const add2Favorites = (item) => {
        setFavorites(favorites.concat([item]));
        localStorage.setItem('favorites', JSON.stringify(favorites.concat([item])))
    }
    const deleteFromFavorites = (id) => {
        setFavorites(favorites.filter(f => f.id !== id));
        localStorage.setItem('favorites', JSON.stringify(favorites.filter(f => f.id !== id)))
    }
    const deleteAllFavorites = () => {
        setFavorites([]);
        localStorage.setItem('favorites', JSON.stringify([]))
    }
    return <GiphyContext.Provider value={{favorites, add2Favorites, deleteFromFavorites , deleteAllFavorites}}>
        <TabNavigation {...props}/>
    </GiphyContext.Provider>
}

export default Container