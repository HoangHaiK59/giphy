import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'absolute',
        top: '50%',
        left: '35%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const Empty = ({ textContent, variant }) => {
    const classes = useStyles();
    return <div className={classes.container}>
        <Typography variant={variant}>{textContent}</Typography>
    </div>
}

Empty.propTypes = {
    textContent: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['h1','h2','h3','h4','h5','h6']).isRequired
}

export default Empty