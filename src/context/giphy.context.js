import React from 'react';

export const GiphyContext = React.createContext({
    favorites: [],
    add2Favorites: () => {},
    deleteFromFavories: () => {},
    deleteAllFavories: () => {}
});