import React from 'react';
import { makeStyles, Container, CssBaseline, AppBar, Toolbar, Hidden, IconButton, Tabs, Tab } from '@material-ui/core';
import { TabPanel, controlTab } from './tabpanel';
import Search from '../search';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        width: '100%',
        minHeight: 64,
        position: 'sticky',
        top:0
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
    }
}))

const TabNavigation = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar} color="inherit">
            <Toolbar className={classes.toolbar}>
            </Toolbar>
            <Tabs value={value} onChange={handleChange} className={classes.tab} variant="scrollable" scrollButtons="auto">
                <Tab label="Search" {...controlTab(0)}/>
                <Tab label="Favorite" {...controlTab(1)}/>
            </Tabs>
                <TabPanel value={value} index={0}>
                    <Search />
                </TabPanel>
            <TabPanel value={value} index={1}></TabPanel>
        </AppBar>
    </div>
}

export default TabNavigation