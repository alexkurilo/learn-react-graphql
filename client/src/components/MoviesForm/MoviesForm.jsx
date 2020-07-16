import React, { useState, useRef } from 'react';
import {
    TextField,
    OutlinedInput,
    MenuItem,
    Select,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    Button,
    DialogTitle,
    Dialog,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import withHocs from './MoviesFormHoc';

const MoviesForm = ({ onClose, selectedValue = {}, addMovie, updateMovie, classes, open, handleChange, handleSelectChange, handleCheckboxChange, data = {} }) => {
    const [newMovie, setNewMovie] = useState({});
    const inputLabelRef = useRef();
    const { directors = [], loading = false } = data;

    const { id, name, genre, rate, directorId, watched } = selectedValue;

    const handleClose = () => onClose();

    const handleSave = () => {
        id ?
            updateMovie({
                id,
                name,
                genre,
                watched: Boolean(watched),
                rate: Number(rate),
                directorId,
            }) :
            addMovie({
                name,
                genre,
                watched: Boolean(watched),
                rate: Number(rate),
                directorId,
            });

        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
            <DialogTitle className={classes.title} id="simple-dialog-title">Movie information</DialogTitle>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    value={name}
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-genre"
                    label="Genre"
                    className={classes.textField}
                    value={genre}
                    onChange={handleChange('genre')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-rate"
                    label="Rate"
                    value={rate}
                    onChange={handleChange('rate')}
                    type="number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <FormControl variant="outlined" className={classes.formControlSelect}>
                    <InputLabel
                        ref={inputLabelRef}
                        htmlFor="outlined-age-simple"
                    >
                        Director
                    </InputLabel>
                    <Select
                        value={directorId}
                        onChange={handleSelectChange}
                        input={<OutlinedInput name="directorId" id="outlined-director" labelWidth={57} />}
                    >
                        {[ ...directors ].map(director => <MenuItem key={director.id} value={director.id}>{director.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <div className={classes.wrapper}>
                    <FormControlLabel
                        control={<Checkbox checked={watched} onChange={handleCheckboxChange('watched')} value="watched" />}
                        label="Watched movie"
                    />
                    <Button onClick={handleSave} variant="contained" color="primary" className={classes.button}>
                        <SaveIcon /> Save
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};

export default withHocs(MoviesForm);