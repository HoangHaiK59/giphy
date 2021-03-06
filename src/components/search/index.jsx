import React from 'react';
import { makeStyles, Container, Grid, fade, TextField, useTheme, Button } from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Image from '../image';
import { ArrowDropDown } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Empty from '../empty';

const useStyles = makeStyles(theme => ({
    search: {
        position: 'fixed',
        top: 150,
        left: '20%',
        zIndex: theme.zIndex.drawer + 99999999999999999,
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
            width: 1000,
        },
        [theme.breakpoints.down('sm')]: {
            width: 800,
            left: 0
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
        position: 'sticky',
        top: 200,
        zIndex:99999999999999999
    },
    input: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    item: {
        position: 'relative',
        width: '100%',
        cursor: 'pointer'
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
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
    spacing: {
        marginTop: theme.spacing(2),
    }
}))

const useValueHasChanged= (val) => {
    const prevVal = useValuePrevious(val)
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
    return prevVal !== val
}

const useOffsetPrevious = (value) => {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const Search = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(sessionStorage.getItem('searchQuery') ? sessionStorage.getItem('searchQuery') :  '');
    const [offset, setOffset] = React.useState(0);
    const [searchData, setSearchData] = React.useState(null);
    const textInput = React.createRef();
    const theme = useTheme()
    const valueChange = useValueHasChanged(value)
    const offsetChange = useOffsetHasChanged(offset)
    React.useEffect(() => {
        document.title = 'Search'
    })
    React.useEffect(() => {
        window.addEventListener('scroll',e => scrollEvent(e))
        return window.removeEventListener('scroll', e => scrollEvent(e))
    })
    const fetchData = React.useCallback(() => {
        fetchUrl(`https://api.giphy.com/v1/gifs/search?api_key=PF4Zi8i5b4hjlGba2L43PwhOshEXwDr9&q=${value}&limit=8&offset=${offset}&rating=g&lang=en`)
    }, [value, offset])
    React.useEffect(() => {
        fetchData()
    }, [fetchData])
    const fetchUrl = (url) => {
        customLoading(true);
        fetch(url)
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
    const handleChange = (event) => {
        setValue(event.target.value)
        sessionStorage.setItem('searchQuery', event.target.value)
    }
    const handleChangeOffset = () => {
        setOffset(offset + 8);
    }
    const customLoading = loading => {
        props.showLoading(loading)
    }
    const scrollEvent = event => {
        // console.log(textInput.current)
        // textInput.current.styles
    }
    const setDataVlue = (dataValue, type) => {
        if (type === 'new') {
            console.log(dataValue)
            setSearchData({...dataValue, data: dataValue.data.map(d => {
                if (props.favorites && props.favorites.length === 0) {
                    return {...d, hover: false, favorite: false}
                } else {
                    if (props.favorites && props.favorites.find(f => f.id === d.id)) {
                        return {...d, hover: false, favorite: true}
                    } else {
                        return {...d, hover: false, favorite: false}
                    }
                }
            })})
        } else {
            setSearchData({...dataValue, data: searchData ? searchData.data.concat(dataValue.data.map(d => {
                if (props.favorites && props.favorites.find(f => f.id === d.id)) {
                    return {...d, favorite: false, hover: true}
                } else {
                    return {...d, favorite: false, hover: false}
                }
            })): []})
        }
        setTimeout(() => {
            customLoading(false)
        }, 200)
    }
    // const mouseMove = id => {
    //     setSearchData({...searchData, data: searchData.data.map(d => {
    //         if(d.id === id) {
    //             return {...d, hover: true}
    //         } else {
    //             return {...d, hover: false}
    //         }
    //     } )})
    // }
    // const mouseLeave = id => {
    //     setSearchData({...searchData, data: searchData.data.map(d => {
    //         if(d.id === id) {
    //             return {...d, hover: false}
    //         } else {
    //             return {...d, hover: false}
    //         }
    //     } )})
    // }
    // const add2Favorite = id => {
    //     setSearchData({...searchData, data: searchData.data.map(d => {
    //         if(d.id === id) {
    //             return {...d, favorite: true}
    //         }
    //         return d
    //     } )})
    // }
    return <Container maxWidth="lg">
        <Grid container spacing={2} justify="center">
            <Grid item xs={12} md={12} className={classes.spacing}>
                <div className={classes.search}>
                    {/* <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div> */}
                    <ThemeProvider theme={theme}>
                        <TextField
                            ref={textInput}
                            value={value}
                            color="primary"
                            onChange={handleChange}
                            classes={{
                                root: classes.inputCustom
                            }}
                            placeholder="Start searching for images"
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
                (searchData && searchData.data.length > 0) ? searchData?.data.map(d => 
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
                ): <Grid item xs={12} md={12}>
                    <Empty textContent={`No results found for ${value}`} variant="h5" />
                </Grid>
            }
            {
                (searchData && searchData.data.length > 0) && <Grid item xs={12} md={12} style={{display: 'flex', justifyContent: 'center'}}>
                    <Button startIcon={<ArrowDropDown />} variant="contained" color="primary" onClick={handleChangeOffset}>Fresh More</Button>
                </Grid>
            }
        </Grid>
    </Container>
}

Search.propTypes = {
    add2Favorites: PropTypes.func.isRequired, 
    deleteFromFavorites: PropTypes.func.isRequired,
    handleShowToastAndMessage: PropTypes.func.isRequired
}

// Search.propTypes = {
//     add2Favorites: PropTypes.func.isRequired, 
//     delFromFavorites: PropTypes.func.isRequired,
//     handleShowToastAndMessage: PropTypes.func.isRequired
// }

// const mapStateToProps = (state, ownProps) => {
//     return {
//         favorites: state.giphy.favorites
//     }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Search);
export default Search;