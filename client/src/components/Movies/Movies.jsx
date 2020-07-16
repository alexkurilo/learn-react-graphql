import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import MoviesTable from '../MoviesTable/MoviesTable';
import MyMoviesForm from '../MoviesForm/MoviesForm';

import withHocs from './MoviesHoc';

const Movies = ({classes}) => {
    const initialMovieState = {
        id: '',
        name: '',
        genre: '',
        watched: false,
        rate: 0,
        directorId: '',
    };

    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState({ ...initialMovieState });

    const handleClickOpen = ( data = {} ) => {
        setOpen(true);
        setMovie({
            ...initialMovieState,
            ...data,
        });
    };

    const handleClose = () => {
        setOpen(false);
        setMovie({ ...initialMovieState });
    };

    const handleSelectChange = ({ target }) => { setMovie({
        ...movie,
        [target.name]: target.value,
    })};

    const handleCheckboxChange = name => ({ target }) => { setMovie({
        ...movie,
        [name]: target.checked,
    })};

    const handleChange = name => ({ target }) => { setMovie({
        ...movie,
        [name]: target.value,
    })};

    const { id, name, genre, watched, rate, directorId } = movie;

    return (
        <>
            <MyMoviesForm handleChange={handleChange}
                          handleSelectChange={handleSelectChange}
                          handleCheckboxChange={handleCheckboxChange}
                          selectedValue={{ id, name, genre, watched, rate, directorId }}
                          open={open}
                          onClose={handleClose}
            />
            <div className={classes.wrapper}>
                <MoviesTable onOpen={handleClickOpen}
                             onClose={handleClose} />
                <Fab onClick={handleClickOpen}
                     color="primary"
                     aria-label="Add"
                     className={classes.fab}
                >
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
};
export default withHocs(Movies);
