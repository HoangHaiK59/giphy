export const loadState = () => {
    const serializedState = localStorage.getItem('giphyState');
    try {
        if(!serializedState) {
            return {}
        }
        return JSON.parse(serializedState)
    } catch(err) {
        console.log(err)
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('giphyState', serializedState)
    } catch(err) {
        console.log(err)
    }
}