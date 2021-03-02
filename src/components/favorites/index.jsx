import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Image from '../image';

const useStyles = makeStyles(theme => ({
    item: {
        position: 'relative',
        width: '100%',
        cursor: 'pointer'
    },
}))

const Favorites = props => {
    const classes = useStyles();
    console.log(props)
    return <Container maxWidth="lg">
    <Grid container spacing={2} justify="center" style={{marginTop: '2rem'}}>
        {
            props.favorites.length > 0 && props.favorites.map(d => 
                <Grid key={d.id} item xs={6} md={3}>
                    <div className={classes.item}>
                        <Image 
                        data={d} 
                        add2Favorites={props.add2Favorites}
                        delFromFavorites={props.delFromFavorites}
                        />
                    </div>
                </Grid>
            )
        }
    </Grid>
</Container>
}

Favorites.propTypes = {
    add2Favorites: PropTypes.func.isRequired,
    delFromFavorites: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    favorites: state.giphy.favorites
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)