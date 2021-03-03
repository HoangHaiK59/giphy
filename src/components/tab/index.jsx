import React from 'react';
import { makeStyles, CssBaseline, AppBar, Toolbar, Tabs, Tab, CircularProgress, Snackbar, Backdrop } from '@material-ui/core';
import { TabPanel, controlTab } from './tabpanel';
import Search from '../search';
import { GiphyConstant } from '../../store/constant';
import { connect } from 'react-redux';
import Favorites from '../favorites';
import { GitHub, Collections, Favorite } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    appBar: {
        width: '100%',
        minHeight: 64,
        zIndex: theme.zIndex.drawer + 999999999
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        background: 'rgba(36, 38, 36, .7)'
    },
    tab: {
        background: '#fff',
        color: '#000',
        boxShadow: '1px 1px rgb(190, 194, 190)',
        position: 'sticky',
        top: 64,
        zIndex: theme.zIndex.drawer + 999999999
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: 'rgba(46, 45, 44, .5)'
    },
    toast: {
        position: 'absolute',
        top: '10%',
        right: '5%'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 99999999999999,
        color: '#fff'
    },
    brand: {
        color: theme.palette.common.white,
        fontSize: 30
    },
    snackbar: {
        zIndex: theme.zIndex.drawer + 99999999999999999999
    }
}))

const TabNavigation = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [showToast, setShowToast] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const showLoading = loadingE => {
        setLoading(loadingE)
    }
    const handleShowToastAndMessage = (show, messageV = '') => {
        setShowToast(show)
        setMessage(messageV)
    }
    const handleCloseToast = () => {
        setShowToast(false)
    }
    const handleClose = () => {
        setLoading(false)
    }
    return <div className={classes.root}>
        <CssBaseline />
        <AppBar position="sticky" className={classes.appBar} color="inherit">
            <Toolbar className={classes.toolbar}>
                <Link to="https://github.com/HoangHaiK59/giphy">
                    <GitHub className={classes.brand} />
                </Link>
            </Toolbar>
        </AppBar>
        <main style={{position: 'relative'}}>
            {
                loading && <div className={classes.loading}>
                    <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
                        <CircularProgress color="primary" />
                    </Backdrop>
                </div>
            }
            {
                showToast && 
                    <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                     }}
                     className={classes.snackbar}
                    open={showToast}
                    autoHideDuration={2000}
                    message={message}
                    onClose={handleCloseToast}
                    />

            }
            <Tabs value={value} onChange={handleChange} className={classes.tab} variant="scrollable" scrollButtons="auto">
                <Tab label="Search" {...controlTab(0)} icon={<Collections />}/>
                <Tab label="Favorites" {...controlTab(1)} icon={<Favorite />} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Search {...props} showLoading={showLoading} handleShowToastAndMessage={handleShowToastAndMessage}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Favorites {...props} showLoading={showLoading} handleShowToastAndMessage={handleShowToastAndMessage} />
            </TabPanel>
        </main>
    </div>
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    add2Favorites: favorite => dispatch({type: GiphyConstant.ADD_2_FAVORITE, favorite}),
    delFromFavorites: id => dispatch({type: GiphyConstant.DEL_FROM_FAVORITE, id}),
    delAllFavorites: () => dispatch({type: GiphyConstant.DEL_ALL})
})

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigation)