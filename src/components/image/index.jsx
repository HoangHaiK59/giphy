import React from 'react';
import { makeStyles, Button, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Favorite } from '@material-ui/icons'
import { connect } from 'react-redux';

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
        },
        position: 'relative'
    },
    hoverItem: {
        position: 'absolute',
        background: 'rgba(48, 47, 47, .5)',
        top:0,
        left:0,
        width: '100%',
        height: '100%'
    },
    action: {
        position: 'absolute',
        bottom: 10,
        right: 5,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    btn: {
        fontSize: 30
    }
}))

const Image = ({ data, add2Favorites, delFromFavorites , showToastAndMessage, ...props}) => {
    const classes = useStyles();
    const [dataValue, setDataValue]= React.useState(initDataState(data))
    function initDataState(data){
        if (data.hasOwnProperty('favorite')) {
            return {...data}
        } else {
            return {...data, hover: false, favorite: false}
        }
    }
    const onMouseMove = () => {
        setDataValue({...dataValue,hover: true })
    }
    const onMouseLeave = () => {
        setDataValue({...dataValue, hover: false })
    }
    const onAdd2Favorite = () => {
        if (dataValue.favorite) {
            setDataValue({...dataValue, favorite: false })
            delFromFavorites(dataValue.id)
            showToastAndMessage(true, 'Deleted from favorites')
        } else {
            setDataValue({...dataValue, favorite: true, hover: false })
            if (props.favorites.find(f => f.id === dataValue.id)) {
                showToastAndMessage(true, 'Already exist')
            } else {
                add2Favorites({...dataValue, favorite: true, hover: false })
                showToastAndMessage(true, 'Added to favorites')
            }
        }

    }
    return <div className={classes.cardContainer} onMouseMove={() => onMouseMove()} onMouseLeave={() => onMouseLeave()}>
        {
            dataValue.hover && <div className={classes.hoverItem}>
                <div className={classes.action}>
                    <Tooltip title={dataValue.favorite ? 'Unlike': 'Like'}>
                        <Button className={classes.btn}
                        onClick={onAdd2Favorite}
                        startIcon={<Favorite fontSize="large" 
                        style={dataValue.favorite ? {fontSize: 30, color: 'red'}: {fontSize: 30, color: 'rgb(245, 130, 130)'}} />}
                        >
                        </Button>
                    </Tooltip>
                </div>
            </div>
        }
        {
            data && <img src={data.images.original.url} alt=""/>
        }
    </div>
}

Image.propTypes = {
    data: PropTypes.any.isRequired,
    add2Favorites: PropTypes.func.isRequired, 
    delFromFavorites: PropTypes.func.isRequired,
    showToastAndMessage: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        favorites: state.giphy.favorites
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image);