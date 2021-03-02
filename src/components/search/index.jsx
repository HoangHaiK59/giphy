import React from 'react';
import { makeStyles, Container, Grid, fade, InputBase, TextField, useTheme, Button } from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Image from '../image';

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(8),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(8),
            width: 'auto',
        },
    },
    searchIcon: {
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0,2),
        height: '100%',
    },
    inputCustom: {
        // color: 'inherit',
        width: '100%',
        padding: theme.spacing(1, 2, 1, 2),
    },
    input: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    }
}))

const useValueHasChanged= (val) => {
    const prevVal = useValuePrevious(val)
    console.log(prevVal, val)
    return prevVal !== val
}

const useValuePrevious = (value) => {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const useOffsetHasChanged= (val) => {
    const prevVal = useOffsetPrevious(val)
    console.log(prevVal, val)
    return prevVal !== val
}

const useOffsetPrevious = (value) => {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const Search = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [offset, setOffset] = React.useState(0);
    const [searchData, setSearchData] = React.useState(null)
    const theme = useTheme()
    const valueChange = useValueHasChanged(value)
    const offsetChange = useOffsetHasChanged(offset)
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const handleChangeOffset = () => {
        setOffset(offset + 8);
    }
    console.log(valueChange, offsetChange)
    React.useEffect(() => {
        if (valueChange || offsetChange) {
            fetch(`https://api.giphy.com/v1/gifs/search?api_key=PF4Zi8i5b4hjlGba2L43PwhOshEXwDr9&q=${value}&limit=8&offset=${offset}&rating=g&lang=en`)
            .then(res => {
                res.json().then(d => {
                    if (valueChange) {
                        setDataVlue(d , 'new')
                    } else if (offsetChange) {
                        setDataVlue(d , 'concat')
                    }
                })
            })
        }
    })
    const setDataVlue = (dataValue, type) => {
        if (type === 'new') {
            setSearchData(dataValue)
        } else {
            setSearchData({...dataValue, data: searchData ? searchData.data.concat(dataValue.data): []})
        }
    }
    console.log(searchData)
    return <Container maxWidth="lg">
        <Grid container spacing={2} justify="center">
            <Grid item xs={12} md={12}>
                <div className={classes.search}>
                    {/* <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div> */}
                    <ThemeProvider theme={theme}>
                        <TextField
                            value={value}
                            color="primary"
                            onChange={handleChange}
                            classes={{
                                root: classes.inputCustom
                            }}
                            placeholder="Search..."
                        />
                    </ThemeProvider>

                    {/* <InputBase
                    color="secondary"
                    placeholder="Search..."
                    classes={{
                        root: classes.inputCustom,
                        input: classes.input
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    /> */}
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={2} justify="center" style={{marginTop: '2rem'}}>
            {
                searchData && searchData?.data.map(d => 
                    <Grid key={d.id} item xs={6} md={3}>
                        <Image data={d} />
                    </Grid>
                )
            }
            {
                searchData && <Grid item xs={12} md={12} style={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={handleChangeOffset}>Fresh More</Button>
                </Grid>
            }
        </Grid>
    </Container>
}

export default Search;