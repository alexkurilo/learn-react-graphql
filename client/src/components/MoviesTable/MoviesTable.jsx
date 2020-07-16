import React, { useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox,
    IconButton,
    MenuItem,
    Menu,
} from '@material-ui/core';

import {
    MoreVert as MoreIcon,
    Delete as DeleteIcon,
    Create as CreateIcon,
} from '@material-ui/icons';

import MoviesDialog from '../MoviesDialog/MoviesDialog';

import withHocs from './MoviesTableHoc';

const MoviesTable = ({ classes, data = {}, onOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});

    const { movies = [] } = data;

    const handleDialogOpen = () => setOpenDialog( true );

    const handleDialogClose = () => setOpenDialog( false );

    const handleClick = ({ currentTarget }, selectedMovie) => {
        setAnchorEl(currentTarget);
        setSelectedMovie(selectedMovie);
    };

    const handleClose = () => setAnchorEl(null);

    const handleEdit = () => {
        onOpen(selectedMovie);
        handleClose();
    };

    const handleDelete = () => {
        handleDialogOpen();
        handleClose();
    };

    return (
        <>
            <MoviesDialog open={openDialog} handleClose={handleDialogClose} id={selectedMovie.id} />
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell align="right">Rate</TableCell>
                            <TableCell>Director</TableCell>
                            <TableCell>Watched</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { movies.map(movie => {
                            return (
                                <TableRow key={movie.id}>
                                    <TableCell component="th" scope="row">{movie.name}</TableCell>
                                    <TableCell>{movie.genre}</TableCell>
                                    <TableCell align="right">{movie.rate}</TableCell>
                                    <TableCell>{movie.director ? movie.director.name : 'Unknown director'}</TableCell>
                                    <TableCell>
                                        <Checkbox checked={movie.watched} disabled />
                                    </TableCell>
                                    <TableCell align="right">
                                        <>
                                            <IconButton color="inherit" onClick={(e) => handleClick(e, movie)}>
                                                <MoreIcon />
                                            </IconButton>
                                            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                                                <MenuItem onClick={handleEdit}><CreateIcon /> Edit</MenuItem>
                                                <MenuItem onClick={handleDelete}><DeleteIcon/> Delete</MenuItem>
                                            </Menu>
                                        </>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
};

export default withHocs(MoviesTable);