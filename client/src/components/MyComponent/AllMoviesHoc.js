import React from 'react';
import { compose } from 'recompose';


import { useQuery } from "@apollo/react-hooks";
import { moviesQuery } from '../MoviesTable/queries';

function useAllMovies() {
    const {data, loading} = useQuery(moviesQuery);
    const {movies = []} = data;

    return {movies: movies, moviesLoading: loading};
}

const AllMoviesHoc = (WrappedComponent) => {
    const {movies, moviesLoading} = useAllMovies();

    return ({...props}) => {
        return <WrappedComponent {...props} movies={movies} moviesLoading={moviesLoading}/>;
        // return <WrappedComponent { ...props } />;
    };
};

export default AllMoviesHoc;
