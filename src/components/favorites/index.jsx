import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Grid, makeStyles } from '@material-ui/core';
import Image from '../image';
import Empty from '../empty';

const useStyles = makeStyles(theme => ({
    container: {
        minHeight: '70vh',
        position: 'relative'
    },
    item: {
        position: 'relative',
        width: '100%',
        cursor: 'pointer'
    },
    count: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    spacing: {
        marginLeft: theme.spacing(2)
    }
}))

const Favorites = props => {
    const classes = useStyles();
    React.useEffect(() => {
        document.title = 'Favorites'
    })
    console.log(props)
    return <Container maxWidth="lg" className={classes.container}>
    {
            props.favorites.length === 0 && <Empty textContent="You don't have any favorite pictures" variant="h5" />
    }
    <Grid container spacing={2} justify="center" style={{marginTop: '2rem'}}>
        <Grid item xs={12} md={12} className={classes.count}>
            <Button variant="contained" color="secondary" onClick={props.deleteAllFavorites}>Unlike all</Button>
        </Grid>
        {
            props.favorites.length > 0 && props.favorites.map(d => 
                <Grid key={d.id} item xs={6} md={3}>
                    <div className={classes.item}>
                        <Image 
                        favorites={props.favorites}
                        data={d} 
                        add2Favorites={props.add2Favorites}
                        delFromFavorites={props.deleteFromFavorites}
                        showToastAndMessage={props.handleShowToastAndMessage}
                        />
                    </div>
                </Grid>
            )
        }
    </Grid>
</Container>
}

// Favorites.propTypes = {
//     add2Favorites: PropTypes.func.isRequired,
//     delFromFavorites: PropTypes.func.isRequired,
//     handleShowToastAndMessage: PropTypes.func.isRequired,
//     delAllFavorites: PropTypes.func.isRequired
// }

// const mapStateToProps = state => ({
//     favorites: state.giphy.favorites
// })

// const mapDispatchToProps = dispatch => ({

// })

// export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
Favorites.propTypes = {
    add2Favorites: PropTypes.func.isRequired,
    deleteFromFavorites: PropTypes.func.isRequired,
    handleShowToastAndMessage: PropTypes.func.isRequired,
    deleteAllFavorites: PropTypes.func.isRequired
}
export default Favorites;