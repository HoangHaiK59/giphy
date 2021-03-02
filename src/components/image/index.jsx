import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    cardContainer: {
        width: 300,
        height: 300,
        [theme.breakpoints.down('sm')]: {
            width: 150,
            height: 150,
        },
        '& > img': {
            width: 300,
            height: 300,
            [theme.breakpoints.down('sm')]: {
                width: 150,
                height: 150,
            }
        }
    }
}))

const Image = ({ data }) => {
    const classes = useStyles();
    return <div className={classes.cardContainer}>
        {
            data && <img src={data.images.original.url} alt=""/>
        }
    </div>
}

export default Image;