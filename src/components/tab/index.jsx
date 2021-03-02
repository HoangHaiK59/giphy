import React from 'react';
import { makeStyles, CssBaseline, AppBar, Toolbar, Tabs, Tab, CircularProgress } from '@material-ui/core';
import { TabPanel, controlTab } from './tabpanel';
import Search from '../search';
import { GiphyConstant } from '../../store/constant';
import { connect } from 'react-redux';
import Favorites from '../favorites';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    appBar: {
        width: '100%',
        minHeight: 64,
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
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
}))

const TabNavigation = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const showLoading = loadingE => {
        setLoading(loadingE)
    }
    return <div className={classes.root}>
        <CssBaseline />
        <AppBar position="sticky" className={classes.appBar} color="inherit">
            <Toolbar className={classes.toolbar}>
            </Toolbar>
        </AppBar>
        <main style={{position: 'relative'}}>
            {
                loading && <div className={classes.loading}>
                    <CircularProgress color="primary" />
                </div>
            }
            <Tabs value={value} onChange={handleChange} className={classes.tab} variant="scrollable" scrollButtons="auto">
                <Tab label="Search" {...controlTab(0)}/>
                <Tab label="Favorite" {...controlTab(1)}/>
            </Tabs>
            <TabPanel value={value} index={0}>
                <Search {...props} showLoading={showLoading}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Favorites {...props} showLoading={showLoading} />
            </TabPanel>
        </main>
    </div>
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    add2Favorites: favorite => dispatch({type: GiphyConstant.ADD_2_FAVORITE, favorite}),
    delFromFavorites: id => dispatch({type: GiphyConstant.DEL_FROM_FAVORITE, id})
})

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigation)