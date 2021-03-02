import PropTypes from 'prop-types';
import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles= makeStyles(theme => ({
    tabContainer: {
        minHeight: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

export const TabPanel = props => {
    const classes = useStyles();
    const { children, value, index, ...other } = props;
    return <div role="tabpanel" className={classes.tabContainer}
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
    >
        {
            value === index && (
                <Box p={3} style={{height: '100%'}}>
                   {children}
                </Box>
            )
        }
    </div>
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

export const controlTab = (index) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
}
